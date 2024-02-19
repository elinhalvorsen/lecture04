import React, { MutableRefObject, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import KommunerCheckbox from "../kommuner/KommunerCheckbox";

useGeographic();
const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({ center: [10, 59], zoom: 8 }),
});

const MapApplication = () => {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  return (
    <>
      <header>
        <h1>Lecture 4 Map</h1>
      </header>
      <nav>
        <KommunerCheckbox />
      </nav>
      <div ref={mapRef}></div>
    </>
  );
};
export default MapApplication;
