// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');
var proxyExpress = require('express-http-proxy');

// proxy middleware options
var options = {
        target: 'http://www.figaro.fr', // target host
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
        pathRewrite: {
            '^/api/old-path' : '/',     // rewrite path
            '^/api/remove/path' : '/'           // remove base path
        },
        router: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            'dev.localhost:3000' : 'http://localhost:8000'
        }
    };


    
// create the proxy (without context)
//var exampleProxy = proxy(options);

// mount `exampleProxy` in web server
var app = express();
//    app.use('/api', exampleProxy);
app.use('/api', proxyExpress('http://www.figaro.fr', {
    preserveHostHdr: true,
    forwardPath: function(req, res){
        //console.log(req);
        //return url.parse(req.url).path.replace(/\/api/,'/');
        return '/';
      }
  }));
    app.listen(3000);