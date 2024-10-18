"use client";

import React, { useState } from "react";

import Sidebar from "./Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header(){
    const [dropdown, setDropdown] = useState(false);

    const onShowDropdown = () => setDropdown(true);
    const onHideDropdown = () => setDropdown(false);

    let handleDropdown = dropdown?onHideDropdown:onShowDropdown;

    return (
        <header>
            <input type="radio" id="openSidebar" name="sidebarRadio" />
            <label htmlFor="openSidebar">
                <FontAwesomeIcon icon={faBars} className='icon' />
            </label>
            <FontAwesomeIcon icon={faUser} className='icon' onClick={handleDropdown}/>
            <div className={dropdown?"sair":"hidden"}><Link href={"/"}>Sair</Link></div>
            <Sidebar />
        </header>
    )
}