


// set timeout loop
// get all teacher names and stuffs
// determine url

// **** the only part url dependent
// look for different elements
// get teacher names


// get ratings
// insert buttons
var cachedNames = {};

setInterval(() => {
    var names = getTeacherNames();

    var map = {...cachedNames};
    // console.log(map);
    var promises = [];
    for (let i = 0; i < names.length; i++) {
        var name = names[i]
        if (map.hasOwnProperty(name)) continue;
        var promise = getProfRating(names[i])
            .then(({ res, name }) => {
                map[name] = res;
                map[name].name = name;
                cachedNames = {...map};
            })
        promises.push(promise);
    }
    Promise.all(promises)
        .then(() => {
            insertElements(map);
            // send back to insert into buttons
        })
    
}, 1000);

function getProfRating(name) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ message: "getProfRating", prof: name }, (res) => {
            resolve({ res, name });
        })
    })
}