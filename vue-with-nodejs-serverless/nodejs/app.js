const express = require('express');
const fs = require('fs').promises;
const sls = require('serverless-http');
var http = require("http");
var https = require("https");
var url = require("url");
var app = express();
var crypto = require('crypto');
const path = require('path');
app.use(express.json());


let appconfig;
let secretKey;
let userEmail;

app.get('/', async (req, res, next) => {  
  res.status(200).send('API is running!');
});

app.post('/authorizationserver',  async function (req, response){

  try {
    appconfig = JSON.parse(await fs.readFile('embedConfig.json'));
  }
  catch (error) {
    console.error('Error: embedConfig.json file not found.');
    process.exit(1);
  }
  secretKey = appconfig.EmbedSecret;
  userEmail = appconfig.UserEmail;
  var embedQuerString = req.body.embedQuerString;
  var dashboardServerApiUrl = req.body.dashboardServerApiUrl;
  embedQuerString += "&embed_user_email=" + userEmail;
  var embedSignature = "&embed_signature=" + GetSignatureUrl(embedQuerString);
  var embedDetailsUrl = "/embed/authorize?" + embedQuerString+embedSignature;
  var serverProtocol = url.parse(dashboardServerApiUrl).protocol == 'https:' ? https : http;
  serverProtocol.get(dashboardServerApiUrl+embedDetailsUrl, function(res){
    var str = '';
      res.on('data', function (chunk) {
      str += chunk;
      });
      res.on('end', function () {   
        response.header({
          'Access-Control-Allow-Origin': '*', // Replace with the allowed origin(s)
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST',
        })         
      response.send(str);
      });
  });
  })

function GetSignatureUrl(queryString)
  {
    const key = Buffer.from(secretKey, 'utf8');
    const message = Buffer.from(queryString, 'utf8');  
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(message);  
    const hashMessage = hmac.digest('base64');
    console.log(hashMessage);
    return hashMessage;
  }
app.get('/getDetails', async (req, res, next) => {

    const embedConfigPath = process.env.EMBED_CONFIG_PATH;
    try{
        const jsonData = await fs.readFile(embedConfigPath, 'utf8');
        res.header({
            'Access-Control-Allow-Origin': '*', // Replace with the allowed origin(s)
            'Access-Control-Allow-Headers': 'Content-Type',
        })
        res.send(jsonData);
    }
    catch{
        res.send("Error in reading the data");
    }
});

module.exports.server = sls(app);