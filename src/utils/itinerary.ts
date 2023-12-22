import axios from "axios";

export async function calculateRouteProperties(start: string, end: string) {
  const params = {
    api_key: "5b3ce3597851110001cf624836756510b58a41c69393de284ed59e2e",
    start,
    end,
  };

  const res = await axios.get(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      params,
    }
  );
  return res.data.features[0].properties;
}
