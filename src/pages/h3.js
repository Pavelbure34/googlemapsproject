import React, {useRef, useEffect} from 'react';
import axios from 'axios';    //making HTTP/HTTPS request
import {
    geoToH3,                  //computing h3 Index
    h3ToGeoBoundary,          //computing and acquiring coordinates for single polygon
    kRing,                    //computing and acquiring h3 indexes for adjacent polygons 
    h3SetToMultiPolygon       //computing and acquiring coordinates for multiple adjacent polygons
} from "h3-js";
import {TriggerPolygonButton} from '../components';

/*
    This file is a page for the path of "/h3".
    It uses one separate Buttons component
    because the button text needs to be re-rendered
    after each click.
    This page uses useRef hook to avoid unnecessary re-rendering.

    Param(s):
        - apiKey: apiKey for google map**(REQUIRED)
        - ip: ip address of target company

    Return:
        - a page which google map has polygon drawn.
*/

const H3 = ({ip})=>{
    const map = useRef(null);        //reference object for accessing map div 
    const googleMap = useRef(null);  //reference object for storing google maps object
    const h3Index = useRef(null);    //reference object for storing h3Index
    
    useEffect(()=>{
        /*
            When the page is rendered for the first time,
            load the script to the head directly.
        */
        //attach your callback function to the `window` object
        window.initMap = ()=>{        
            googleMap.current = new window.google.maps.Map(         
                map.current, {
                center: {
                    lat: 37.546,   //centering location
                    lng: 126.949
                }, zoom: 10        
            });
        };

        //acquiring h3Index for h3 library
        axios.get(`https://freegeoip.app/json/${ip}`).then(res=>{
            const {latitude, longitude} = res.data;
            h3Index.current = geoToH3(latitude, longitude, 7);
        }).catch(e=>console.log(e));
    }, [ip]);
   
    const getGeoJSON = (coords)=>{                      
        /*
            this function converts an array of array holding latitude and longitude data
            into an array of JSON holding the same data under the parameter of lat and lng
            in order to feed into Polygon method.

            Param(s):
                - coords: an array of coordinates
                
            Return:
                - converted coords whose type is an array of JSON
        */
        coords.map((coord, i)=>coords[i] = {lat:coord[0], lng:coord[1]});
        return coords;
    }

    const makePolygonOnMap = (coords, fillColor)=>{     
        /*
            this function writes polyon on the map based on the given coordinates.
            Param(s):
                - coords: an array of coordinates
                - fillColor: a string indicating a color used to fill the polygon(s)

            Return:
                - None
        */
        const polygon = new window.google.maps.Polygon({
            paths: coords,
            strokeOpacity: 0.5,
            strokeWeight: 3,
            fillColor,
            fillOpacity:0.5
        });
        polygon.setMap(googleMap.current);  //draw polygon on the map
    }
    
    return (
        <div>
            <section id="map" ref={map}/>
            <section id="triggerPolygonButton_div">
                <TriggerPolygonButton
                    initialButtonEvent={()=>makePolygonOnMap(
                        getGeoJSON(h3ToGeoBoundary(h3Index.current)),
                        "#0000ff"
                    )}
                    secondButtonEvent={()=>makePolygonOnMap(
                        getGeoJSON(h3SetToMultiPolygon(kRing(h3Index.current, 1))[0][0]),
                        "#ff0000"
                    )}
                />
            </section>
        </div>
    );
}

export {H3};
