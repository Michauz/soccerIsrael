const https = require('https');
const url = require('url');
const error = require('./errorHandle')
const errorHandle = error.errorHandle;
var httpsRequestPost = (urlStr,postData,onSuccess,onError) =>{
    var urlStr = url.parse(urlStr, true);
    var options = {
        path:  urlStr.pathname,
        host: urlStr.hostname,
        port: urlStr.port,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };
      
    var req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data = data + chunk.toString();
        });
      
        res.on('end', () => {
            onSuccess(data);
        });
    });
    
    req.on('error', (e) => {
        if (onError){
            onError(e);
        }
        else{
            errorHandle(e);
        }
    });
    
    req.end();
}

var httpsRequestGet = (urlStr,getData,onSuccess,onError) =>{
    https.get(urlStr, res => {
        let data = [];
        res.on('data', (chunk) => {
            data = data + chunk.toString();
        });
        res.on('end', () => {
            console.log("tt");
            onSuccess(data);
        });
    }).on('error', err => {
        if (onError){
            onError(err);
        }
        else{
            errorHandle(err);
        }
    });
}


module.exports = {httpsRequestPost,httpsRequestGet};