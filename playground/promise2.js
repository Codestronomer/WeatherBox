const request = require('request')

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9obnJ1bWlkZSIsImEiOiJja3gyaGs4cmsxYmRtMnFvYmw5azg4bThwIn0.4f5yMce80Ncp9kAVoU79oA`,
            json: true}, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Mapbox servers.')
            } else if (body.features.length < 1) {
                reject('Unable to find that address.')
            } else {
                resolve({
                    address: body.features[0].place_name,
                    latitude: body.features[0].geometry.coordinates[1],
                    longitude: body.features[0].geometry.coordinates[0]
                })
            };
        });
    })
};

geocodeAddress('000000').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});