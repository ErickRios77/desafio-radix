"use client"

import Kpis from "./Kpis";
import Graph from "./Graph";
import List from "./List";
import ModalCSV from "./ModalCSV";

import { useState } from "react";

export default function Dashboard(){
    const [csvModal, setCsvModal] = useState(false);

    const handleOpenModal = () => setCsvModal(true);
    const handleCloseModal = () => setCsvModal(false);

    return (
        <>
            <Kpis/>
            <div className="rest">
                <Graph />
                <List onOpenModal={handleOpenModal} />
            </div>

            {csvModal && <ModalCSV openModal={ModalCSV} closeModal={handleCloseModal}/>}
        </>
    )
}