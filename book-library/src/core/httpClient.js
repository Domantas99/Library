import request from 'superagent';

class HTTPClient {
  baseUrl = 'http://localhost:5000/api/';

  async get(path) {
    const response = await request
      .get(this._getUrl(path));

    return response.body;
  }

  async post(path, body) {
    const response = await request
      .post(this._getUrl(path))
      .send(body);

    return response.body;
  }

  _getUrl(path) {
    return this.baseUrl + path;
  }
}

export default new HTTPClient();