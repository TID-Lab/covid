// @ts-nocheck
/* eslint-disable no-underscore-dangle */

// API routes for resources

const routes = require('express').Router();
const mongoose = require('mongoose');
const useDebug = require('debug');
const Resources = require('../../models/resource');
const Organization = require('../../models/organization');
const {
  db: { name: dbName },
  api: {
    posts: { pageSize },
  },
} = require('../../util/config');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const request = require('request');
const axios = require('axios').default;
extractor = require('unfluff');
const cheerio = require('cheerio');
const debug = useDebug('api');

// Returns a page of resource posts using the given search query
routes.get('/', async (req, res) => {
  let resources;
  try {
    resources = await Resources.find({});
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
  res.status(200).send(resources);
});

// Creates a new Resource
routes.post('/', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
  }
  const id = req.session.org;
  if (!id) {
    res.status(401).send();
    return;
  }
  const organization = await Organization.findById(id);
  if (!organization) {
    res.status(401).send();
    return;
  }

  req.body.organization = organization;
  var {
    authoredAt,
    fetchedAt,
    author,
    name,
    url,
    type,
    topics,
    platformID,
    imageurl,
  } = req.body;
  if (typeof url != 'string') {
    res.status(400).send();
    return;
  }
  var html = null;
  var language = 'en';
  var content;
  try {
    if (type == 'website' && url) {
      // May need https://www.npmjs.com/package/after-load to load JS heavy apps, but let's see if we can get by with just axios :)
      response = await axios.get(url);
      if(response.status === 200) {
        html = response.data;

        // Can add language versatility, extractor(html, language) where language is language's two letter code
        data = extractor(html);

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
        // images = $('img').map(function(){ return $(this).attr('src'); })
    
      }
    }
  } catch (err) {
    console.log(err);
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
            let dataBuffer = fs.readFileSync('/Users/adamgerig/Documents/GitHub/covid/assets/resources/' + name + '.pdf');
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
      platformID,
      content,
      raw: html,
      language,
      imageurl
    });
    res.status(200).send(resour);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

// Deletes a resource given URL
routes.delete('/', async (req, res) => {
  const { url }  = req.body;
  if (typeof url !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    const result = await Resources.deleteOne({ url : url });
    if (result.deletedCount === 0) {
      res.status(404).send();
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

// Update a resource via replacement
routes.put('/', async (req, res) => {
  const { url } = req.body;
  const {replacementResource} = req.replacementResource;
  if (typeof url !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    const result = await CustomTag.replaceOne({ url }, {replacementResource});
    if (result.modifiedCount === 0) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

module.exports = routes;
