import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import { MapContext } from "../context/MapContext";
import KommunerCheckbox from "../kommuner/KommunerCheckbox";
import Layer from "ol/layer/Layer";

useGeographic();
const map = new Map({
  view: new View({ center: [10, 59], zoom: 8 }),
});

const MapApplication = () => {
  //Denne gjør slik at den fokuserer på der jeg befinner meg nå
  const handleFocusUser = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 10,
      });
    });
  };

  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);
  useEffect(() => map.setLayers(layers), [layers]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  return (
    <MapContext.Provider value={{ setLayers }}>
      <header>
        <h1>Lecture 4 Map</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Focus on me
        </a>
        <KommunerCheckbox />
      </nav>
      <div ref={mapRef}></div>
    </MapContext.Provider>
  );
};
export default MapApplication;
