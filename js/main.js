function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {

    var startTime = getParameterByName('at');
    var duration = getParameterByName('duration');
    var color = getParameterByName('color');
    var spacing = getParameterByName('spacing');
    var font = getParameterByName('font');
    var weight = getParameterByName('weight');
    var then = moment().add(duration, 'minutes');
    var element = $('.countdown');
    
    if (color) {
        element.css('color', '#' + color);
    }
    if (spacing) {
        element.css('letter-spacing', spacing);
    }
    if (font) {
        element.css('font-family', font);
    }
    if (weight) {
        element.css('font-weight', weight);
    }

    var minElement = $('#min');
    var secElement = $('#sec');

    var width = minElement.width();

    $('.number').css('width', width);

    var interval = setInterval(function () {
        var now = moment();
        var timeleft;

        if (startTime) {
            then = moment(startTime, 'HH:mm');

        }

        timeleft = moment.duration(then.diff(now));

        var min = moment.utc(timeleft.asMilliseconds()).format('mm');
        var sec = moment.utc(timeleft.asMilliseconds()).format('ss');
        if (then.isBefore(now)) {
            response = '00:00';
            clearInterval(interval);
        }
        minElement.text(min);
        secElement.text(sec);
    }, 1000);

});
