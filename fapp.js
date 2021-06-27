var __rdir = '/storage/8437-11FE/Dev-BacExa/ls';
var express = require('express');
var cors = require('cors');
var db = require('level')(__dirname + '/lsdb');
var fapp = express();
fapp.use(cors({
  "origin": "http://localhost:8080"
}));
fapp.use(express.static(__rdir+'/public/'));
fapp.post('/'
, require('multer')().none()
, async function(req, res) {
res.redirect(307, req.body.domain);
});
fapp.listen(8080);