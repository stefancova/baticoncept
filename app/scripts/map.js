var baticonceptMap = (function () {
    'use strict';

    /* google maps */
    google.maps.visualRefresh = true;
    var $map = $('#map-wrapper');
    var map;

    /**
     * _initGoogleMap
     * @private
     */
    var _initGoogleMap = function () {
        var geocoder = new google.maps.Geocoder();
        var address = $('#map-input').text();
        /* change the map-input to your address */
        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        if (geocoder) {
            geocoder.geocode({ 'address': address}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (status !== google.maps.GeocoderStatus.ZERO_RESULTS) {
                        map.setCenter(results[0].geometry.location);

                        var infowindow = new google.maps.InfoWindow(
                            {
                                content: address,
                                map: map,
                                position: results[0].geometry.location,
                            });

                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: address
                        });

                    } else {
                        alert("No results found");
                    }
                }
            });
        }
    };

    /**
     * _showHideMap
     * @private
     */
    var _showHideMap = function(){

        $map.velocity({ translateZ: 0, translateX: '100%' }, 0);
        $map.show();

        $('#show-map').on('click', function () {
            $map.velocity({ translateZ: 0, translateX: '0' }, 'easeOutQuart' , 750);
        });
        $('#hide-map').on('click', function () {
            $map.velocity({ translateZ: 0, translateX: '100%' }, 'easeOutQuart' , 750);
        });
    };

    var init = function () {
        _showHideMap ();
        _initGoogleMap();
    };


    return {
        init: init
    };
})();