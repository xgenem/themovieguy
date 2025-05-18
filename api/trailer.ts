import { ShowTypes } from "@/constants/showTypes";
import API from "@/utils/api";

const fetchTrailer = async (id: string, type: ShowType) => {
  try {
    const endpoint = type === ShowTypes.MOVIE ? `movie/${id}` : `tv/${id}`;
    const response = await API.get(`${endpoint}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error;
  }
};
export default fetchTrailer;
