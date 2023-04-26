import axios from 'axios'

class AuthenticationService {

    registerSuccessfulLogin(username) {
        sessionStorage.setItem("current_user", username)

    }

    getCurrentUser() {
        return sessionStorage.getItem("current_user");
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem("current_user")
        if (user === null) return false
        return true
    }

    logout() {
        sessionStorage.removeItem("current_user");
        console.log("logout")
    }


    authenticate(userInfo) {
        return axios.post(`http://54.144.71.253/user`, userInfo)
    }

    registerAccount(userInfo) {
        return axios.post(`http://54.144.71.253/signup`, userInfo)
    }
}

export default new AuthenticationService()
