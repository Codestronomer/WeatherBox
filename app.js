const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const request = require('request')

const access_key = process.env.access_key


request({url: `http://api.weatherstack.com/current?access_key=${access_key}&query=19147`,
        json: true},
        (error, response, body) => {
            if (error) console.log('Unable to connect to Weatherstack server')
            else if (body.success === false) {
                console.log(body.error.info)
            } else {
                console.log(JSON.stringify(body.current.temperature))
            }
})

const argv = yargs
    .options({
        address: {
            demand: true,
            describe: "Address to fetch weather for.",
            alias: "a",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// })
