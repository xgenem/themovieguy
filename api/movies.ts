import API from "@/utils/api";

export const fetchAllMovies = async () => {
  try {
    const response = await API.get("trending/all/day");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error;
  }
};
