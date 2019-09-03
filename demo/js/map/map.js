/**
 * Wrapper around HERE Javascript API
 */
function HERE(app_id, app_code) {
    var _onLoad = [];

    if(app_id === 'DEVELOPER_APP_ID' || app_code === 'DEVELOPER_APP_CODE') {
        alert('You must enter your own DEVELOPER_APP_ID and DEVELOPER_APP_CODE in credentials.js');
    }

    //Step 1: initialize communication with the platform
    var platform = new H.service.Platform({
        app_id: app_id,
        app_code: app_code,
        useCIT: false,
        useHTTPS: true
    });

    function onLoad(callback) {
        _onLoad.push(callback);
    }

    function normalisePosition(latitude, longitude) {
        var normal = {
            lat: false,
            lng: false
        };
        if (typeof latitude === "number" && typeof longitude === "number") {
            return {
                lat: latitude,
                lng: longitude
            };
        } else if (latitude instanceof Array && latitude.length >= 2) {
            return {
                lat: latitude[0],
                lng: latitude[1]
            }
        } else {
            return {
                lat: latitude.latitude || latitude.lat,
                lng: latitude.longitude || latitude.long || latitude.lon || latitude.lng
            }
        }
    }

    function initMap(mapElement, center, zoom) {

        var hidpi = ('devicePixelRatio' in window && devicePixelRatio > 1);

        var defaultLayers = platform.createDefaultLayers(256, hidpi ? 320 : null, null);

        var map = new H.Map(
            mapElement,
            defaultLayers.normal.map, {
                pixelRatio: 2,
                center: normalisePosition(center),
                zoom: zoom
            });

        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        map.addEventListener('mapviewchangeend', function() {
            _onLoad.forEach(function(callback) {
                callback(map);
            });
            _onLoad.length = 0;
        });

        window.addEventListener('resize', function () {
            map.getViewPort().resize(); 
        });
        
        return map;
    }

    var unboundSlice = Array.prototype.slice;
    var slice = Function.prototype.call.bind(unboundSlice);

    function center(map, position) {
        map.setCenter(normalisePosition(position));
    }

    function zoom(map, zoom) {
        map.setZoom(zoom);
    }

    function domMarker(map, position, domIcon) {
        position = normalisePosition(position);
        var marker = new H.map.DomMarker(position, {
            icon: domIcon
        });
        map.addObject(marker);
        return marker;
    }

    function marker(map, position, options) {
        position = normalisePosition(position);
        var marker = new H.map.Marker(position, options);
        map.addObject(marker);
        return marker;
    }

    function reverseGeocode(position, onSuccess, onError) {
        var geocoder = platform.getGeocodingService();
        var position = normalisePosition(position);
        reverseGeocodingParameters = {
            prox: position.lat + ',' + position.lng + ',150',
            mode: 'retrieveAddresses',
            maxresults: '1',
            jsonattributes: 1
        };

        geocoder.reverseGeocode(
            reverseGeocodingParameters,
            function(response) {
                var data = {};
                try {
                    data = response.response.view[0].result[0].location.address;
                } catch (e) {
                    onError('No address label');
                }
                onSuccess(data);
            },
            onError
        );
    }

    function extendPolyline(polyline, points) {
        var strip = polyline.getGeometry();
        points.forEach(function(point) {
            strip.pushPoint(normalisePosition(point));
        });
        polyline.setGeometry(strip);
        // polyline = new H.map.Polyline(strip, options);
        return polyline;
    }

    function polyline(map, points, options) {
        var strip = new H.geo.Strip();
        points.forEach(function(point) {
            strip.pushPoint(normalisePosition(point));
        });

        var line = new H.map.Polyline(strip, options);
        map.addObject(line);
        return line;
    }

    function polygon(map, points, options) {
        var strip = new H.geo.Strip();
        points.forEach(function(point) {
            if (!isNaN(point[0]) && !isNaN(point[1])) {
                strip.pushPoint(normalisePosition(point));
            }
        });
        var poly = new H.map.Polygon(strip, options);
        map.addObject(poly);
        return poly;
    }

    function circle(map, center, radius, options) {
        map.addObject(new H.map.Circle(
            // The central point of the circle
            normalisePosition(center),
            // The radius of the circle in meters
            radius, options
        ));
    }

    function createGroup(map) {
        var group = new H.map.Group();
        map.addObject(group);
        return group;
    }

    return {
        map: initMap,
        onLoad: onLoad,
        normalisePosition: normalisePosition,
        center: center,
        zoom: zoom,
        marker: marker,
        domMarker: domMarker,
        reverseGeocode: reverseGeocode,
        createGroup: createGroup,
        extendPolyline: extendPolyline,
        polyline: polyline,
        polygon: polygon,
        circle: circle
    }
}
