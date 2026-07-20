import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/profile",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      setUser(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {

    if (!image) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/profile/upload-image",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Profile Image Uploaded Successfully");

      setPreview(null);
      setImage(null);

      loadProfile();

    } catch (error) {

      console.log(error);
      alert("Image Upload Failed");

    }
  };

  if (!user) {
    return (
      <div className="text-center mt-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div
        className="card shadow-lg border-0 rounded-4 overflow-hidden"
        style={{ maxWidth: "700px", margin: "auto" }}
      >

        <div
          className="text-center text-white p-4"
          style={{
            background: "linear-gradient(135deg, #0d6efd, #6610f2)"
          }}
        >

          <img
            src={
              preview
                ? preview
                : user.profileImage
                ? "http://localhost:8080/uploads/profile/" + user.profileImage
                : `https://ui-avatars.com/api/?name=${user.name}&background=ffffff&color=0d6efd&size=150`
            }
            alt="Profile"
            className="rounded-circle border border-4 border-white shadow"
            width="120"
            height="120"
          />

          <div className="mt-3">

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />

            <button
              className="btn btn-light mt-2"
              onClick={uploadImage}
            >
              📷 Upload Image
            </button>

          </div>

          <h2 className="mt-3 mb-1">{user.name}</h2>

          <span
            className={`badge ${
              user.role === "ADMIN"
                ? "bg-danger"
                : "bg-success"
            } fs-6 px-3 py-2`}
          >
            {user.role}
          </span>

        </div>

        <div className="card-body p-4">

          <h4 className="mb-4 text-center">
            👤 Profile Information
          </h4>

          <div className="row mb-3">
            <div className="col-4 fw-bold">Name</div>
            <div className="col-8">{user.name}</div>
          </div>

          <hr />

          <div className="row mb-3">
            <div className="col-4 fw-bold">Email</div>
            <div className="col-8">
              {user.email || "Not Available"}
            </div>
          </div>

          <hr />

          <div className="row mb-4">
            <div className="col-4 fw-bold">Role</div>
            <div className="col-8">
              <span
                className={`badge ${
                  user.role === "ADMIN"
                    ? "bg-danger"
                    : "bg-success"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">

            <button
              className="btn btn-primary"
              onClick={() => navigate("/edit-profile")}
            >
              ✏ Edit Profile
            </button>

            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/change-password")}
            >
              🔒 Change Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;