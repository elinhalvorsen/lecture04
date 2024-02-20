import React, { useContext, useEffect, useMemo, useState } from "react";
import { MapContext } from "../components/context/MapContext";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Feature } from "ol";
type FylkeVectorLayer = VectorLayer<VectorSource<FylkeFeatures>>;

interface FylkeProperties {
  fylkenummer: string;
  navn: Stedsnavn[];
}
interface Stedsnavn {
  sprak: string;
  navn: string;
}

type FylkeFeatures = {
  getProperties(): FylkeProperties;
} & Feature;
const StedsNavn = (navn: Stedsnavn[]) => {
  return navn.find((n) => n.sprak === "nor")?.navn;
};
const useFylkeFeatures = () => {
  const { layers, map } = useContext(MapContext);

  const layer = layers.find(
    (l) => l.getClassName() === "fylke",
  ) as FylkeVectorLayer;

  const [features, setFeature] = useState<FylkeFeatures[]>();
  const [viewExtent, setViewExtent] = useState(
    map.getView().getViewStateAndExtent().extent,
  );

  const visableFeatures = useMemo(
    () =>
      features?.filter((f) => f.getGeometry()?.intersectsExtent(viewExtent)),
    [features, viewExtent],
  );
  const handleSourceChange = () =>
    setFeature(layer?.getSource()?.getFeatures());
  const handleViewChange = () =>
    setViewExtent(map.getView().getViewStateAndExtent().extent);

  useEffect(() => {
    layer?.getSource()?.on("change", handleSourceChange);
    return () => layer?.getSource()?.un("change", handleSourceChange);
  }, [layer]);

  useEffect(() => {
    map.getView().on("change", handleViewChange);
    return () => map.getView().un("change", handleViewChange);
  }, [map]);
  return { layer, features, visableFeatures };
};

const FylkeAside = () => {
  const { visableFeatures } = useFylkeFeatures();

  return (
    <>
      <aside className={visableFeatures?.length ? "visable " : "hidden "}>
        <div>
          <h2>Fylker</h2>
          <ul>
            {visableFeatures?.map((k) => (
              <li>{StedsNavn(k.getProperties().navn)}</li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
export default FylkeAside;
