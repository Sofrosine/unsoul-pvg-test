import axios from "axios";
import constants from "config/constants";

const excludeRedirectUnauthorized: string[] = [];

const axiosRequestConfiguration = {
  baseURL: constants.apiUrl,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
};

const APICall = axios.create(axiosRequestConfiguration);

APICall.interceptors.request.use((config) => {
  const curConfig: any = { ...config };

  // ALWAYS READ UPDATED TOKEN
  try {
    curConfig.headers["Authorization"] = `Client-ID ${constants.clientKey}`;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return curConfig;
});

APICall.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.data?.message) {
    }
    if (
      error?.response?.status === 401 &&
      !excludeRedirectUnauthorized.includes(error?.response?.config?.url)
    ) {
    }
    return Promise.reject(error);
  }
);

export const { CancelToken } = axios;
export default APICall;
