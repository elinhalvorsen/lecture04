import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../components/context/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

const layer = new VectorLayer({
  className: "fylker",
  source: new VectorSource({
    url: "/lecture04/fylker.json",
    format: new GeoJSON(),
  }),
});
const FylkeCheckbox = () => {
  const [checked, setChecked] = useState(false);
  const { setLayers } = useContext(MapContext);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, layer]);
    }
    return () => setLayers((old) => old.filter((l) => l !== layer));
  }, [checked]);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide " : "Show "}
        fylker
      </label>
    </>
  );
};
export default FylkeCheckbox;
