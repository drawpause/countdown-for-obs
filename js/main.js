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
    var size = getParameterByName('size');
    var weight = getParameterByName('weight');
    var shadow = getParameterByName('shadow');
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
    if (size) {
        element.css('font-size', size);
    }
    if (weight) {
        element.css('font-weight', weight);
    }
    if (shadow === 'false') {
        element.removeClass('shadow');
    }

    WebFont.load({
        google: {
            families: [font]
        }
    });

    var hourElement = $('#hour');
    var minElement = $('#min');
    var secElement = $('#sec');

    var interval = setInterval(function () {
        var now = moment();
        var timeleft;

        if (startTime) {
            then = moment(startTime, 'HH:mm');

        }
        timeleft = moment.duration(then.diff(now));
        var hours = moment.utc(timeleft.asMilliseconds()).format('HH');
        var min = moment.utc(timeleft.asMilliseconds()).format('mm');
        var sec = moment.utc(timeleft.asMilliseconds()).format('ss');
        if (hours === '00' && min === '00' && sec === '00') {
            hourElement.text('00');
            minElement.text('00');
            secElement.text('00');
            clearInterval(interval);
            return false;
        }
        hourElement.text(hours);
        minElement.text(min);
        secElement.text(sec);
        var width = $('#measure').width();
        $('.number').css('width', width);
    }, 1000);

});
