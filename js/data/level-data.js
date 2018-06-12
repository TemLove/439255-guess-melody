import {getRandomIndex, randomizeArray} from "../util";
import audioData from "./audio-data";

const LEVEL_TYPES = [`artist`, `genre`];
const ANSWERS_COUNT = {
  artist: 3,
  genre: 4
};
const questionTargets = new Map([
  [LEVEL_TYPES[0], `src`],
  [LEVEL_TYPES[1], `genre`]
]);

const getLevel = (levelType) => {
  const track = Object.assign({}, audioData[getRandomIndex(audioData)]);
  const questionTarget = questionTargets.get(levelType);
  let answerTracks = [track];

  while (answerTracks.length < ANSWERS_COUNT[levelType]) {
    const newTrack = Object.assign({}, audioData[getRandomIndex(audioData)]);
    if (!answerTracks.some((it) => {
      return it.genre === newTrack.genre || it.artist === newTrack.artist || it.src === newTrack.src;
    })) {
      answerTracks.push(newTrack);
    }
  }

  answerTracks = randomizeArray(answerTracks).map((it) => {
    it.isAnswerRight = track[questionTarget] === it[questionTarget];
    return it;
  });

  return {
    type: levelType,
    target: track[questionTarget],
    answers: answerTracks
  };
};

export const getLevelData = (amount) => {
  const data = [];

  while (data.length < amount) {
    const levelType = Math.random() > 0.5 ? LEVEL_TYPES[0] : LEVEL_TYPES[1];
    data.push(getLevel(levelType));
  }

  return data;
};
