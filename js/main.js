/**
 * Get URL parameters
 * @param name
 * @param url
 * @returns {*}
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Update time elements
 * @param options
 * @returns {boolean}
 */
function updateTime(options, interval)
{

    // Time to count down to
    var target = moment(options.stopTime, 'HH:mm');

    // The present time
    var now = moment();

    // Count the difference
    var timeleft = moment.duration(target.diff(now));

    // Set time variables
    var hours = moment.utc(timeleft.asMilliseconds()).format('HH');
    var min = moment.utc(timeleft.asMilliseconds()).format('mm');
    var sec = moment.utc(timeleft.asMilliseconds()).format('ss');

    // When all variables are down to zero and the timer is effectively finished
    // make sure everything is set to zero and clear the interval
    if (hours === '00' && min === '00' && sec === '00') {
        options.hour.text('00');
        options.min.text('00');
        options.sec.text('00');
        if (interval) clearInterval(interval);

        return false;
    }
    options.hour.text(hours);
    options.min.text(min);
    options.sec.text(sec);
}

/**
 * Do stuff
 */
(function() {
    // Get the time variables from URL
    var at = getParameterByName('at');
    var duration = getParameterByName('duration')

    // Target time
    var stopTime;

    if (at) {
        // If target time is set directly
        stopTime = moment(at, 'HH:mm');
    } else if (duration) {
        // If the duration is set
        stopTime = moment().add(juration.parse(duration), 'seconds');
    } else {
        // The default
        stopTime = moment().add(10, 'minutes');
    }

    // Add one second to make the countdown start from ie. 10:00, not 9:59
    stopTime.add(1, 'seconds');

    // Get the style variables from URL
    var font = getParameterByName('font') || 'Impact'; // Impact is the default font
    var color = getParameterByName('color');
    var spacing = getParameterByName('spacing');
    var size = getParameterByName('size');
    var weight = getParameterByName('weight');
    var shadow = getParameterByName('shadow');

    // Check if the requested font is available - if not, try to fetch it from Google Fonts
    var fontAvailable = document.fonts.check('1em ' + font);
    if (!fontAvailable) {
        WebFontConfig = {
            google: { families: [font]},
            active: function() {
                // Make sure all element widths are set after font rendering to prevent jumping
                var width = $('#measure').width();
                $('.number').css('width', width);
            }
        };

        (function(d) {
            var wf = d.createElement('script'), s = d.scripts[0];
            wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
            s.parentNode.insertBefore(wf, s);
        })(document);
    }

    /**
     * When the document is ready
     */
    $(document).ready(function () {

        // The parent element that contains the number elements
        var element = $('.countdown');

        /**
         * If variables are set, change styles accordingly
         */
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


        if (fontAvailable) {
            // Looks like we're using web safe fonts, let's make sure the widths are static
            // so the numbers won't jump
            var width = $('#measure').width();
            $('.number').css('width', width);
        }

        /**
         * Hour element
         * @type {*|jQuery|HTMLElement}
         */
        var hourElement = $('#hour');

        /**
         * Minute Element
         * @type {*|jQuery|HTMLElement}
         */
        var minElement = $('#min');

        /**
         * Second element
         * @type {*|jQuery|HTMLElement}
         */
        var secElement = $('#sec');

        /**
         * Set the first time
         */
        updateTime({
            'stopTime': stopTime,
            'hour': hourElement,
            'min': minElement,
            'sec': secElement
        });

        // Everything is set, make the time visible
        element.addClass('active');

        /**
         * Update the time every second
         */
        var interval = setInterval(function() {
            updateTime({
                'stopTime': stopTime,
                'hour': hourElement,
                'min': minElement,
                'sec': secElement
            }, interval)
        }, 1000);
    });
})();
