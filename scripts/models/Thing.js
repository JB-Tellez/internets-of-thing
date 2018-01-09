var app = app || {};

(module => {

    // const url = 'http://localhost:3000/things'
    const url = 'https://ahoy-heroku.herokuapp.com/things'

    const Thing = {}

    Thing.all = []

    Thing.fetchAll = () => {
        return $.getJSON(url).then(things => {
            Thing.all = things
            Thing.all.sort((a,b) => {
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1
                } else {
                    return 0
                }
            })
        })
    }

    Thing.fetchOne = (id) => {
        return $.getJSON(url + '/' + id)
            .catch(err => console.error(err))
    }

    Thing.create = thing =>
        $.post(url, thing)
            .catch(err => console.error(err))

    Thing.update = thing => {
        return $.ajax({
            url: url + '/' + thing.id,
            method: 'PUT',
            data: thing
        }).then(result => console.log(result))
            .catch(err => console.error(err))
    }

    Thing.delete = id => $.ajax({

        url: url + '/' + id,
        method: 'DELETE',

    }).then(() => {

        const index = Thing.all.findIndex(thing => thing.id === id)

        Thing.all.splice(index, 1)

    }).catch(err => console.error(err))


    module.Thing = Thing

})(app)
