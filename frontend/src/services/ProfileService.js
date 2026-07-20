import axios from "axios";

const BASE_URL = "http://localhost:8080/api/profile";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: "Bearer " + getToken()
    }
});

class ProfileService {

    // Get Logged In User Profile
    getProfile() {
        return axios.get(BASE_URL, authHeader());
    }

    // Update Profile
    updateProfile(profileData) {
        return axios.put(
            BASE_URL + "/update",
            profileData,
            authHeader()
        );
    }
    //Change Password
    changePassword(passwordData) {
       return axios.put(
         BASE_URL + "/change-password",
         passwordData,
         authHeader()
       );
   }

}

export default new ProfileService();