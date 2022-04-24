
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
