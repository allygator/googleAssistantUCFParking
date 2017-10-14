const axios = require('axios');
const cheerio = require('cheerio');

function getAllGarages(){

  return new Promise((resolve, reject) => {

    const garages = []; //List of garages

    //Make the request
    axios('https://secure.parking.ucf.edu/GarageCount/iframe.aspx/')
    .then(function(response) {

      //Load cheerio
      var $ = cheerio.load(response.data);
      $('.dxgvDataRow_DevEx').each(function(i, obj) {

        var html, line, percent;
        //Trim
        html = $(obj).html().replace(RegExp(' ', 'g'), '').split('\n');
        //For each line of the html
        for (let j = 0; j < html.length; j++) {
          line = html[j];
          //If we find the percent, use it
          if (line.includes("percent:")) {
            percent = parseInt(line.replace("percent:", ''));
          }
        }
        //Build the garages array
        garages[i] = {
          garage: ($(obj).find('.dxgv').html()).replace("Garage ", ''),
          perc: percent
        };
      });

      //Resolve w/ list of garages
      resolve(garages);
    })
    .catch( (e) => reject(e) );
  });
}

module.exports = {
  getAllGarages: getAllGarages
}