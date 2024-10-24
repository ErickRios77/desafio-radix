"use client";

import React, { useState } from "react";

import '@/app/style/login.css';
import '@/app/style/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login(){
    const [viewPassword, setViewPassword] = useState(false);

    const onShowPassword = () => setViewPassword(true);
    const onHidePassword = () => setViewPassword(false);

    let handleViewPassword = viewPassword?onHidePassword:onShowPassword;

    return (
        <div className="loginArea">
            <div className="loginFormArea">
                <form action="/dashboard">
                    <div>
                        <label htmlFor="userEmail">Nome de usuário: </label>
                        <input type="text" placeholder="Erick" id="userEmail" className="loginInput" required/>
                    </div>
                    <div>
                        <label htmlFor="userPassword">Senha: </label>
                        <div>
                            <input type={viewPassword ? "text" : "password"} placeholder="*******" id="userPassword" className="loginInput" required/>
                            <FontAwesomeIcon icon={viewPassword ? faEyeSlash : faEye} id="showHidePassword" onClick={handleViewPassword}/>
                        </div>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}