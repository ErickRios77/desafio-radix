import React, { useRef, useEffect } from "react";

import '@/app/style/modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { useMutation, gql } from "@apollo/client";
import client from "../apolloClient";

const uploadCSV = gql`
    mutation uploadCSV($leituras: [dadosInsert]!){
        insertLeituras(leituras:$leituras){
            id
        }
    }
`

import Papa from "papaparse";

export default function ModalCSV({openModal, closeModal, children}){
    const ref = useRef();
    const [insertLeituras] = useMutation(uploadCSV, {client})

    useEffect(() => {
        if(openModal){
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [openModal]);

    const changeHandler = async (event) => {
        if (event.target.files[0]) {
            const values = [];

            Papa.parse(event.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    const headerCSV = Object.keys(results.data[0]);
                    if (headerCSV.includes('equipmentId') && headerCSV.includes('timestamp') && headerCSV.includes('value')) {
                        console.log("Headers válidos");

                        results.data.forEach(row => {
                            if (row.equipmentId && row.timestamp && row.value) {
                                values.push({
                                    equipmentID: row.equipmentId,       // Updated field name
                                    dataLeitura: row.timestamp,         // Updated field name
                                    valor: parseFloat(row.value)        // Updated field name
                                });
                            }
                        });

                        // Call the mutation
                        if (values.length > 0) {
                            try {
                                const response = await insertLeituras({ variables: { leituras: values } });
                                console.log(response);
                                alert("Leituras inseridas!");
                                closeModal();
                            } catch (error) {
                                console.error("Erro inserindo leituras:", error);
                                alert("Falhou em inserir os dados.");
                            }
                        } else {
                            alert("CSV vazio.");
                        }
                    } else {
                        alert("Headers inválidos. Os headers necessários são 'equipmentId', 'timestamp', and 'value'.");
                    }
                },
                error: (error) => {
                    console.error(error);
                }
            });
        }
    };

    return (
        <dialog ref={ref} onCancel={closeModal} id="uploadCSV">
            {children}
            <FontAwesomeIcon icon={faX} id="close" onClick={closeModal}/>
            <input type="file" accept=".csv" name="csvFile" id="csvFile" onChange={changeHandler}/>
        </dialog>
    );
}