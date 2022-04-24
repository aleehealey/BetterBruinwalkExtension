


document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transitionDuration = '3.0s';
document.querySelector("body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img").style.transform = 'rotate(3000deg)';


console.log("sending");
chrome.runtime.sendMessage({ message: "get_prof_rating", prof: "Cong, J.J." }, (res) => {
    console.log(res);
})


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}




async function getBruinWalkInfo(name) {
    try {
        var results = httpGet(`https://www.bruinwalk.com/search/?category=professors&q=${name}`);
        // var scrapedResults = scrapeInfo(results);
        // return scrapedResults;
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

getBruinWalkInfo('Cong, J.J.');