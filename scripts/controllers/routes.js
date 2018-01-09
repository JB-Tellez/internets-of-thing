
function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}



// all routes should hide .page containers
page('/*', (ctx, next) => {
    $('.page').hide()
    next()
})

page('/', () => {

    console.log(parseURL(window.location.href))
    
    const path = parseURL(window.location.href).searchObject.route
        
    if (path) {
        page(path)
    } else {
        app.thingListPage.init()
    }
    
})

page('/admin', app.adminPage.init)
page('/create', app.createPage.init)

page.start()