const {stringify} = require('query-string')
import fetch from 'node-fetch'

function post(url, body) {
    return new Promise(resolve => {
        fetch(url, {
            method: 'post',
            body,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => resolve(json));
    })
}

function form(url, body) {
    return new Promise(resolve => {
        fetch(url, {
            method: 'post',
            body: body,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
            .then(res => res.json())
            .then(json => resolve(json)).catch(e => {
            resolve(e)
        });
    })
}

function req(url, body) {
    return new Promise(resolve => {
        fetch(url, body)
            .then(res => res.json())
            .then(json => resolve(json)).catch(e => {
            resolve(e)
        });
    })
}


function get(uri, query) {
    if (query) {
        uri = `${uri}?${stringify(query)}`
    }
    console.log(query);
    return new Promise(resolve => {
        fetch(uri)
            .then(res => res.json())
            .then(json => resolve(json)).catch(e => {
            resolve(e)
        });
    })
}

function auth(url, body) {
    return new Promise(resolve => {
        fetch(url, {
            method: 'post',
            body: body,
            headers: {
                "Authorization": "APPCODE c1dfb85232f54ee0beb4e46dc96dae30"
            }
        })
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(e => {
                resolve(e)
            });
    })
}

module.exports = {
    post,
    get,
    form,
    auth,
    req
}