
// import getBruinWalkInfo from './webscrape.js';


// chrome.runtime.onInstalled.addListener(() => {
//     // default state goes here
//     // this runs ONE TIME ONLY (unless the user reinstalls your extension)
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");
            })
            .catch(err => console.log(err));
    }
});

// console.log("Hi");

/**
 * takes message with all info required to search up a teacher
 */
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.message === 'get_prof_rating') {
        try {
            var response = await getBruinWalkInfo(request.prof);
            sendResponse(response);
        } catch (err) {
            sendResponse(err);
        }
    } else {
        sendResponse({ message: 'fail' });
    }
});

 
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
