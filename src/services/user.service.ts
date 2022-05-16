import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  IErrorResponse,
  ISuccessResponse,
  parseAxiosError,
} from "../constants";
import { BaseService } from "./base.service";

export class UserService extends BaseService {
  public async adduser(): Promise<ISuccessResponse | IErrorResponse> {
    try {
      const id = uuidv4();
      const { data } = await this.httpClient.post("/user/addUser", { id });
      sessionStorage.setItem("userId", data.data);
      return data;
    } catch (error: any) {
      const err = parseAxiosError(error as AxiosError);
      return err.error.response.data;
    }
  }
}
