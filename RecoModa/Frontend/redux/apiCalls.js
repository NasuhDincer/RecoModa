import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import rawipv4 from "../ipv4.json";



export const login = async (dispatch, user ,navigation) => {
  dispatch(loginStart());
  try {
<<<<<<< HEAD
    const ipv4Address = rawipv4["ip"];
=======
    const ipv4Address = "192.168.0.12";
    // nasuh ip 192.168.0.12
>>>>>>> 0bfa830ac5a71ea58aa8aeabeb36f717b731a40b
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data)
    dispatch(loginSuccess(res.data));
    
    navigation.navigate("UserScreens");
  } catch (err) {
    dispatch(loginFailure());
  }
};

