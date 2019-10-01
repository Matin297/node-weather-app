const request = require('request');

const geoCoding = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXNtYW1pcjI5NyIsImEiOiJjazE1MWRhbnEwZTlhM2ltcnk0am01NHoxIn0.D8oo7eab_fkxvB-jglJmDw&limit=1';

    request({
        url,
        json: true
    }, (err, res, {
        features
    }) => {
        if (err)
            callback('Unable to connect to weather services! please checkout your internet connection.');
        else if (features.length) {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        } else
            callback('Unable to find the requested location! please try again.');
    })

}

module.exports = geoCoding;