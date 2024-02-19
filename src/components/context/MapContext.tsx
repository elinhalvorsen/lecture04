import React, { Dispatch, SetStateAction } from "react";
import Layer from "ol/layer/Layer";

export const MapContext = React.createContext<{
  setLayers: Dispatch<SetStateAction<Layer[]>>;
}>({
  setLayers: () => {},
});
