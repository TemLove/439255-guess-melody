import {adaptServerData} from './data/data-adapter.js';
import Application from './application.js';

const SERVER_URL = `https://es.dump.academy/guess-melody`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptServerData)
      .catch((response) => Application.showError(response.status));
  }

}
