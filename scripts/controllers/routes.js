// NOTE: these routes will work just fine running locally
// But when you start remotely check out routes-remote.js

page.base('/internet-of-things');
// all route changes should hide page containers
page('/*', (ctx, next) => {
    $('.page').hide()
    next()
})

page('/', app.thingListPage.init)
page('/admin', app.adminPage.init)
page('/create', app.createPage.init)
page('/edit/:id', (ctx) => app.Thing.fetchOne(ctx.params.id).then(app.editPage.init))

page.start()