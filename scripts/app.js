function init() {
    $(document).ready(function () {
        $('#close-btn').click(function () {
            $('#sidebar-wrapper').toggleClass('open');
        });

        $('#hamburger').click(function () {
            $('#sidebar-wrapper').toggleClass('open');
        });

        $(document).mouseup(function (e) {
            var container = $('#sidebar-wrapper');
            if (!container.is(e.target)
              && container.has(e.target).length === 0
              && $('#sidebar-wrapper').hasClass('open')) {
                $('#sidebar-wrapper').toggleClass('open');
            }
        });
        getWeather();
    });
}

function getWeather() {
    $.ajax({
        url: "http://api.wunderground.com/api/4e1fe0d302980707/geolookup/conditions/q/WA/seattle.json",
        dataType: "jsonp",
        success: function (parsed_json) {
            var conditions = parsed_json.current_observation.weather;
            loadImage(conditions);
        }
    });
}

function getTimeOfDay() {
    var time = new Date();
    var hours = time.getHours();
    var timeOfDay;

    if (hours > 17) {
        timeOfDay = 'night';
    } else if (hours > 12) {
        timeOfDay = 'afternoon';
    } else {
        timeOfDay = 'morning';
    }

    return timeOfDay;
}

function loadImage(conditions) {
    var imageSRC = 'img/weather/hero-'
    var validConditions = ["clear", "cloudy", "rain", "snow"];
    var timeOfDay = getTimeOfDay();
    conditions = conditions.toLowerCase();

    for (var i = 0; i < validConditions.length; i++) {
        if (conditions === validConditions[i]) {
            break;
        } else {
            conditions = 'cloudy';
        }
    }

    imageSRC = imageSRC + conditions + '-' + timeOfDay + '.jpg';
    $('#intro').css('background-image', 'url(' + imageSRC + ')');
}

init();
