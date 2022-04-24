var cors = require('cors');
var express = require('express');
var getInfo = require('./webscrape.js');

const app = express();

app.use(cors());

app.get('/getProfRating', async (req, res) => {
    // sushi shut the fuck up
    if (!req.query.hasOwnProperty('prof')) return res.status(400);
    var name = req.query.prof;
    if (name === '' || name == null) return res.status(400);
    try {
        var result = await getInfo(name);
        return res.send(result);
    } catch (err) {
        return res.status(400);
    }
});

app.listen(3000, () =>
    console.log(`Listening on port 3000!`),
);

