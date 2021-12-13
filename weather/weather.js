const request = require('request')

const access_key = process.env.access_key

function getWeather(lat, lng, callback) {
    request({url: `http://api.weatherstack.com/current?access_key=${access_key}&query=${lat},${lng}`,
        json: true},
        (error, response, body) => {
            if (error) callback('Unable to connect to Weatherstack server')
            else if (body.success === false) {
                callback(body.error.info)
            } else {
                callback(undefined, {
                    temperature: body.current.temperature
                })
            };
        }
    );
};

module.exports.getWeather = getWeather;