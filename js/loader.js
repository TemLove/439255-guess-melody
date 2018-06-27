import {adaptServerData} from './data/data-adapter.js';
import Application from './application.js';

const SERVER_URL = `https://es.dump.academy/guess-melody`;

const ERROR_MESSAGE = {
  400: `400. Неверный запрос`,
  401: `401. Пользователь не авторизован`,
  404: `404. Ничего не найдено`,
  500: `500. Ошибка сервера`
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(ERROR_MESSAGE[response.status] || `Неизвестный статус`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {

  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptServerData)
      .catch((response) => Application.showError(response.message));
  }

}
