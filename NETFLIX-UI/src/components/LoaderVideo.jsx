import React from "react";
import netflixIntro from "../assets/netflix_gif.mp4";

const LoaderVideo = ({ onEnd }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
    <video
        src={netflixIntro}
        autoPlay
        muted
        style={{
            maxWidth: "110%",  
            maxHeight: "200%",  
            objectFit: "contain", 
            borderRadius: "10px", 
        }}
        onEnded={onEnd}
      />
    </div>
  );
};

export default LoaderVideo;
