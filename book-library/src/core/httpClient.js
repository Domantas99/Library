/* eslint-disable no-underscore-dangle */
import request from "superagent";

class HTTPClient {
  constructor() {
    this.baseUrl = "http://localhost:5000/api/";
  }

  async get(path) {
    const response = await request.get(this._getUrl(path));

    return response.body;
  }

  async post(path, data) {
    const response = await request
      .post(this._getUrl(path))
      .set("Content-Type", "application/json")
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
