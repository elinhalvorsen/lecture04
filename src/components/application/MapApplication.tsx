import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { MapContext, map } from "../context/MapContext";
import KommunerCheckbox from "../kommuner/KommunerCheckbox";
import Layer from "ol/layer/Layer";
import KommunerAside from "../kommuner/KommunerAside";
import FylkeCheckbox from "../../fylke/FylkeCheckbox";
import FylkeAside from "../../fylke/FylkeAside";
import HandleFocusUser from "./HandleFocusUser";

const MapApplication = () => {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);

  useEffect(() => map.setLayers(layers), [layers]);
  useEffect(() => map.setTarget(mapRef.current), []);
  return (
    <MapContext.Provider value={{ map, setLayers, layers }}>
      <header>
        <h1>Lecture 4 Map</h1>
      </header>
      <nav>
        <a href={"#"} onClick={HandleFocusUser}>
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
