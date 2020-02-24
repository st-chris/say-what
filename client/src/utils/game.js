export const deleteWordFromGame = (words, index) =>
  words.filter((word, idx) => idx !== index);
