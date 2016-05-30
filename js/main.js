function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function refresh() {


}

$(document).ready(function () {

    var startTime = getParameterByName('at');
    var duration = getParameterByName('duration');
    var then = moment().add(duration, 'minutes');
    var element = $('.countdown');

    var interval = setInterval(function () {
        var now = moment();
        var timeleft;

        if (startTime) {
            then = moment(startTime, 'HH:mm');

        }

        timeleft = moment.duration(then.diff(now));

        var format = "mm:ss";
        var hours = timeleft.hours();
        if (hours > 0) {
            format = "HH:" + format;
        }
        var response = moment.utc(timeleft.asMilliseconds()).format(format);
        if (then.isBefore(now)) {
            response = '00:00';
            clearInterval(interval);
        }
        element.text(response);
    }, 1000);

});