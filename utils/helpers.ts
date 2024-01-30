import axios from "axios";

export const fetchCityData = async (city: string) => {
  try {
    const response = await axios.get(
      `${process?.env?.NEXT_PUBLIC_WEATHER_API_URL}/current.json?key=${process?.env?.NEXT_PUBLIC_API_KEY}&q=${city}`
    );
    return { response, err: "" };
  } catch (error) {
    console.log(error, "[Weather-api-error]");
    return { response: {}, err: "Failed to fetch data!" };
  }
};
