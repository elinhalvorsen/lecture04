import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { MapContext, map } from "../context/MapContext";
import KommunerCheckbox from "../kommuner/KommunerCheckbox";
import Layer from "ol/layer/Layer";
import KommunerAside from "../kommuner/KommunerAside";
import FylkeCheckbox from "../../fylke/FylkeCheckbox";
import FylkeAside from "../../fylke/FylkeAside";

const MapApplication = () => {
  //Denne gjør slik at den fokuserer på der jeg befinner meg nå
  const handleFocusUser = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 8,
      });
    });
  };

  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => map.setLayers(layers), [layers]);

  useEffect(() => map.setTarget(mapRef.current), []);
  return (
    <MapContext.Provider value={{ map, setLayers, layers }}>
      <header>
        <h1>Lecture 4 Map</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Focus on me
        </a>
        <KommunerCheckbox />
        <FylkeCheckbox />
      </nav>
      <main>
        <div ref={mapRef}></div>
        <KommunerAside />
        <FylkeAside />
      </main>
    </MapContext.Provider>
  );
};
export default MapApplication;
