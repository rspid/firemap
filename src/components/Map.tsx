//1. Import dependencies for React, Leaflet, and other functionalities.
import { Base, Sensor } from "@/server/types";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { FC, useRef, useState } from "react";
import { Circle, MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

type MapType = {
  data: {
    sensors?: Sensor[];
    bases: Base[];
  };
};
// interface MarkerData {
//   coordinates: [number, number];
//   title: string;
// }

const baseIcon = new Icon({
  iconUrl: "/img/base2.png",
  iconSize: [50, 50], // size of the icon
});

const Map = ({ data }: MapType) => {
  const { sensors, bases } = data;

  // const ZoomHandler: FC = () => {
  //   const map = useMap();
  //   const flyToMarker = (coordinates: [number, number], zoom: number) => {
  //     if (coordinates && typeof coordinates[0] !== "undefined") {
  //       map.flyTo(coordinates, zoom, {
  //         animate: true,
  //         duration: 1.5,
  //       });
  //     }
  //   };
  //   return null;
  // };
  return (
    <div>
      <MapContainer
        center={[45.763377, 4.861766]}
        zoom={14}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
        {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" /> */}

        {/* {markerData && markerData.coordinates && (
          <Marker position={markerData.coordinates} icon={baseIcon} />
        )} */}
        {bases.map((base) => (
          <Marker
            key={base.id}
            position={[base.latitude, base.longitude]}
            icon={baseIcon}
          />
        ))}
        {sensors?.map((sensor) => (
          <Circle
            key={sensor.id}
            center={[sensor.latitude, sensor.longitude]}
            radius={sensor.intensity * 20}
            color={"#FF4901"}
          />
        ))}
        {/* <ZoomHandler /> */}
      </MapContainer>
    </div>
  );
};

export default Map;