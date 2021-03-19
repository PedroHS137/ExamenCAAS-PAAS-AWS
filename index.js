const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config();

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
        apikey: process.env.API_KEY,
    }),
    serviceUrl:  process.env.URL,
});


const app = express()

app.use(express.static(__dirname + '/html'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function getUserTxt(){
    let txt = document.getElementById("entrada").value;  
    return txt;
}

app.get('/autor', (req, res) => {
    res.statusCode = 200;
    res.send({ "alumno": "PedroHS" , "servicio":"ECS en AWS"})
    //res.sendFile(path.join(__dirname, 'html', 'index.html'))
})

app.post('/', (req, res) => {
    let text = req.body;
    console.log(text);
//     const text = 'Team, I know that times are tough! Product '
//   + 'sales have been disappointing for the past three '
//   + 'quarters. We have a competitive product, but we '
//   + 'need to do a better job of selling it!';
    const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
    };
    //console.log(req.body.text)
    res.send(toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            console.log(JSON.stringify(toneAnalysis, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        }));
    //res.send({ "respuesta": total })
})


app.listen(3000, function () {
    console.log('app is running in http://localhost:3000')
})