import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

const kommuneLayer = new VectorLayer({
  source: new VectorSource({
    url: "/kommuner.json",
    format: new GeoJSON(),
  }),
});
const KommunerCheckbox = () => {
  const [checked, setChecked] = useState(true);
  const { setLayers } = useContext(MapContext);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, kommuneLayer]);
    }
    return () => {
      setLayers((old) => old.filter((l) => l !== kommuneLayer));
    };
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
        kommuner
      </label>
    </>
  );
};
export default KommunerCheckbox;
