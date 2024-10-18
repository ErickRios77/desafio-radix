"use client"

import History from "@/app/components/History";
import React, { useState } from "react";

import ModalCSV from "@/app/components/ModalCSV";


export default function HistoryPage(){

    const [csvModal, setCsvModal] = useState(false);

    const handleOpenModal = () => setCsvModal(true);
    const handleCloseModal = () => setCsvModal(false);

    return (
        <>
            <History onOpenModal={handleOpenModal} />

            {csvModal && <ModalCSV openModal={ModalCSV} closeModal={handleCloseModal}/>}
        </>
        
    )
}