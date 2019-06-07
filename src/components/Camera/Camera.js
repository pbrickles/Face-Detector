import React, {useState, useEffect, useRef} from "react";
import Webcam from "react-webcam";

import "./Camera.css";
import Button from "../Button/Button";
// import Gallery from "../Gallery/Gallery";
import SelectedImage from "../SelectedImage/SelectedImage";

const VideoFeed = () => {
  const videoEl = useRef(null)

  useEffect(() => {
    if (!videoEl) {
      return
    }
    navigator.mediaDevices.getUserMedia({video:true})
      .then(stream => {
        let video = videoEl.current
        video.srcObject = stream
        video.play()
      })
  }, [videoEl])

  return <video ref={videoEl} />
}


const Camera = props => {
  const camera = useRef();
  const [photo, setPhoto] = useState(undefined);
  const [showCamera, setShowCamera] = useState(true);
  const [photos, setPhotos] = useState([]);
  const toggleCamera = () => setShowCamera(!showCamera);

  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    const newPhotos = [...photos, imgSrc];
    setPhotos(newPhotos);
    setPhoto(imgSrc);
  };
  const reset = () => {
    setPhoto(undefined);
    setPhotos([]);
    setShowCamera(true);
  };
  return (
    <div className="camera">
      {showCamera && (
        <Webcam audio={false} ref={camera} height={400} width={400} />
      )}
      <div className="camera__button-container">
        <Button onClick={toggleCamera}>
          {showCamera ? "Hide " : "Show "}Camera
        </Button>
        {showCamera && <Button onClick={capture}>Take Photo</Button>}
        {photos.length > 0 && <Button onClick={reset}>Reset</Button>}
      </div>
      {photo && (
        <div className="camera selected-image">
          <SelectedImage img={photo} />
        </div>
      )}
      <VideoFeed />
      {/* {photos.length > 0 && <Gallery photos={photos} />} */}
    </div>
  );
};

export default Camera;
