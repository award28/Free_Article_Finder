var results = document.getElementsByClassName('gs_r');

for(var i = 0; i < results.length; i++) {
    var link = results[i]
    if(link.getElementsByClassName('gs_ri')[0]) {
        link = link.getElementsByClassName('gs_ri')[0].getElementsByClassName('gs_rt')[0]

        injectLoad(i)
        if(link.getElementsByTagName('a')[0])
            checkFreedom(link.getElementsByTagName('a')[0].getAttribute('href'), i)
        else
            removeLoad(i)
    }
}

function checkFreedom(link, index) {
	chrome.runtime.sendMessage({
		method: 'GET',
		action: 'xhttp',
		url: link,
        data: ""
    }, function (response) {
        /*
        var div = document.createElement('div');
        div.innerHTML = response;
        */
        var criterias = ['Introduction', 'Methods', 'General procedure', 'Discussion', 'Results', 'Conclusions']

        var found = 0
        criterias.forEach(function(e) {
            found += searchCriteria(response, e)
        });

        found += 3*searchCriteria(response, "Download PDF")

        //If the article is found to be valid, include the free next to it
        injectFreedom(index, (found/(criterias.length + 1))*100)

        removeLoad(index)
	});
}

function searchCriteria(site, criteria) {
    if(site.search(criteria) != -1) 
        return 1
    return 0
}

function injectLoad(index) {
    var results = document.getElementsByClassName('gs_r');
    var cur = results[index].getElementsByClassName('gs_ri')[0].getElementsByClassName('gs_rt')[0]

    cur.innerHTML = "<img src='" + chrome.extension.getURL('ripple.gif') + "'/>" + cur.innerHTML;
}

function removeLoad(index, chance) {
    var results = document.getElementsByClassName('gs_r');
    var cur = results[index].getElementsByClassName('gs_ri')[0].getElementsByClassName('gs_rt')[0]
    var child = cur.getElementsByTagName('img')

    cur.removeChild(child[0])
}

function injectFreedom(index, chance) {
    var results = document.getElementsByClassName('gs_r');
    var cur = results[index].getElementsByClassName('gs_ri')[0].getElementsByClassName('gs_rt')[0]
    if(chance > 99)
        chance = 99 
    else if(!chance)
        chance = 1

    cur.innerHTML = "<h3 style='color: red; font-size: 20px;'><strong>~" + chance.toFixed(0) + "% chance this article is free~ </strong></h3>" + cur.innerHTML;
}
