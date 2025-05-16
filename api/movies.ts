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
