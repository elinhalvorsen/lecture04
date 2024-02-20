import React, { useContext } from "react";
import { MapContext } from "../context/MapContext";
const KommunerAside = () => {
  const { layers } = useContext(MapContext);

  const kommunerLayer = layers.find((l) => l.getClassName() === "kommuner");
  return (
    <>
      <aside className={kommunerLayer ? "visable " : "hidden "}>
        <div>
          <h2>Kommuner</h2>
        </div>
      </aside>
    </>
  );
};
export default KommunerAside;
