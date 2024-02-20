import React, { useContext, useEffect, useMemo, useState } from "react";
import { MapContext } from "../context/MapContext";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Feature } from "ol";
type KommuneVectorLayer = VectorLayer<VectorSource<KommuneFeatures>>;
interface KommuneProperties {
  kommunenummer: string;
  navn: Stedsnavn[];
}
interface Stedsnavn {
  sprak: string;
  navn: string;
}

type KommuneFeatures = {
  getProperties(): KommuneProperties;
} & Feature;
const StedsNavn = (navn: Stedsnavn[]) => {
  return navn.find((n) => n.sprak === "nor")?.navn;
};
const useKommuneFeatures = () => {
  const { layers, map } = useContext(MapContext);

  const layer = layers.find(
    (l) => l.getClassName() === "kommuner",
  ) as KommuneVectorLayer;

  const [features, setFeature] = useState<KommuneFeatures[]>();
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

const KommunerAside = () => {
  const { visableFeatures } = useKommuneFeatures();
  return (
    <>
      <aside className={visableFeatures?.length ? "visable " : "hidden "}>
        <div>
          <h2>Kommuner</h2>
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
export default KommunerAside;
