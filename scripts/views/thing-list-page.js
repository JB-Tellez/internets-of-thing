var app = app || {};

(module => {

    const thingListPage = {};

    const template = Handlebars.compile($('#thing-template').text())

    function renderThings() {

        $('#thing-list').empty()

        app.Thing.all.forEach(thing => {
            $('#thing-list').append($(template(thing)))
        })
    }

    thingListPage.init = () => {

        $('#thing-list-page ul').off()

        $('#thing-list-page ul').on('click', '.delete', (event) => {
            const id = $(event.target).parent().data('id')

            const confirmed = confirm('Are you sure?')

            if (confirmed) {
                app.Thing.delete(id).then(renderThings)
            }
        })

        $('#thing-list-page ul').on('click', '.update', (event) => {
            const id = $(event.target).parent().data('id')
            page('/edit/' + id)
        })

        app.Thing.fetchAll().then(() => {

            renderThings()

            $('#thing-list-page').show()


        })
    }

    module.thingListPage = thingListPage
})(app)