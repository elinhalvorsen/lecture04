import React, { useContext } from "react";
import { MapContext } from "../context/MapContext";
const KommunerAside = () => {
  const { layers } = useContext(MapContext);

  const kommunerLayer = layers.find((l) => l.getClassName() === "kommuner");
  return (
    <>
      <aside>
        <div>
          <h2>Kommuner {kommunerLayer ? "visable " : "hidden "}</h2>
        </div>
      </aside>
    </>
  );
};
export default KommunerAside;
