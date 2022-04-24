



async function getBruinWalkInfo(name) {
    try {
        var results = fetch(`https://www.bruinwalk.com/search/?category=professors&q=${name}`);
        var scrapedResults = scrapeInfo(results);
        return scrapedResults;
    } catch (err) {
        throw new Error(`Failed to get Bruinwalk info: ${err}`);
    }

}


function scrapeInfo(html) {
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

export default getBruinWalkInfo;