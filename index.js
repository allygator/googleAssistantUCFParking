'use strict';

const garages = require('./garages');
process.env.DEBUG = 'actions-on-google:*';

// We need the Assistant client for all the magic here
const Assistant = require('actions-on-google').DialogflowApp;

// the actions we are supporting (get them from Dialogflow)
// variable referenced in actionmap, action names from Dialogflow
const ACTION_HELLO = 'hello';
const ACTION_STATUS = 'garageStatus';
const ACTION_SMALL = 'smallestGarage';

exports.helloWorld = (req, res) => {
  const assistant = new Assistant({request: req, response: res});

  //Hello test function
  function hello (assistant) {
    garages.getAllGarages
    .then( function(garages){
      console.log("in promise");
      if (garages.length===0)
        assistant.tell("I dont have garages!");
      else
        assistant.tell("I have garages!");
    });
    assistant.ask("Hello everyone!");
  }

  //Check the status of a specific garage, specific in the argument given by the user
  function specificGarageStatus (assistant) {
      assistant.ask("I would tell you the available space if I worked!");
  }

  //Find the garage with the most available space
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
