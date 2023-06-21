const request =  require('request');

const forecast = (latitude, longitude, callback) => {

    const url   =   'http://api.weatherstack.com/current?access_key=765325d1be2183c5fed7811c62fd6f25&query='+latitude+','+longitude;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const current = body.current;
            callback(undefined, 'The temperature is ' + current.temperature + ', but feels like ' + current.feelslike)
        }
    })

}

module.exports = forecast;