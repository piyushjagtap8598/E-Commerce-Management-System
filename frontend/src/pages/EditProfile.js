import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileService from "../services/ProfileService";

function EditProfile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        ProfileService.getProfile()
            .then((response) => {

                setName(response.data.name);
                setEmail(response.data.email);

            })
            .catch((error) => {
                console.log(error);
                alert("Unable to load profile.");
            });

    }, []);

    const updateProfile = (e) => {

        e.preventDefault();

        const profile = {
            name,
            email
        };

        ProfileService.updateProfile(profile)
            .then((response) => {

                localStorage.setItem("name", response.data.name);
                localStorage.setItem("email", response.data.email);

                alert("Profile Updated Successfully");

                navigate("/profile");

            })
            .catch((error) => {

                console.log(error);
                alert("Failed To Update Profile");

            });

    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow-lg border-0 rounded-4"
                style={{ maxWidth: "600px", margin: "auto" }}
            >

                <div
                    className="card-header text-center text-white"
                    style={{
                        background: "linear-gradient(135deg,#0d6efd,#6610f2)"
                    }}
                >
                    <h2 className="mt-2">✏ Edit Profile</h2>
                </div>

                <div className="card-body p-4">

                    <form onSubmit={updateProfile}>

                        <div className="mb-3">

                            <label className="form-label fw-bold">
                                Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label fw-bold">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>

                        <div className="d-flex justify-content-center gap-3">

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary px-4"
                                onClick={() => navigate("/profile")}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditProfile;