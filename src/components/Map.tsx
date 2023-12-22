import { Base, Sensor, Vehicle } from "@/server/types";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";

type MapType = {
  data: {
    sensors?: Sensor[];
    bases: Base[];
    vehicles: Vehicle[];
  };
};

const baseIcon = new Icon({
  iconUrl: "/img/base2.png",
  iconSize: [50, 50],
});

const vehicleIcon = new Icon({
  iconUrl: "/img/vehicle.png",
  iconSize: [25, 25],
});

const Map = ({ data }: MapType) => {
  const { sensors, bases, vehicles } = data;
  return (
    <div>
      <MapContainer
        center={[45.763377, 4.861766]}
        zoom={14}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" />
        {bases.map((base) => (
          <Marker
            key={base.id}
            position={[base.latitude, base.longitude]}
            icon={baseIcon}
          />
        ))}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.latitude, vehicle.longitude]}
            icon={vehicleIcon}
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
      </MapContainer>
    </div>
  );
};

export default Map;
