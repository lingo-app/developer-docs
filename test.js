const lingo = require('./index')
const assert = require('assert');
const config = require('./test_config')

let validConfig = (config.spaceID,
    config.apiToken,
    config.kitID,
    config.sectionID)
assert(validConfig, 'missing config attributes requires to run tests')


lingo.setup(config.spaceID, config.apiToken)

it('Should fetch kits', function (done) {
    lingo.fetchKits().then(res => {
        assert(res.length, 'expected kits')
        assert(res[0].kit_uuid, 'expected the kit to have a uuid')
        done()
    }).catch(err => {
        done(err)
    })
})

it('Should fetch kit with versions', function (done) {
    lingo.fetchKit(config.kitID).then(kit => {
        assert(kit.versions.length > 0, 'expected versions')
        done()
    }).catch(err => {
        done(err)
    })
})

it('Should fetch kit outline', function (done) {
    lingo.fetchKitOutline(config.kitID, 0).then(outline => {
        assert(outline.length > 0, 'expected versions')
        done()
    }).catch(err => {
        done(err)
    })
})

it('Should fetch section and items', function (done) {
    lingo.fetchSection(config.sectionID, 0).then(section => {
        assert(section.uuid == config.sectionID, 'expected sections')
        assert(section.items.length > 0, 'expected items')
        done()
    }).catch(err => {
        done(err)
    })
})

it('Should fetch search results', function (done) {
    lingo.searchAssetsInKit(config.kitID, 0, query = 'logo').then(results => {
        assert(results, 'expected sections')
        assert(results.query == 'logo', 'expected query to match')
        assert(results.sections, 'expected results')
        done()
    }).catch(err => {
        done(err)
    })
})

it('Should download asset file', function (done) {
    lingo.downloadAsset(config.assetID).then(result => {
        assert(result instanceof Buffer, 'expected file buffer')
        done()
    }).catch(err => {
        done(err)
    })
})