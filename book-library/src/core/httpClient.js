/* eslint-disable no-underscore-dangle */
import request from 'superagent';
import { useDispatch } from 'react-redux';

class HTTPClient {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api/';
    this.dispatch = useDispatch();
    // this.baseUrl = process.env.REACT_APP_SERVER_URL;
  }

  async get(path) {
    const response = await request.get(this._getUrl(path))

    this.dispatch();
    
    return response.body;
  }

  async post(path, data) {
    const response = await request
      .post(this._getUrl(path))
      .set('Content-Type', 'application/json')
      .send(data);

    return response.body;
  }

  async put(path, data) {
    const response = await request
      .put(this._getUrl(path))
      .set('Content-Type', 'application/json')
      .send(data);

    return response.body;
  }

  async delete(path) {
    const response = await request.delete(this._getUrl(path));
    return response.body;
  }

  _getUrl(path) {
    return this.baseUrl + path;
  }
}

export default new HTTPClient();
