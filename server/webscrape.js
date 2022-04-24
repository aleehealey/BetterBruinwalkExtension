var axios = require('axios').default;

async function getBruinWalkInfo(name) {
    try {
        var res = await axios.get(`https://www.bruinwalk.com/search/?category=professors&q=${name}`);
        return scrapeInfo(res.data);
    } catch (err) {
        throw new Error(`Failed to get Bruinwalk info: ${err}`);
    }
}

function scrapeInfo(html) {
    if (html == null) throw new Error("Html is null");
    var colorRegex = /style=\"background-color: ([#|0-9|A-Z]*)\"/
    var ratingRegex = /<b class=\"rating\">([0-9|.| ]*)<\/b>/;
    var colorMatch = html.match(colorRegex);
    var ratingMatch = html.match(ratingRegex);

    var color = colorMatch[1];
    var rating = ratingMatch[1].replaceAll(' ', '');
    return {
        color,
        rating
    }
}

module.exports = getBruinWalkInfo;