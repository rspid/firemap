// async function direction() {
//   const params = {
//     api_key: "5b3ce3597851110001cf624836756510b58a41c69393de284ed59e2e",
//     start: position,
//     end: "8.687872,49.420318",
//   };
//   const res = await axios.get(
//     "https://api.openrouteservice.org/v2/directions/driving-car",
//     {
//       params,
//     }
//   );
//   return res.data.features[0].properties;
// }
// const data = await direction();
// const stepsNumber = data.way_points.length;
// const steps = data.segments[0].steps;
// const duration = data.summary.duration;

"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const MapComponent = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const MyPage = () => {
  const [sensors, setSensors] = useState([]);
  const [bases, setBases] = useState([]);

  const fetchBases = async () => {
    try {
      const response = await axios.get("/api/base");
      setBases(response.data);
    } catch (error) {
      console.error("Erreur lors de la requête à votre API", error);
    }
  };

  // const createEvents = async () => {
  //   try {
  //     const response = await axios.post("/api/event", {
  //       sensors: [
  //         { id: 1, intensity: 1 },
  //         { id: 2, intensity: 3 },
  //         { id: 3, intensity: 5 },
  //         { id: 4, intensity: 7 },
  //         { id: 5, intensity: 9 },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error("Erreur lors de la requête à votre API", error);
  //   }
  // };

  // const updateSensors = async () => {
  //   try {
  //     const response = await axios.put("/api/event", {
  //       sensors: [
  //         { id: 1, intensity: 0 },
  //         { id: 2, intensity: 5 },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error("Erreur lors de la requête à votre API", error);
  //   }
  // };

  useEffect(() => {
    // createEvents();
    fetchBases();
    // updateSensors();

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sensor");
        setSensors(response.data);
      } catch (error) {
        console.error("Erreur lors de la requête à votre API", error);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 20000); // 10000 millisecondes = 10 secondes

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const data = { sensors, bases };

  return (
    <div>
      <MapComponent data={data} />
    </div>
  );
};

export default MyPage;
