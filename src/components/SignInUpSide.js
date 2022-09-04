import React from "react";
import { Link } from "react-router-dom";

function SignInUpSide() {
    return (
        <div className="side">
            <Link to="/">
                <img
                    className="logoImg"
                    src="https://i.imgur.com/WgEx8PZ.png"
                    alt=""
                />
            </Link>
            <img
                className="d-m-n"
                src="https://i.imgur.com/ap76mi9.png" alt="workImg"
            />
        </div>
    )
}

export default SignInUpSide;
