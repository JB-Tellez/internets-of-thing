// tweak to run on GH Pages
if (window.location.protocol.startsWith('https:')) {
    page.base('/internets-of-thing');
}

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