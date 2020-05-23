/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import request from 'superagent';
import store from '../store/store';
import { displayToast } from '../store/general/actions';

class HTTPClient {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api/';
  }

  async get(path) {
    try {
      const response = await request.get(this._getUrl(path));
      return response.body;
    } catch (e) {
      debugger;
      console.log(e.response.body.message, 'cia tas e');
      this.handleException(e);
    }
  }

  async post(path, data) {
    try {
      const response = await request
        .post(this._getUrl(path))
        .set('Content-Type', 'application/json')
        .send(data);

      return response.body;
    } catch (e) {
      debugger;
      this.handleException(e.message);
    }
  }

  async put(path, data) {
    try {
      const response = await request
        .put(this._getUrl(path))
        .set('Content-Type', 'application/json')
        .send(data);

      return response.body;
    } catch (e) {
      this.handleException(e);
    }
  }

  async delete(path) {
    try {
      const response = await request.delete(this._getUrl(path));
      return response.body;
    } catch (e) {
      this.handleException(e);
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
    if (response.statusCode === 500) {
      toast.message = 'Unknown Server error please try again';
    }

    store.dispatch(displayToast(toast));
  }
}

export default new HTTPClient();
