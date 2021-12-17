const yargs = require('yargs')
const axios = require('axios')


const mpkey = process.env.mapboxkey
const access_key = process.env.access_key

const argv = yargs
    .options({
        address: {
            demand: true,
            description: "Address to fetch weather for",
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv


var geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(argv.address)}.json?access_token=${mpkey}`

axios.get(geocodeUrl).then((response) => {
    if (response.data.features < 1) {
        throw new Error('Unable to find that address.')
    }
    console.log(response.data.features[0].place_name)
    var lat = response.data.features[0].geometry.coordinates[1]
    var lng = response.data.features[0].geometry.coordinates[0]

    const weatherURL = `http://api.weatherstack.com/current?access_key=${access_key}&query=${lat},${lng}`
    return axios.get(weatherURL)
}).then((response) => {
    // console.log(response)
    let temperature = response.data.current.temperature
    console.log(`It's currently ${temperature}°C`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers')
    } else if (e)
        console.log(e.message)
    }
);

