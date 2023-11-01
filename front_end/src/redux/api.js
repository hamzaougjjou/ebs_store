import axios from "axios";
import { apiUrl } from "../config";
import { addAuth } from "./reducers/authSlice";

let refreshLogin = async (dispatch) => {

    let isLoggedIn = sessionStorage.getItem("isLogedIn")

    if (isLoggedIn===null || isLoggedIn === false || isLoggedIn === "false") {
        removeSessionStorage();
        return false;
    }
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("password");

    await axios.post(apiUrl + "/api/login", { "email": email, "password": password })
        .then(res => {
            if (res.data.success) {
                dispatch(addAuth({
                    user: res.data.user,
                    token: res.data.authorization.token,
                    logedIn: true
                }));
                sessionStorage.setItem('isLogedIn', true);
                return false;
            }
            removeSessionStorage();
        }
        ).catch((err) => {
            removeSessionStorage();
        }
        )

}

let removeSessionStorage = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("isLogedIn");
}

export { refreshLogin };