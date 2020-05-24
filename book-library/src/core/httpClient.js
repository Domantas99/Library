/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import superagent from 'superagent';
import store from '../store/store';
import { displayToast } from '../store/general/actions';

const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class HTTPClient {
  constructor() {
    this.baseUrl = process.env.REACT_APP_SERVER_URL;
  }

  async get(path) {
    return this._makeRequest(methods.GET, path);
  }

  async post(path, data) {
    return this._makeRequest(methods.POST, path, data);
  }

  async put(path, data) {
    return this._makeRequest(methods.PUT, path, data);
  }

  async delete(path) {
    return this._makeRequest(methods.DELETE, path);
  }

  async _makeRequest(method, path, data = null) {
    const url = this._getUrl(path);

    const request = superagent(method, url);

    if (method === methods.POST || method === methods.PUT) {
      request.send(data);
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await request.withCredentials();

      return response.body;
    } catch (e) {
      this.handleException(e);
      throw e;
    }
  }

  _getUrl(path) {
    return this.baseUrl + path;
  }

  handleException(e) {
    const { response } = e;
    const toast = {
      type: 'error',
      message: response.body.message,
      duration: 5000,
      position: 'TOP_RIGHT',
    };
    if (response.status === 500) {
      toast.message = 'Unknown Server error please try again';
    }

    store.dispatch(displayToast(toast));
  }
}

export default new HTTPClient();
