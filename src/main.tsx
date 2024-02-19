import React from "react";
import ReactDom from "react-dom/client";
import MapApplication from "./components/application/MapApplication";

import "./main.css";
import "ol/ol.css";

ReactDom.createRoot(document.getElementById("root")!).render(
  <MapApplication />,
);
