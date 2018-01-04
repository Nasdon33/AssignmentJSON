var express = require('express');
var bodyParser = require('body-parser');

//instantiate express
var app = express();

app.use(bodyParser.json());

const assignments = require('./assignments')

app.use('/assignments', assignments);

app.set('port', (process.env.PORT || 5000));

//listen in a specific port
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
