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

export const drawResults = async (image, canvas, results, type) => {
  const displaySize = { width: image.width, height: image.height }
  faceapi.matchDimensions(canvas, displaySize)
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  const resizedDetections = faceapi.resizeResults(results, displaySize);
  switch (type) {
    case "landmarks":
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      break;
    case "expressions":
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      break;
    case "box":
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      break;
    default:
      break;
  }
};
