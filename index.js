
const request = require('request')

const Lingo = function () { }

/**
 * Set your API auth credientials before using making any calls
 */
Lingo.prototype.setup = function (space_id, token) {
    console.log(`space id: ${space_id} token: ${token}`)
    this.auth = "Basic " + new Buffer(space_id + ":" + token).toString("base64")
}

/**
 * Fetch all kits in your space
 * @returns {Promise} Success returns a list of kit objects
 */
Lingo.prototype.fetchKits = function () {
    return this.call('GET', '/kits').then(res => {
        return res.kits
    })
}

/**
 * Fetch a single kit and it's versions
 * @returns {Promise} Success returns a kit
 */
Lingo.prototype.fetchKit = function (id, options = ['use_versions']) {
    let path = `/kits/${id}/?options=${options.join(',')}`
    return this.call('GET', path).then(res => {
        return res.kit
    })
}

/**
 * Fetch the outline for a kit
 * @returns {Promise} Success returns a list of sections and headers
 */
Lingo.prototype.fetchKitOutline = function (id) {
    let path = `/kits/${id}/outline`
    return this.call('GET', path).then(res => {
        return res.kit_version.sections
    })
}

/**
 * Fetch a section and optionally page through items with it
 * @returns {Promise} Success the section and the items matching the page/limit
 */
Lingo.prototype.fetchSection = function (id, page = 1, limit = 50) {
    let path = `/sections/${id}`
    let params = { qs: { page, limit } }
    return this.call('GET', path, params).then(res => {
        return res.section
    })
}

/**
 * Fetch a section and optionally page through items with it
 * @returns {Promise} Success the section and the items matching the page/limit
 */
Lingo.prototype.searchAssetsInKit = function (kitID, query, page, limit) {
    let path = `/kits/${kitID}/search`
    let params = { qs: { query, page, limit } }
    return this.call('GET', path, params)
}

Lingo.prototype.call = function (method, path, more = {}) {
    const req = {
        uri: 'http://local.lingoapp.com:9000/alpha' + path,
        method: method,
        json: true,
        headers: {
            'Authorization': this.auth,
            'test': 'Hello',
        },
        ...more
    }

    const promise = new Promise(function (resolve, reject) {
        request(req, function (err, response, body) {
            if (body) {
                if (body.success === true) {
                    resolve(body.result)
                } else if (body.success === false) {
                    reject(body.error)
                } else {
                    console.log("Response is missing success flag " + body)
                    reject('Unexpecte response')
                }
            } else {
                reject(err)
            }
        })
    })
    return promise
}

module.exports = new Lingo()

