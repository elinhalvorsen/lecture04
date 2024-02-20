import React, { useContext, useEffect, useState } from "react";
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
  const { layers } = useContext(MapContext);

  const kommunerLayer = layers.find(
    (l) => l.getClassName() === "kommuner"
  ) as KommuneVectorLayer;
  const [features, setFeature] = useState<KommuneFeatures[]>();

  const handleSourceChange = () => {
    setFeature(kommunerLayer?.getSource()?.getFeatures());
  };

  useEffect(() => {
    kommunerLayer?.getSource()?.on("change", handleSourceChange);
    return () => kommunerLayer?.getSource()?.un("change", handleSourceChange);
  }, [kommunerLayer]);
  return { kommunerLayer, features };
};

const KommunerAside = () => {
  const { features } = useKommuneFeatures();

  return (
    <>
      <aside className={features?.length ? "visable " : "hidden "}>
        <div>
          <h2>Kommuner</h2>
          <ul>
            {features?.map((k) => <li>{StedsNavn(k.getProperties().navn)}</li>)}
          </ul>
        </div>
      </aside>
    </>
  );
};
export default KommunerAside;
