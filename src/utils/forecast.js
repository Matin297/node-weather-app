const request = require('request');

const forecast = (long, lat, callback) => {
    const url = "https://api.darksky.net/forecast/8e27a87b6c5969bd40204ced14bc7b72/" + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + "?exclude=[minutely,hourly,alerts,flags]&units=si";

    request({
        url,
        json: true
    }, (err, res, {
        daily,
        currently,
        error
    }) => {
        if (err) callback('Unable to connect to darksky weather server! Please check your internet connection.');
        else if (error) callback('Unable to find the requested location! please try again.');
        else {
            callback(undefined, {
                dailySummary: daily.summary,
                todayDailySummary: daily.data[0].summary,
                temp: currently.temperature,
                precipProbability: currently.precipProbability
            })
        }
    })
}

module.exports = forecast;