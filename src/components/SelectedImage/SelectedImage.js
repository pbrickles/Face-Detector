import React, {useEffect, useRef, useState} from "react";
import * as faceapi from "face-api.js";

import "./SelectedImage.css";

const SelectedImage = ({img}) => {
  const selected = useRef();
  const canvas = useRef();

  const [processing, setProcessing] = useState(true);

  const detectFaces = async () => {
    const MODEL_URL = `${process.env.PUBLIC_URL}/models`;

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);

    if (!selected.current) {
      return;
    }

    const displaySize = {
      width: selected.current.width,
      height: selected.current.height,
    };

    const faces = await faceapi
      .detectAllFaces(selected.current)
      .withFaceLandmarks()
      .withFaceExpressions();

    const resizedResults = faceapi.resizeResults(faces, displaySize);

    faceapi.draw.drawFaceLandmarks(canvas.current, resizedResults);
    const minProbability = 0.05;
    await faceapi.draw.drawFaceExpressions(
      canvas.current,
      resizedResults,
      minProbability
    );

    setProcessing(false);
  };

  useEffect(() => {
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.current.width, canvas.current.height);
    detectFaces();
  }, [img]);

  return (
    <div className="selected-image">
      {processing && <span>Working out your expression...</span>}
      <div className="selected-image__wrapper">
        <img
          ref={selected}
          src={img}
          alt="selected"
          className="selected-image__image"
        />
        <canvas ref={canvas} className="selected-image__overlay" />
      </div>
      {!processing && <span>Select another image from the Gallery or take a new one</span>}
    </div>
  );
};

export default SelectedImage;
