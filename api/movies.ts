import API from "@/utils/api";

export const fetchAllMovies = async (filter: string) => {
  try {
    const response = await API.get(`trending/${filter}/day`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error;
  }
};

export const fetchDetails = async (
  id: string,
  type: "tv" | "movie" = "movie"
) => {
  try {
    const response = await API.get(`${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details: ", error);
    throw error;
  }
};
