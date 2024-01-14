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
  console.log(sensors);
  const [isSensorsShown, setIsSensorsShown] = React.useState(true);
  const [isVehiclesShown, setIsVehiclesShown] = React.useState(true);
  return (
    <div className="relative">
      <div>
        <MapContainer
          center={[45.763377, 4.861766]}
          zoom={14}
          style={{ height: "100vh", width: "100vw", zIndex: 1 }}
        >
          {/* <TileLayer url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png" /> */}
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" />

          {bases.map((base) => (
            <Marker
              key={base.id}
              position={[base.latitude, base.longitude]}
              icon={baseIcon}
            />
          ))}
          {isVehiclesShown &&
            vehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={[vehicle.latitude, vehicle.longitude]}
                icon={vehicleIcon}
              />
            ))}
          {isSensorsShown &&
            sensors?.map((sensor) => (
              <Circle
                key={sensor.id}
                center={[sensor.latitude, sensor.longitude]}
                radius={sensor.intensity * 20}
                color={"#FF4901"}
              />
            ))}
        </MapContainer>
      </div>
      <button
        onClick={() => setIsSensorsShown(!isSensorsShown)}
        className={`px-3 py-2 rounded-lg absolute bottom-12 left-6 z-50 ${
          isSensorsShown ? "bg-red-700" : "bg-green-700"
        }`}
      >
        {isSensorsShown ? "Hide Sensors" : "Show Sensors"}
      </button>
      <button
        onClick={() => setIsVehiclesShown(!isVehiclesShown)}
        className={`px-3 py-2 rounded-lg absolute bottom-24 left-6 z-50 ${
          isVehiclesShown ? "bg-red-700" : "bg-green-700"
        }`}
      >
        {isVehiclesShown ? "Hide Vehicles" : "Show Vehicles"}
      </button>
    </div>
  );
};

export default Map;
