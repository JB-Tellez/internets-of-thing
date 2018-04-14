var app = app || {};

(module => {

    module.editPage = {

        init(thing) {

            $('#edit-name').val(thing.name)

            $('#edit-page').off().on('click', 'button', () => {
                const name = $('#edit-name').val()
                thing.name = name
                app.Thing.update(thing).then(() => page('/'))
            })

            $('#edit-page').show()
        }
    }

})(app)