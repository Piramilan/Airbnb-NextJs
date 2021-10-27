import { getCenter } from "geolib";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = ({ searchResults }) => {
  const [selectedLoaction, setSelectedLoaction] = useState({});
  //   Transform SearchResults Object Into The Lat,Lng
  const coordinates = searchResults.map(({ long, lat }) => ({
    longitude: long,
    latitude: lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 8,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/milan98/ckuphmx379p3y17s0hso8vpil"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((results) => (
        <div key={results.long}>
          <Marker
            longitude={results.long}
            latitude={results.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLoaction(results)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLoaction.long === results.long ? (
            <Popup
              onClose={() => setSelectedLoaction({})}
              closeOnClick={true}
              latitude={results.lat}
              longitude={results.long}
            >
              {results.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
