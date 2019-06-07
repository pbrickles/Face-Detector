import React, {useEffect, useRef, useState} from "react";
import {detectFaces, drawResults} from "../../helpers/detectFaces";

import "./SelectedImage.css";
import Results from "../Results/Results";

const SelectedImage = ({img}) => {
  const selected = useRef();
  const canvas = useRef();

  const [processing, setProcessing] = useState(true);
  const [results, setResults] = useState([]);

  const getFaces = async () => {
    setProcessing(true);
    const faces = await detectFaces(selected.current);
    setResults(faces);
    setProcessing(false);
  };

  useEffect(() => {
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.current.width, canvas.current.height);
    getFaces();
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
      {!processing && results && (
        <div className="results__container">
          <Results results={results} />
        </div>
      )}
    </div>
  );
};

export default SelectedImage;
