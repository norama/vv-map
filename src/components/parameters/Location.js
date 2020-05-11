import React, { useEffect } from 'react';
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

const Location = ({ latlng, query, onChange }) => {

    useEffect(() => {

        // onChange callback
        const handleChange = (result) => {
            onChange({ latlng: [result.center.lat, result.center.lng], name: result.name });
        };

        // create map
        const map = L.map('map', {
            center: latlng,
            zoomControl: false,
            zoom: 7,
            layers: [
                L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    maxZoom: 17,
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
                L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                    maxZoom: 17,
                    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                })
            ]
        });

        //map.zoomOut();

        L.control.zoom({
            position:'topright'
        }).addTo(map);

        const geocoder = new L.Control.Geocoder.Nominatim();

        const geocoderControl = L.Control.geocoder({
            collapsed: true,
            position: "topleft",
            geocoder: geocoder,
            query: query,
            suggestMinLength: 3,
            placeholder: "Search query or lat,lng"
        }).on('markgeocode', function(e) {

            handleChange(e.geocode);

            setTimeout(() => {
                geocoderControl._expand();
            }, 500);
        }).on('collapse', function() {
            setTimeout(() => {
                geocoderControl._expand();
            }, 500);
        }).addTo(map);

        geocoderControl._toggle = geocoderControl._geocode;
        
        const searchInput = document.querySelector('.leaflet-control-geocoder-form input');

        const markGeocode = (result) => {
            if (!result.bbox) {
                result.bbox = L.latLngBounds(result.center, result.center);
            }
            if (!result.html && !result.name) {
                result.html = `[${result.center.lat}, ${result.center.lng}]`;
                result.name = '';
            }
            geocoderControl.markGeocode(result);

            handleChange(result);

            setTimeout(() => {
                geocoderControl._expand();
            }, 500);
        }

        geocoder.geocode(query, (results) => {
            const result = results.length ? results[0] : { center: L.latLng(latlng) };
            markGeocode(result);
        });

        map.on('expand', function() {
            searchInput.focus();
        });

        map.on('dblclick', function(event) {
            const latlng = L.latLng(event.latlng);
            geocoder.reverse(latlng, 1, (results) => {
                searchInput.value = "" + latlng.lat + "." + latlng.lng;
                let result = results.length ? results[0] : {};
                result = { ...result, center: latlng };
                markGeocode(result);
            });
        });

        setTimeout(() => {
            geocoderControl._expand();
        }, 500);
    }, []);

    return (
        <div className="__Location__">
            <h5 className="title">Location (search or double click on map):</h5>
            <div id="map" className="leaflet-map"></div>
        </div>
    );
};

export default Location;