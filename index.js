
const request = require('request')

const Lingo = function () { }

/**
 * Set your API auth credientials before using making any calls
 * @param {integer} spaceID The id of your Lingo space
 * @param {string} token An API token for your space
 */
Lingo.prototype.setup = function (spaceID, token) {
    console.log(`space id: ${spaceID} token: ${token}`)
    this.auth = "Basic " + new Buffer(spaceID + ":" + token).toString("base64")
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
 * @param {uuid} id the kit uuid
 * @param {string} include optionally include versions of the kit. valid options are:
 * - `use_versions`: include the draft and recommended version (if different)
 * - `versions`: include all versions
 * - `null`: don't include any versions
 * @returns {Promise} Success returns a kit
 */
Lingo.prototype.fetchKit = function (id, include = 'use_versions') {
    let path = `/kits/${id}/?options=${include}`
    return this.call('GET', path).then(res => {
        return res.kit
    })
}

/**
 * Fetch the outline for a kit
 * @param {uuid} id the kit uuid
 * @param {integer} version the version number of the kit to fetch
 * @returns {Promise} Success returns a list of sections and headers
 */
Lingo.prototype.fetchKitOutline = function (id, version) {
    let path = `/kits/${id}/outline?v=${version}`
    return this.call('GET', path).then(res => {
        return res.kit_version.sections
    })
}

/**
 * Fetch a section and optionally page through items with it
 * @param {uuid} id the section uuid
 * @param {integer} version the version number of the section to fetch
 * @param {integer} limit The max number of items to fetch
 * @param {integer} page the page of items
 * @returns {Promise} Success the section and the items matching the page/limit
 */
Lingo.prototype.fetchSection = function (id, version, page = 1, limit = 50) {
    let path = `/sections/${id}`
    let v = version
    let params = { qs: { v, page, limit } }
    return this.call('GET', path, params).then(res => {
        return res.section
    })
}

/**
 * Search the items in a kit.
 * @param {uuid} kitID The uuid of the kit to search
 * @param {integer} version The version to search
 * @param {string} query A search query to filter by
 * @param {integer} page For paging resutls
 * @param {integer} limit The max number of results per page
 * @returns {Promise} Returns the results, grouped by section.
 */
Lingo.prototype.searchAssetsInKit = function (kitID, version, query, page, limit) {
    const path = `/kits/${kitID}/search`
    const v = version
    let params = { qs: { v, query, page, limit } }
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

