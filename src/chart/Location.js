import React from 'react';
import L from 'leaflet';

import Geocoder from 'leaflet-control-geocoder';

import './Location.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [13, 41], // point of the icon which will correspond to marker's location
    shadowAnchor: [13, 41], // the same for the shadow
    popupAnchor:  [0, -27]  // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const LONDON_LATLNG = [51.53299545398796,-0.12908935546875003];
const LONDON_QUERY = "London";


const Location = () => {
    React.useEffect(() => {
        // create map
        const map = L.map('map', {
            center: LONDON_LATLNG,
            zoom: 16,
            zoomControl: false,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });

        L.control.zoom({
            position:'topright'
        }).addTo(map);

        const geocoder = new L.Control.Geocoder.Nominatim();

        const geocoderControl = L.Control.geocoder({
            collapsed: true,
            position: "topleft",
            geocoder: geocoder,
            suggestMinLength: 3
        }).on('markgeocode', function(e) {
            console.log(e.geocode.center);
        }).addTo(map);

        geocoderControl.setQuery(LONDON_QUERY);

        const markGeocode = (result) => {
            if (!result.bbox) {
                result.bbox = L.latLngBounds(result.center, result.center);
            }
            if (!result.html && !result.name) {
                result.html = `[${result.center.lat}, ${result.center.lng}]`;
            }
            geocoderControl.markGeocode(result);
        }

        geocoder.geocode(LONDON_QUERY, (results) => {
            console.log(results);
            const result = results.length ? results[0] : { center: L.latLng(LONDON_LATLNG) };
            markGeocode(result);
        });

        map.on('dblclick', function(event) {
            console.log(event);
            const latlng = L.latLng(event.latlng);
            geocoder.reverse(latlng, 1, (results) => {
                console.log(results);
                let result = results.length ? results[0] : {};
                result = { ...result, center: latlng };
                markGeocode(result);
            });
        });

    }, []);

    return (<div id="map" className="leaflet-map"></div>);
};

export default Location;