
import {ApiClient} from "../src/index2"
import supertest  from 'supertest'
const serverUrl = 'http://localhost:3000'; // Adjust the URL based on your server configuration
//! if tests fail first check if backend is running
describe('ApiClient', () => {
  it('should make a successful static GET request', async () => {
    const app = supertest(serverUrl);

    // Assuming your server has an endpoint like /get/pipi that returns { message: 'GOT IT' }
    const response = await app.get('/get/pipi');

    const result = await ApiClient.staticGetRequest(`${serverUrl}/get/pipi`, undefined);

    expect(result.data).toEqual("GOT IT");
    expect(result.status).toBe(200);
    expect(result.err).toBeUndefined();
  });

  it('should make a successful static POST request', async () => {
    const app = supertest(serverUrl);

    // Assuming your server has an endpoint like /update that returns { message: 'UPDATED' }
    const response = await app.post('/update').send({ pipi: 4 });

    const result = await ApiClient.staticPostRequest(`${serverUrl}/update`, { pipi: 4 }, undefined);

    expect(result.data).toEqual("UPDATED");
    expect(result.status).toBe(200);
    expect(result.err).toBeUndefined();
  });

  it('should make a successful instance GET request', async () => {
    const app = supertest(serverUrl);

    // Assuming your server has an endpoint like /get/pipi that returns { message: 'GOT IT' }
    const response = await app.get('/get/pipi');

    const apiClient = new ApiClient(serverUrl);
    const result = await apiClient.getRequest('get/pipi', {}, undefined);

    expect(result.data).toEqual(response.body);
    expect(result.status).toBe(response.status);
    expect(result.err).toBeUndefined();
  });

  it('should make a successful instance POST request', async () => {
    const app = supertest(serverUrl);

    // Assuming your server has an endpoint like /update that returns { message: 'UPDATED' }
    const response = await app.post('/update').send({ pipi: 4 });

    const apiClient = new ApiClient(serverUrl);
    const result = await apiClient.postRequest('update', { pipi: 4 }, undefined);

    expect(result.data).toEqual(response.body);
    expect(result.status).toBe(response.status);
    expect(result.err).toBeUndefined();
  });
});