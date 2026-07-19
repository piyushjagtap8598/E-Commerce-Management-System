import React from "react";

function Profile() {

    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    return (

        <div className="container mt-5">

            <div className="card">

                <div className="card-body">

                    <h2>User Profile</h2>

                    <hr/>

                    <h4>Name : {name}</h4>

                    <h4>Role : {role}</h4>

                </div>

            </div>

        </div>

    );

}

export default Profile;