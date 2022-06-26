
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import { loginStart, loginSuccess, loginFailure } from "./index";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const { data } = await axiosInstance.post("/login", user);
    console.log(data.data);
    const decodeData = jwt_decode(data.data);
    console.log(decodeData);
    if (!decodeData.isAdmin) {
      toast.error("You don't have access");
      dispatch(loginFailure());
      return;
    }
    toast.success(data.message);
    dispatch(loginSuccess({ ...decodeData, token: data.data }));
    window.location = "/";
  } catch (error) {
    dispatch(loginFailure());
    if (error.response.status >= 400 && error.response.status < 500) {
      toast.error(error.response.data.message);
    }
  }
};
