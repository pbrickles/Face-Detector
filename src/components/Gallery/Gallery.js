import React, {useState, useEffect} from "react";
import classnames from "classnames";
import SelectedImage from "../SelectedImage/SelectedImage";

import "./Gallery.css";

const Gallery = props => {
  const [selected, setSelected] = useState(props.selected);
  const [photos, setPhotos] = useState(props.photos);

  useEffect(() => {
    if (photos.length < props.photos.length) {
      setSelected(props.selected);
      setPhotos(props.photos);
    }
  }, [photos.length, props.photos.length, props.photos, props.selected]);

  if (photos.length < 1) {
    return null;
  } else {
    return (
      <div className="gallery__container">
        {selected && <SelectedImage img={selected} />}
        {props.show && (
          <>
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
          </>
        )}
      </div>
    );
  }
};

export default Gallery;
