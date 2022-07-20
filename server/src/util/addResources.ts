import fs from 'fs'
import { parse } from 'csv-parse'
const useDebug = require('debug');
const Resources = require('../models/resource');
const Organization = require('../models/organization');
const path = require('path');
const pdf = require('pdf-parse');
const request = require('request');
const axios = require('axios').default;
const extractor = require('unfluff');
const cheerio = require('cheerio');
const debug = useDebug('api');


const AhoCorasick = require('aho-corasick-node');


const { COVID_TOPICS } = require('../../../constants');


export async function handleResourceRequest(body : {authoredAt: number, fetchedAt: number, author: String, name: String, url: String, type: String, orgId: String, topics?: String[], imageurl?: String}) {
  var {
    authoredAt,
    fetchedAt,
    author,
    name,
    url,
    type,
    topics,
    imageurl,
    orgId
  } = body;
  if (typeof url != 'string') {
    return {status: 400};
  }
  
  const organization = await Organization.findById(orgId);
  if (!organization) {
    return {status: 401};
  }

  var html = null;
  var language = 'en';
  var content;
  try {
    if (type == 'website' && url) {
      // May need https://www.npmjs.com/package/after-load to load JS heavy apps, but let's see if we can get by with just axios :)
      const response = await axios.get(url);
      if(response.status === 200) {
        html = response.data;

        // Can add language versatility, extractor(html, language) where language is language's two letter code
        const data = extractor(html);

        // Fill in blank/other fields of resource data object with unfluff extractor
        var desc = data.description
        if (data.author) {
          var extracted_author = data.author.toString()
        }
        author = author || extracted_author
        name = name || data.title
        authoredAt = data.date || authoredAt
        language = data.language || 'en'


        // Using cheerio to extract the main text (through p, h1...)
        const $ = cheerio.load(html);
        // This just adds some spaces between html elements
        $("*").each(function (index) {
          $(this).prepend(' ');
          $(this).append(' ');
        }); 
        var scraped_text = $('p, h1, h2, h3, h4, h5').text().replace(/\s{2,}/g, ' ').trim();
        // Inside main tags
        // var scraped_text = $('p, h1, h2, h3, h4, h5').text().replace(/\s{2,}/g, ' ').trim();
        content = scraped_text;
        // OPTIONAL PROCESSING W/ CHEERIO IF WANTED IN FUTURE
        /* Collect the "href" and "title" of each link and add them to an array */
        // const linkObjects = $('a');
        // const links = [];
        // linkObjects.each((index, element) => {
        //   links.push({
        //     text: $(element).text(), // get the text
        //     href: $(element).attr('href'), // get the href attribute
        //   });
        // });

        /* Get images from page */
        const images = $('img').map(function(){ return $(this).attr('src'); })
        imageurl = images[0]
    
      } else {
        return {status: 400, res: "Invalid URL"}
      }
    }
  } catch (err) {
    console.log(err);
    return {status: 400, res: "Invalid URL likely"}
  }
  try {
    if (type === 'pdf' && url) {
      request({uri: url, headers: { 'Content-type' : 'applcation/pdf' }, encoding: null} , function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const write = async() =>  {
            fs.writeFileSync(path.resolve('../assets') + '/resources/' + name +'.pdf', body);
          }
          const parse = async() => {
            let result = await write();
            let dataBuffer = fs.readFileSync(path.resolve('../assets') + '/resources/' + name + '.pdf');
            pdf(dataBuffer).then(function(data) {
              console.log(data.text);
              return data.text;
            });
          }
          content = parse();
        }
      });
    }
  } catch (err) {
    console.log(err);
    return {status: 400, res: err}
  }
  try {
    if (type === 'image' && url) {
      request({uri: url, headers: { 'Content-type' : 'applcation/pdf' }, encoding: null} , function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let fileExtension = url.substring(url.length - 4);
          fs.writeFileSync(path.resolve('../assets') + '/resources/' + name + fileExtension, body);
        }
      });
    }
  } catch (err) {
    console.log(err);
    return {status: 400, res: err}
  }
  
  if (!topics && content) {
    topics = await getTopics({content: content});
  }
  
  try {
    const resour = await Resources.create({
      authoredAt,
      fetchedAt,
      author,
      organization,
      name,
      desc,
      url,
      type,
      topics,
      content,
      raw: html,
      language,
      imageurl
    });
    return {status: 200, resource: resour};
  } catch (err) {
    debug(`${err}`);
    return {status: 500};
  }
}

export async function addResourcesFromCSV(filePath: any) {
  const data = [];
  
  const org = await Organization.find({name: "Georgia Tech"})
  const orgId = org[0]._id

  fs.createReadStream(filePath)
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    // 👇 push the object row into the array
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    data.forEach((csvEntry: {'Source/creator': String, 'Title of resource': String, Link: String}) => {
      handleResourceRequest({
        author: csvEntry['Source/creator'],
        name: csvEntry['Title of resource'],
        type: csvEntry['Link'].endsWith('pdf') ? 'pdf' : 'website',
        fetchedAt: Date.now(),
        authoredAt: Date.now(),
        url: csvEntry['Link'],
        // This can be pulled from Mongo, might be a better way to do this...
        orgId: orgId
      })
      .then(res => {
        console.log(`statusCode: ${res.status}`);
      })
      .catch(error => {
        console.error(error);
      });
    })
  });
}


  // Assembles Aho Corasick automatons for optimized substring search. (for searching topic keywords in resources)
  function assembleAutomatons() {
    const automatons = {};
    const topics = Object.keys(COVID_TOPICS);
    for (let i = 0; i < topics.length; i += 1) {
      const topic = topics[i];
      const keywords = COVID_TOPICS[topic];
      const builder = AhoCorasick.builder();
      keywords.forEach((k) => builder.add(k.toLowerCase()));
      const automaton = builder.build();
      automatons[topic] = automaton;
    }
    return automatons;
  }

  const automatons = assembleAutomatons();
  const topics = Object.keys(automatons);

  async function getTopics(post: {content: String}) {
    const matchedTopics = [];
  
    // The string fields to search through
    const searchables = [
      post.content,
      // TODO add other fields!
      // FB: raw > imageText, raw >
      // IG: raw > imageText
      // Tw: if possible, the post being replied to or retweeted
    ];
  
    for (let i = 0; i < topics.length; i += 1) {
      const topic = topics[i];
      const automaton = automatons[topic];
      for (let j = 0; j < searchables.length; j += 1) {
        const string = searchables[j].toLowerCase(); // error here: "TypeError: Cannot read property 'toLowerCase' of undefined"
        const hits = automaton.match(string);
        if (hits.length > 0 && hits[0] !== '') matchedTopics.push(topic);
      }
    }
  
    return matchedTopics;
  };


