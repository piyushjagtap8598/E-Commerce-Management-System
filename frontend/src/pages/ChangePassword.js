import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileService from "../services/ProfileService";

function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const changePassword = (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password do not match.");
            return;
        }

        const data = {
            currentPassword,
            newPassword
        };

        ProfileService.changePassword(data)
            .then(() => {

                alert("Password Changed Successfully");

                navigate("/profile");

            })
            .catch((error) => {

                console.log(error);

                alert("Current Password Is Incorrect");

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
                        background:
                            "linear-gradient(135deg,#0d6efd,#6610f2)"
                    }}
                >

                    <h2>🔒 Change Password</h2>

                </div>

                <div className="card-body p-4">

                    <form onSubmit={changePassword}>

                        <div className="mb-3">

                            <label className="form-label">
                                Current Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                New Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="d-flex justify-content-center gap-3">

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Change Password
                            </button>

                            <button
                                className="btn btn-secondary"
                                type="button"
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

export default ChangePassword;