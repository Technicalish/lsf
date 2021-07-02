var express = require('express');
var app = express();
app.use(express.static(__dirname+'/public'));
app.use((req, res) => {
res.status(404).end();
});
app.listen(3000);
