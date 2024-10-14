"use client"

import Sidebar from "./Sidebar";
import Kpis from "./Kpis";
import Graph from "./Graph";
import List from "./List";
import ModalCSV from "./ModalCSV";

import '@/app/style/style.css';
import '@/app/style/header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function Dashboard(){
    const [csvModal, setCsvModal] = useState(false);

    const handleOpenModal = () => setCsvModal(true);
    const handleCloseModal = () => setCsvModal(false);

    return (
        <>
            <header>
                <input type="radio" id="openSidebar" name="sidebarRadio" />
                <label htmlFor="openSidebar">
                    <FontAwesomeIcon icon={faBars} className='icon'/>
                </label>
                <FontAwesomeIcon icon={faUser} className='icon'/>
                <Sidebar />
            </header>
            <Kpis/>
            <div className="rest">
                <Graph />
                <List onOpenModal={handleOpenModal} />
            </div>

            {csvModal && <ModalCSV openModal={ModalCSV} closeModal={handleCloseModal}/>}
        </>
    )
}