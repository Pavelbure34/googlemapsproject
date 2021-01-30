import React, {useState, useEffect} from 'react';
import axios from 'axios';  //for HTTP request
import {
    geoToH3,
    h3ToGeoBoundary,
    kRing,
    h3SetToMultiPolygon
} from "h3-js";
import {Loader} from "@googlemaps/js-api-loader";
import {Buttons} from '../components';

/*
    This file is a page for the path of "/h3".
    It uses one separate Buttons component
    to enable partial rerendering.
    
    Param(s):
        - apiKey: apiKey for google map**(REQUIRED)
        - ip: ip address of target company

    Return:
        - a page which google map has polygon drawn.
*/

const H3 = ({apiKey, ip})=>{
    const [lat, setLat] = useState(37.546);      //latitude
    const [lng, setLng] = useState(126.949);     //longtitude
    const [h3Index, setH3Index] = useState(0);   //h3Index for polygon coordinates
    let map;                                     //map instance
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");

    useEffect(                                   //based on IP, recomputes the target lat and lng, then h3Index
        ()=>axios.get(`https://freegeoip.app/json/${ip}`).then(res=>{
            const {latitude, longitude} = res.data;
            setH3Index(geoToH3(lat, lng, 7));
            setLat(latitude);
            setLng(longitude);
        }).catch(e=>console.log(e))
    );                                            //run this as soon as page renders but only once.

    const loader = new Loader({                   //initial prep for google map
        apiKey,
        version:"weekly"
    });

    loader.load().then(()=>{                      //initiating google map
        map = new window.google.maps.Map(         
            document.getElementById("map"), {
            center: {lat, lng},
            zoom: 10
        });

        new window.google.maps.event.addDomListener( //tying button event to map
            button1, 
            "click",
            ()=>makePolygonOnMap(
                getGeoJSON(h3ToGeoBoundary(h3Index)),      //drawing the first target polygon
                "#0000ff"
            )
        );
        
        new window.google.maps.event.addDomListener( //tying button event to map
            button2, 
            "click",
            ()=>makePolygonOnMap(
                getGeoJSON(h3SetToMultiPolygon(kRing(h3Index, 1))[0][0]), //drawing adjacent polygons
                "#ff0000"
            )
        );
    }).catch(e=>console.log(e));

    const getGeoJSON = (coords)=>{                      //converting resulting array of array into array of JSON
        for (let i in coords){
            const coord = coords[i];
            coords[i] = {lat:coord[0], lng:coord[1]};
        }
        return coords;
    }

    const makePolygonOnMap = (coords, fillColor)=>{     //writing polygon on the map
        const polygon = new window.google.maps.Polygon({
            paths: coords,
            strokeOpacity: 0.5,
            strokeWeight: 3,
            fillColor,
            fillOpacity:0.5
        });
        polygon.setMap(map);
    }
    
    return (
        <div>
            <section id="map"/>
            <Buttons/>
        </div>
    );
}

export {H3};
