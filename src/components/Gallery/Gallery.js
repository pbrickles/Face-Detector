import React from "react";

const Gallery = ({photos}) => {
  return (
    <div className="gallery">
      {photos.map((photo, i) => (
        <img src={photo} key={i} alt={`image_${i}`} />
      ))}
    </div>
  );
};

export default Gallery;
