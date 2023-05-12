import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import rawipv4 from "../ipv4.json";



export const login = async (dispatch, user ,navigation) => {
  dispatch(loginStart());
  try {
    const ipv4Address = rawipv4["ip"];
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data)
    dispatch(loginSuccess(res.data));
    
    navigation.navigate("UserScreens");
  } catch (err) {
    dispatch(loginFailure());
  }
};

