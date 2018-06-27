import {LEVEL_TYPES} from './game-data.js';

const preprocessAnswers = (type, answers, genre) => answers.map((answer) => {
  let result;

  switch (type) {
    case LEVEL_TYPES[0]:
      result = {
        artist: answer.title,
        image: answer.image.url,
        isAnswerRight: answer.isCorrect
      };
      break;
    case LEVEL_TYPES[1]:
      result = {
        genre: answer.genre,
        src: answer.src,
        isAnswerRight: answer.genre === genre
      };
      break;
  }

  return result;
});

export const adaptServerData = (data) => {

  return data.map((level) => {
    let levelData;

    switch (level.type) {
      case LEVEL_TYPES[0]:
        levelData = {
          type: level.type,
          target: level.src,
          answers: preprocessAnswers(level.type, level.answers)
        };
        break;
      case LEVEL_TYPES[1]:
        levelData = {
          type: level.type,
          target: level.genre,
          answers: preprocessAnswers(level.type, level.answers, level.genre)
        };
        break;
    }

    return levelData;
  });

};
