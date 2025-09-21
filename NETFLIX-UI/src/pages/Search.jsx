import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CardSlider from "../components/CardSlider";
import Navbar from "../components/Navbar";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants"; 
import background from "../assets/background.jpg"; 
import styled from 'styled-components';
import Footer from '../components/Footer';



export default function Search() {
  const location = useLocation();
  const query = (new URLSearchParams(location.search).get("query") || "").trim();
  const localMovies = useSelector((state) => state.netflix.movies) || [];
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



useEffect(() => {
  if (!query) {
    setResults([]);
    return;
  }

  let cancelled = false;
  const fetchResults = async () => {
    setLoading(true);
    const qLower = query.toLowerCase();

    const filteredLocal = localMovies.filter((movie) => {
      const name = (movie.name || movie.title || movie.original_name || movie.original_title || "")
        .toString()
        .toLowerCase();
      return name.includes(qLower);
    });

    try {
      const url = `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=false`;
      const { data } = await axios.get(url);
      if (cancelled) return;

      const mapped = (data.results || []).map((item) => ({
        id: item.id,
        name: item.title || item.name || item.original_title || item.original_name || "",
        image: item.backdrop_path || item.poster_path || "",
        genres: [],
        media_type: item.media_type,
      }));
      const merged = [...filteredLocal];

      mapped.forEach((item) => {
        if (!merged.find((m) => m.id === item.id)) {
          merged.push(item);
        }
      });

      setResults(merged);
    } catch (err) {
      console.error("Search TMDB error:", err);
      setResults(filteredLocal);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  fetchResults();
  return () => {
    cancelled = true;
  };
}, [query, localMovies]);

  return (
    <Container>
        <Navbar isScrolled={isScrolled} />
    
    
    <div 
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
        }}
    />
    
        <div
        style={{
            minHeight: "100vh",
            paddingTop: "6rem",
        }}
        >
            
            <div style={{ marginTop: "6rem", padding: "2rem", color: "white" }}>
                <h2 style={{marginBottom : "2rem"}}>Search results for: {query || "—"}</h2>

                {loading ? (
                <p>Loading results…</p>
                ) : results.length > 0 ? (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "1rem",
                    }}>
                        {results.map((movie)=>(
                            <div key={movie.id}
                                style={{
                                    backgroundColor: "#111",
                                    borderRadius: "5px",
                                    overflow: "hidden",
                                    textAlign: "center",
                                }}
                            >
                                {movie.image ?(
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                                        alt={movie.name}
                                        style={{ width: "100%", height: "250px", objectFit: "cover" }}
                                    />
                                ):(
                                    <div style={{
                                            width: "100%",
                                            height: "200px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#333",
                                        }}>
                                            No Image
                                    </div>
                                )}
                                <p style={{ padding: "0.5rem", fontSize: "0.9rem" }}>{movie.name}</p>
                            </div>
                            ))}

                </div>
                ) : (
                <p>No results found.</p>
                )}
            </div>
        </div>
        
    
      <Footer/>
    </Container>
  );
}


const Container = styled.div`

`;

