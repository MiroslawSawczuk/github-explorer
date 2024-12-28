import axios, { AxiosInstance } from 'axios';

let instance: AxiosInstance | undefined;

export const initHttpClient = () => {
  instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 60000,
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_ACCESS_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'github-explorer-app',
    },
  });

  instance.interceptors.response.use(response => response.data);

  if (!instance) {
    return;
  }

  //TODO add auth interceptor and handling accessToken
};

export const getHttpClient = () => {
  if (!instance) {
    throw new Error("HttpClient isn't initialized");
  }
  return instance;
};
