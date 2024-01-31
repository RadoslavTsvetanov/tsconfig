const axios = require("axios");

interface Result {
  data: object;
  status: number;
  err: string | undefined;
}

interface Headers {
  authorization: string;
}

enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET',
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static build_response(data: object, status: number, err: string | undefined): Result {
    return {
      data: data,
      status: status,
      err: err
    };
  }

  private async axiosRequest(
    method: REQUEST_TYPE,
    endpoint: string,
    reqData: object,
    headers: Headers | object | undefined
  ): Promise<Result> {
    try {
      const config = {
        method: method,
        url: `${this.baseUrl}/${endpoint}`,
        data: method === REQUEST_TYPE.POST ? reqData : undefined,
        params: method === REQUEST_TYPE.GET ? reqData : undefined,
        headers: headers,
      };

      const response = await axios(config);
      return ApiClient.build_response(response.data, response.status, undefined);
    } catch (error: any) {
      console.error('Request error:', error);
      return ApiClient.build_response({}, error.response ? error.response.status : 500, error.message);
    }
  }

  async getRequest(endpoint: string, reqData: object, headers: Headers | object | undefined): Promise<Result> {
    return this.axiosRequest(REQUEST_TYPE.GET, endpoint, reqData, headers);
  }

  async postRequest(endpoint: string, reqData: object, headers: undefined | Headers | object): Promise<Result> {
    return this.axiosRequest(REQUEST_TYPE.POST, endpoint, reqData, headers);
  }

  // Static methods
  static async staticGetRequest(baseUrl: string, headers: Headers | object | undefined): Promise<Result> {
    try {
      const res = await axios.get(baseUrl, { headers });
      return ApiClient.build_response(res.data, res.status, undefined);
    } catch (error:any) {
      console.error('Static GET request error:', error);
      return ApiClient.build_response({}, error.response ? error.response.status : 500, error.message);
    }
  }

  static async staticPostRequest(baseUrl: string, reqData: object, headers: Headers | object | undefined): Promise<Result> {
    try {
      const res = await axios.post(baseUrl, {reqData}, { headers });
      return ApiClient.build_response(res.data, res.status, undefined);
    } catch (error:any) {
      console.error('Static POST request error:', error);
      return ApiClient.build_response({}, error.response ? error.response.status : 500, error.message);
    }
  }
}

// Example usage
ApiClient.staticGetRequest("http://localhost:3000/get/pipi", undefined).then((data) => {
  console.log(data);
}).catch(err => {
  console.log(err);
});

ApiClient.staticPostRequest("http://localhost:3000/update", { pipi: 4 }, undefined)
  .then((data) => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

console.log("-----------------------------------");

const apiClient = new ApiClient("http://localhost:3000");
apiClient.getRequest("get/pipi",{},undefined).then(pipi => {console.log(pipi)})
apiClient.postRequest("update",{pipi:4},undefined).then(pipi => {console.log(pipi)})


