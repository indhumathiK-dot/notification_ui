import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../constants/index";

export class BaseService {
  httpClient: AxiosInstance = axios.create({ baseURL: BASE_URL });
}
