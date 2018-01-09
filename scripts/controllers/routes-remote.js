// NOTE: use this file when deploying remotely
// It has a bunch of trickery to handle deploying beneath route and handling page refreshes / 404 redirects
if (window.location.pathname !== '/') {
    page.base('/internets-of-thing');
}

// all routes should hide .page containers
page('/*', (ctx, next) => {
    $('.page').hide()
    next()
})

page('/admin', app.adminPage.init)
page('/create', app.createPage.init)
page('/edit/:id', (ctx) => app.Thing.fetchOne(ctx.params.id).then(app.editPage.init))
page('/', () => {

    let path = parseURL(window.location.href).searchObject.route

    path = path && path.replace(/%2F/g, '/')

    if (path) {
        page(path)
    } else {
        app.thingListPage.init()
    }

})

page.start()

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search ? parser.search.replace(/^\?/, '').split('&') : '';
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