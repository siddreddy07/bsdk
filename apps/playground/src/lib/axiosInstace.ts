import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface RetryRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise:Promise<void> | null = null;

const refreshSession = async()=>{
  await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  )
}

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const request = error.config as RetryRequest | undefined

      if(!request){
        return Promise.reject(error)
      }

    if (
      error.response?.status === 401 &&
      !request._retry &&
      !request.url?.includes("/api/auth/refresh")
    ) {
      request._retry = true

      try {

        if(!refreshPromise){
          refreshPromise = refreshSession().finally(()=>{
            refreshPromise = null;
          })
        }

        await refreshPromise;

        return api(request)
      } catch (refreshError) {
        console.log('Session Expired')
        if (window.location.pathname !== "/") {
          window.location.replace("/")
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)


export default api