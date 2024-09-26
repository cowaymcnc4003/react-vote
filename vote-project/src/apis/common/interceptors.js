import { getAuthFromCookie } from '../../util/cookies';

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // console.log(config);

      config.headers.Authorization = `Bearer ${getAuthFromCookie()}`
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // 에러 로그 추가
      console.log('Response error:', error.response);

      // 에러를 React Query에서 핸들링하도록 보냅니다.
      return Promise.reject(error);
      // throw error;


    },
  );
  return instance;
}
