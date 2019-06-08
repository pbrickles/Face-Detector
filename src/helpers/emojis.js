const emojiMap = {
  angry: "angry",
  disgusted: "grin-tongue-squint",
  fearful: "grimace",
  happy: "grin",
  neutral: "meh",
  sad: "sad-tear",
  surprised: "surprise",
};

export const mapExpressionToEmoji = (expression) => emojiMap[expression];
