import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "./constants";

export const getTrailerUrl = async (id, type = "movie") => {
  try {
    const endpoint =
      type === "movie"
        ? `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        : `${TMDB_BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`;

    const { data } = await axios.get(endpoint);

    const trailer = data.results.find(
      (vid) =>
        vid.type.toLowerCase() === "trailer" && vid.site.toLowerCase() === "youtube"
    );

    if (trailer) {
      return `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0`;
    } else {
      return null; 
    }
  } catch (err) {
    console.error("Erreur récupération trailer:", err);
    return null;
  }
};
