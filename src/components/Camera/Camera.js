import React, {useState, useEffect, useRef} from "react";

import {detectFaces, drawResults} from "../../helpers/faceApi";

import Button from "../Button/Button";
import Gallery from "../Gallery/Gallery";
import SelectedImage from "../SelectedImage/SelectedImage";
import Webcam from "react-webcam";

import "./Camera.css";

const Camera = ({photoMode}) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [photo, setPhoto] = useState(undefined);
  const [showGallery, setShowGallery] = useState(false);
  const [photos, setPhotos] = useState([]);

  const getFaces = async () => {
    const faces = await detectFaces(camera.current.video);
    await drawResults(camera.current.video, cameraCanvas.current, faces, "box");
    // await drawResults(camera.current.video, cameraCanvas.current, faces, "landmarks");
  };

  useEffect(() => {
    if (!photoMode) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 80);
      return () => clearInterval(ticking);
    }
  }, [photoMode]);

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

      {photoMode ? (
        <>
          <div className="camera__button-container">
            <Button onClick={toggleGallery}>
              {showGallery ? "Hide " : "Show "} Gallery
            </Button>
            <Button onClick={capture}>Take Photo</Button>}
            {photos.length > 0 && <Button onClick={reset}>Reset</Button>}
          </div>

          {photo && (
            <div className="camera selected-image">
              <SelectedImage img={photo} />
            </div>
          )}

          {photos.length > 0 && showGallery && <Gallery photos={photos} />}
        </>
      ) : (
        <canvas className="webcam-overlay" ref={cameraCanvas} />
      )}
    </div>
  );
};

export default Camera;
