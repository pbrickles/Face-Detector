import * as faceapi from "face-api.js";

export const detectFaces = async (image) => {
  if (!image) {
    return;
  }
  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;

  await faceapi.loadMtcnnModel(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  await faceapi.loadFaceDetectionModel(MODEL_URL);
  await faceapi.loadFaceExpressionModel(MODEL_URL);

  const displaySize = {
    width: image.width,
    height: image.height,
  };

  const faces = await faceapi
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceExpressions();

  return faceapi.resizeResults(faces, displaySize);

  
 
}

const drawResults = async (results, canvas, type) => {
  if(type === "faces") {
    await faceapi.draw.drawFaceLandmarks(canvas, results);
  }
  if(type === "expressions") {
    await faceapi.draw.drawFaceExpressions(canvas, results, 0.05);
  }
  
}