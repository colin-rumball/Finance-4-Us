const express = require('express'),
   expressStaticGzip = require('express-static-gzip'),
   path = require('path');


const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use('/', expressStaticGzip(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);