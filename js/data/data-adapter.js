import {LEVEL_TYPES} from './game-data.js';

const preprocessAnswers = (type, answers, genre) => answers.map((answer) => {
  let newAnswer;

  if (type === LEVEL_TYPES[0]) {
    newAnswer = {artist: answer.title,
      image: answer.image.url,
      isAnswerRight: answer.isCorrect};
  }

  if (type === LEVEL_TYPES[1]) {
    newAnswer = {genre: answer.genre,
      src: answer.src,
      isAnswerRight: answer.genre === genre};
  }

  return newAnswer;
});

export const adaptServerData = (data) => {

  return data.map((level) => {
    let levelData;

    if (level.type === LEVEL_TYPES[0]) {
      levelData = {
        type: level.type,
        target: level.src,
        answers: preprocessAnswers(level.type, level.answers)};
    }

    if (level.type === LEVEL_TYPES[1]) {
      levelData = {
        type: level.type,
        target: level.genre,
        answers: preprocessAnswers(level.type, level.answers, level.genre)};
    }

    return levelData;
  });

};
