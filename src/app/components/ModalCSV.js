import React, { useRef, useEffect } from "react";

import '@/app/style/modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function ModalCSV({openModal, closeModal, children}){
    const ref = useRef();

    useEffect(() => {
        if(openModal){
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);
    return (
        <dialog ref={ref} onCancel={closeModal} id="uploadCSV">
            {children}
            <FontAwesomeIcon icon={faX} id="close" onClick={closeModal}/>
            <input type="file" name="" id=""/>
        </dialog>
    );
}