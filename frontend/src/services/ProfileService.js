import axios from "axios";

const BASE_URL = "https://e-commerce-backend-929k.onrender.com/api/profile";

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
const profileService = new ProfileService();
export default  profileService;