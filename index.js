'use strict';

const request = require('request');

process.env.DEBUG = 'actions-on-google:*';

// We need the Assistant client for all the magic here
const Assistant = require('actions-on-google').DialogflowApp;

// the actions we are supporting (get them from Dialogflow)
const ACTION_HELLO = 'hello';
const ACTION_STATUS = 'garageStatus';
const ACTION_SMALL = 'smallestGarage';

exports.helloWorld = (req, res) => {
  const assistant = new Assistant({request: req, response: res});

  function getGarages () {
      return new Promise ( (resolve, reject) => {
        var r;
        const garages = [];
        r = request('https://secure.parking.ucf.edu/GarageCount/iframe.aspx/', function(error, response, body) {
          var $ = cheerio.load(body);
          $('.dxgvDataRow_DevEx').each(function(i, obj) {
            var html, j, len, line, percent, thisGarage;
            thisGarage = {};
            html = $(obj).html().replace(RegExp(' ', 'g'), '').split('\n');
            for (j = 0, len = html.length; j < len; j++) {
              line = html[j];
              if (line.indexOf("percent:") === 0) {
                percent = parseInt(line.replace("percent:", ''));
                thisGarage.perc = percent;
              }
            }
            thisGarage.garage = ($(obj).find('.dxgv').html()).replace("Garage ", '');
            garages[i] = thisGarage;
          });
        });
        resolve(garages);
    });
  }

  function hello (assistant) {
      /*getGarages().then( function(garages){
        console.log("in promise");
          if (garages.length===0) {
              assistant.tell("I dont have garages!");
          } else {
              assistant.tell("I have garages!");
          }
        console.log("out promise");
      });*/
      assistant.ask("Hello everyone!");
  }

  function specificGarageStatus (assistant) {
      assistant.ask("I would tell you the available space if I worked!");
  }

  function smallestGarage (assistant) {
      assistant.ask("I would tell you which garage is the best if I worked!");
  }

  // The Entry point to all our actions
  const actionMap = new Map();
  actionMap.set(ACTION_HELLO, hello);
  actionMap.set(ACTION_STATUS, specificGarageStatus);
  actionMap.set(ACTION_SMALL, smallestGarage);
  assistant.handleRequest(actionMap);
};