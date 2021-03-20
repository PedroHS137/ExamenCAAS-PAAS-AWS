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
let url = "https://examenpjhs.mybluemix.net/";

async function getResponse() {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            texto: form.texto.value
        })
    };
    response = await fetch(url, options);
    data = await response.json();
    if (data.status == 200) {
        result = data.result;
        var respuesta = `<p>${JSON.stringify(result.document_tone)}​​​​​​​​​​​​</p> 
        <p>${JSON.stringify(result.sentences_tone)}​​​​​​​​​​​​</p>`;
        document.querySelector('#respuesta').innerHTML = respuesta;
    }
}
app.post('/', (req, res) => {
    
    const texto = req.body.text;
    console.log(texto+'dostres')
    const toneParams = {
        toneInput: { 'text': texto },
        contentType: 'application/json',
    };
    //console.log(req.body.text)
    toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            JSON.stringify(toneAnalysis, null, 2);
            res.send({ "respuesta": toneAnalysis.result })
        })
        .catch(err => {
            console.log('error:', err);
        });
    
})
    // function getUserTxt(){
    //     var txt = document.getElementById("entrada").value;
    //     console.log(txt);
    //     //document.getElementById("entrada").innerHTML = txt;  

    // }
   

    app.get('/autor', (req, res) => {
        res.statusCode = 200;
        res.send({ "alumno": "PedroHS", "servicio": "ECS en AWS" })
        //res.sendFile(path.join(__dirname, 'html', 'index.html'))
    })


    app.listen(8080, function () {
        console.log('app is running in http://localhost:8080')
    })