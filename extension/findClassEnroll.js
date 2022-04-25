
// get all teacher names and stuffs

function getTeacherNames() {
    var tds = document.querySelectorAll("div.primary-row div.instructorColumn p");
    var names = [];
    for (let i = 0; i < tds.length; i++) {
        // console.log(tds[td].textContent);
        names.push(tds[i].textContent);
    }
    return names;
}

// takes a mapping from professor names to 
function insertElements(map) {
    var tds = document.querySelectorAll("div.primary-row div.instructorColumn");

    for (let i = 0; i < tds.length; i++) {
        // has it already been inserted?
        if (tds[i].childNodes.length > 1) continue;
        var name = tds[i].textContent;

        if (!map.hasOwnProperty(name)) continue;
        var data = map[name];

        // create a el
        var a = getA(data);

        // insert into dom
        tds[i].appendChild(a);        
    }
}

function getA(data) {
    // make button 
    var a = document.createElement('a');
    a.href = `https://www.bruinwalk.com/search/?q=${data.name}`;
    a.target = '_blank';
    a.className = 'bruinRating';
    // style it
    a.style.textDecoration = 'none';
    a.style.backgroundColor = data.color;
    a.style.fontFamily = 'ProximaNova';
    a.style.fontSize = '1rem';
    a.style.setProperty('color', 'white', 'important')
    a.style.fontWeight = 'bold';
    // a.style.border = '';
    a.style.borderRadius = '5px';
    a.style.padding = '5px';
    a.style.marginLeft = '5px';
    // a.style

    // insert rating
    a.innerHTML = data.rating;
    return a;
}