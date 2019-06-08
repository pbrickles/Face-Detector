import * as faceapi from "face-api.js";


export const loadModels = () => {
  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;

  return Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
  ])
}

export const detectFaces = async image => {
  if (!image) {
    return;
  }
  

  const displaySize = {
    width: image.width,
    height: image.height,
  };

  const faces = await faceapi
    .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();

  return faceapi.resizeResults(faces, displaySize);
};

export const drawResults = async (results, canvas, type) => {
  switch (type) {
    case "landmarks":
      faceapi.draw.drawFaceLandmarks(canvas, results, 0.5);
      break;
    case "expressions":
      faceapi.draw.drawFaceExpressions(canvas, results, 0.5);
      break;
    case "box":
      faceapi.draw.DrawBoxOptions(canvas, results, 0.5);
      break;
    default:
      break;
  }
};

export const createCanvas = (element) => {
  faceapi.createCanvasFromMedia(element)
}
