import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";





export const login = async (dispatch, user ,navigation) => {
  dispatch(loginStart());
  try {
    const ipv4Address = "192.168.1.104";
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data)
    dispatch(loginSuccess(res.data));
    
    navigation.navigate("UserScreens");
  } catch (err) {
    dispatch(loginFailure());
  }
};

