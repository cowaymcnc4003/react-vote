import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { errStore } from './store/voteStore.js';

export const queryErrorHandler = (error) => {
  const { setError } = errStore.getState();
  if (error.response?.status === 401) {
    console.error('Unauthorized access. Please log in again.');
    setError(error);
    // 로그아웃 또는 리다이렉트 처리
  } else {
    console.log(`Error: ${error.message}`);
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 쿼리에 대한 에러 핸들링
      onError: queryErrorHandler,
      retry: 0,
    },
    mutations: {
      onError: queryErrorHandler,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: queryErrorHandler, // 캐시에서의 에러 핸들링
  }),
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
