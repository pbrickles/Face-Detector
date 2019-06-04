import React, {useState} from "react";
import classnames from "classnames";
import SelectedImage from "../SelectedImage/SelectedImage";

import "./Gallery.css";

const Gallery = ({photos}) => {
  const [selected, setSelected] = useState(undefined);

  if (photos.length < 1) {
    return null;
  } else {
    return (
      <div className="gallery__container">
        {selected && <SelectedImage img={selected} />}
        <h2>Gallery</h2>
        <div className="gallery">
          {photos.map((photo, i) => (
            <img
              src={photo}
              key={i}
              alt={`image_${i}`}
              onClick={() => {
                setSelected(photo);
              }}
              className={classnames(
                "gallery__photo",
                photo === selected && "gallery__photo--selected"
              )}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Gallery;
