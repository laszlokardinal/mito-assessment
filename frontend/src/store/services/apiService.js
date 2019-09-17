import axios from "axios";

import { API__GET } from "~/actions.js";

const apiService = {
  actions: {
    async [API__GET](_, { path, params }) {
      try {
        const response = await axios.get(process.env.API_BASE_URL + path, {
          params
        });

        return { data: response.data };
      } catch (e) {
        throw { errors: { global: "Network error" } };
      }
    }
  }
};

export default apiService;
