
var path = require('path'), fs = require('fs');
/**
 * finds all the svg files from the directory, then generates a json file
 * requires the "code runner" plugin for vs code
 * author: simon
 * @param {*} startPath input path
 * @param {*} filter specify string in filename to looks for
 * @param {*} outPath output path
 * @param {*} outName output file name

 */
function fileToJson(options) {
  const { startPath, filter, outPath, outName } = options;
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }
  var files = fs.readdirSync(startPath);
  var outObj = {};
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);

    if (filename.indexOf(filter) >= 0) {
      var name = files[i].replace(filter, '');
      console.log('-- found:', name);
      outObj[name] = fs.readFileSync(filename, 'utf8');
    }
  }
  fs.writeFile(path.join(outPath, `${outName}.json`), JSON.stringify(outObj), (err) => {
    if (err) throw err;
    console.log(' saved!');
  });
}

fileToJson({
  startPath: '.',
  filter: '.svg',
  outPath: '.',
  outName: 'iconlist'
});