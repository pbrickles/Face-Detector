import React, {useState, useRef} from "react";
import Webcam from "react-webcam";

import "./Camera.css";
import Button from "../Button/Button";
import Gallery from "../Gallery/Gallery";

const Camera = props => {
  const camera = useRef();
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);
  const toggleCamera = () => setShowCamera(!showCamera);
  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    const newPhotos = [...photos, imgSrc];
    setPhotos(newPhotos);
  }
  return (
    <div className="camera">
      {showCamera && <Webcam audio={false} ref={camera} />}
      <div className="camera__button-container">
        <Button onClick={toggleCamera}>
          {showCamera ? "Hide " : "Show "}Camera
        </Button>
        {showCamera && <Button onClick={capture}>Take Photo</Button>}
      </div>
      <Gallery photos={photos} />
    </div>
  );
};

export default Camera;
