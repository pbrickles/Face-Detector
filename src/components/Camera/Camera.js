import React, {useState, useRef} from "react";
import Webcam from "react-webcam";

import "./Camera.css";
import Button from "../Button/Button";
import Gallery from "../Gallery/Gallery";
import SelectedImage from "../SelectedImage/SelectedImage";


const Camera = ({photoMode}) => {
  const camera = useRef();
  const [photo, setPhoto] = useState(undefined);
  const [showGallery, setShowGallery] = useState(false);
  const [photos, setPhotos] = useState([]);
  const toggleGallery = () => setShowGallery(!showGallery);

  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    const newPhotos = [...photos, imgSrc];
    setPhotos(newPhotos);
    setPhoto(imgSrc);
  };
  const reset = () => {
    setPhoto(undefined);
    setPhotos([]);
    setShowGallery(true);
  };
  return (
    <div className="camera">
        <Webcam audio={false} ref={camera} height={400} width={400} />
      <div className="camera__button-container">
        {photoMode && (<Button onClick={toggleGallery}>
          {showGallery ? "Hide " : "Show "} Gallery
        </Button>)}
        {photoMode && <Button onClick={capture}>Take Photo</Button>}
        {photos.length > 0 && <Button onClick={reset}>Reset</Button>}
      </div>
      {photo && photoMode && (
        <div className="camera selected-image">
          <SelectedImage img={photo} />
        </div>
      )}
    
      {photos.length > 0 && showGallery && <Gallery photos={photos} />}
    </div>
  );
};

export default Camera;
