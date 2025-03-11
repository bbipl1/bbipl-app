import { fileApiClient, jsonApiClient } from "../clients/apiClient";

const apiService = {
  post: async (subURL, payload) => {
    try {
      const res = await jsonApiClient.post(subURL, payload);
      return res?.data;
    } catch (err) {
      throw err;
    }
  },
  postWithFile: async (subURL, payload) => {
    try {
      const res = await fileApiClient.post(subURL, payload);
      return res?.data;
    } catch (err) {
      throw err;
    }
  },
  put: async (subURL, payload) => {
    try {
      const res = await jsonApiClient.put(subURL, payload);
      return res?.data;
    } catch (err) {
      throw err;
    }
  },
  get: async (subURL) => {
    try {
      const res = await jsonApiClient.get(subURL);
      return res?.data;
    } catch (err) {
      throw err;
    }
  },
  delete: async (subURL, payload) => {
    try {
      const res = await jsonApiClient.delete(subURL, payload);
      return res?.data;
    } catch (err) {
      throw err;
    }
  },
};

export default apiService;
