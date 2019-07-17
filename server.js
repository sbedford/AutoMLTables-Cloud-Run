'use strict';

const express = require('express')
const automl = require('@google-cloud/automl');

const client = new automl.v1beta1.PredictionServiceClient();
const app = express()

const port = process.env.PORT || 3000;
const projectId=process.env.PROJECTID;
const computeRegion= process.env.COMPUTEREGION;
const modelId=process.env.MODELID;

const modelFullId = client.modelPath(projectId, computeRegion, modelId);

app.use(express.json());

app.get('/', function(req,res){res.send("Welcome to the AutoML Tables Predication API!")})

app.post('/predict', predict);

app.listen(port, () => console.log(`Datacomp Demo app listening on port ${port}!`));

function predict(req,res){

  console.log(`Age = ${req.body.age}`);
  console.log(`Job = ${req.body.job}`);
  console.log(`Marital Status = ${req.body.maritalstatus}`);
  console.log(`Education = ${req.body.education}`);

  const request = {
    name : modelFullId,
    payload : {
      row: {
          values : [ 
            { stringValue: req.body.job } , 
            { stringValue: req.body.age }, 
            { stringValue: req.body.maritalstatus }, 
            { stringValue: req.body.education } 
          ],
          columnSpecIds: [
            "706915607915790336",
            "3012758617129484288",
            "6183292754798313472",
            "3877449745584619520"
          ]
      }
    }
  };
    
  client
    .predict(request)
    .then(responses => {

      if (responses[0].payload.length > 0) {
        
        var response = responses[0].payload[0];

        res.json({
          duration : response.tables.value.numberValue,
          interval : response.tables.predictionInterval
        });
        
      }
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
}