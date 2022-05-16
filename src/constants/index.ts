import { AxiosError } from "axios";
import successIcon from "../assets/success.svg";
import errorIcon from "../assets/error.svg";
import warningIcon from "../assets/warning.svg";
import infoIcon from "../assets/info.svg";

export const BASE_URL = "http://localhost:5000/";

export type ISuccessResponse<T = any> = {
  data: T;
  status: string;
  message: string;
};

export type IErrorResponse<T = any> = {
  error: T;
  data?: unknown;
  status: string;
  message: string;
};

export const STATUS = {
  SUCCESS: "success",
  FAILURE: "failure",
};

export const parseAxiosError = (error: AxiosError): IErrorResponse => {
  if (error.isAxiosError && error.response) {
    return {
      status: STATUS.FAILURE,
      message: error.response.data as string,
      error,
    };
  } else {
    return { status: STATUS.FAILURE, message: error.message, error };
  }
};

export const NotificationCSS = [
  {
    type: "Success",
    color: "rgb(185 232 185)",
    icon: successIcon,
  },
  {
    type: "Error",
    color: "rgb(239 134 131)",
    icon: errorIcon,
  },
  {
    type: "Info",
    color: "rgb(134 216 240)",
    icon: infoIcon,
  },
  {
    type: "Warning",
    color: "rgb(237 221 103)",
    icon: warningIcon,
  },
];
