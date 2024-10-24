"use client"

import dynamic from 'next/dynamic';

import Kpis from "./Kpis";
const Graph = dynamic(() => import('./Graph'), { ssr: false });
import List from "./List";
import ModalCSV from "./ModalCSV";

import { useQuery, gql } from '@apollo/client';
import client from '../apolloClient';

import { startTransition, useEffect, useState } from "react";

const sensores = gql`
    query getSensores{
        sensores{
            equipmentID
        }
    }
`

export default function Dashboard(){
    const [csvModal, setCsvModal] = useState(false);
    const [sensor, setSensor] = useState(null);
    const { loading, error, data } = useQuery(sensores, { client });

    const handleOpenModal = () => setCsvModal(true);
    const handleCloseModal = () => setCsvModal(false);

    useEffect(() => {
        if (data && data.sensores.length > 0 && !sensor) {
            setSensor(data.sensores[0].equipmentID); // Define o primeiro sensor quando os dados estiverem disponíveis
        }
    }, [data, sensor]);

    const handleSensor = (e) => {
        const { value } = e.target;
        startTransition(() => {
            console.log(value)
            setSensor(value);
        })
    }

    if (loading) { return <p>Buscando dados</p> }
    if (error) { return <p>Erro na busca dos dados: {error.message}</p> }

    return (
        <>
            <select className="selectSensor" onChange={handleSensor}>
                {data.sensores.map((sensor) => (
                    <option>{sensor.equipmentID}</option>
                ))}
            </select>
            <Kpis sensor={sensor} />
            <div className="rest">
                <Graph sensor={sensor}/>
                <List onOpenModal={handleOpenModal} />
            </div>

            {csvModal && <ModalCSV openModal={ModalCSV} closeModal={handleCloseModal}/>}
        </>
    )
}