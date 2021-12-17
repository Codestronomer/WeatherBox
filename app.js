const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')
const request = require('request')

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


const address = geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage) console.log(errorMessage)
            else {console.log(`Its currently ${weatherResults.temperature}°C`);}
        });
    }
})

