$(() => {
    let $weatherInput = $('input');
    let messageOne = $('#message-1');
    let messageTwo = $('#message-2');

    $('form').submit((e) => {
        e.preventDefault();

        //empty the paragraphs
        messageOne.text('Loading...');
        messageTwo.text('');

        let location = $weatherInput.val();

        fetch('/weather?address=' + location).then(response => {
            response.json()
                .then(({
                    location,
                    error,
                    forecast
                } = {}) => {
                    if (error) messageOne.text(error)
                    else {
                        messageOne.text(location);
                        messageTwo.html(`${forecast.dailySummary} <br>
                        ${forecast.todayDailySummary} <br>
                        temperature: ${forecast.temp}&#x2103; <br>
                        Chances of rain: ${forecast.precipProbability}% <br>
                        High Temperature: ${forecast.highTemp}&#x2103; <br>
                        Low Temperature: ${forecast.lowTemp}&#x2103;`);
                    }
                })
        })
    })
})