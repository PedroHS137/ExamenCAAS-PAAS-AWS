

const HTTTPMethods = {
    "put":"PUT",
    "post":"POST",
    "get":"GET",
    "delete":"DELETE"
}
const APIURL = window.location.protocol+'//'+window.location.host+'/';
const TOKEN='';
function sendHTTPRequest(urlAPI,data,method,cbOK,cbError,){
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open(method, urlAPI);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    //console.log(TOKEN);
    //xhr.setRequestHeader('x-auth-user', TOKEN);
    // 4. Enviar solicitud al servidor
    xhr.send(data);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            cbError(xhr.status + ': ' + xhr.statusText);
        } else {
            // console.log(xhr.responseText); // Significa que fue exitoso
            cbOK({status:xhr.status, data:xhr.responseText});
        }
    };
}
document.addEventListener('DOMContentLoaded',()=>{
    let buton = document.getElementById('entrada1');
buton.addEventListener('click',()=>{
    let doc = document.getElementById('entrada').value
    
    console.log(doc);
    let send = {
        text: doc
    }
    sendHTTPRequest(APIURL,JSON.stringify(send),HTTTPMethods.post,(ok)=>{
        
        let res = JSON.parse(ok.data).respuesta.document_tone.tones;
        console.log(res);

        let toHTML = `<p>Score:  ${res.length != 0? res[0].score:' no tone identified in phrase'} </p>
                        <p>Tone id: ${res.length != 0 ? res[0].tone_id :'no tone identified in phrase'} </p>
                        <p>Tone name:  ${res.length != 0 ? res[0].tone_name:'no tone identified in phrase'} </p> `;
        
        console.log(toHTML)
        let resHTML = document.getElementById('respuesta').innerHTML = toHTML;
    },(err)=>{
        console.log(err)
    })
}
);
})
