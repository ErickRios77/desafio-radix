"use client"

import React, { startTransition, useState, Suspense, useEffect } from "react";

import { gql, useSuspenseQuery } from "@apollo/client";
import client from "../apolloClient";

import '@/app/style/graph.css';

const leiturasFiltradas = gql`
    query getFiltered($filtro:Int!){
        leiturasFiltroData(intervalo:$filtro){
            sensor{
                equipmentID
            }
            dataLeitura
            valor
        }
    }
`;

export default function Graph(){

    const [filtro, setFiltro] = useState(1);

    const handleValorFiltro = (e) => {
        const {value} = e.target;
        startTransition(() =>{
            setFiltro(parseInt(value));
        })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const { data } = useSuspenseQuery(leiturasFiltradas, { variables:{filtro}, client });

    useEffect(() => {
        const intervalId = setInterval(() => {
            client.refetchQueries({
                include: [leiturasFiltradas],
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [filtro]);

    return (
        <div className="graph-area">
            <div id="graph">
                <div className="filtro">
                    <input type="radio" name="btn-filtro" id="days1" value={1} className="btn" onChange={handleValorFiltro} defaultChecked/>
                    <label htmlFor="days1">1d</label>
                    <input type="radio" name="btn-filtro" id="days2" value={2} className="btn" onChange={handleValorFiltro}/>
                    <label htmlFor="days2">2d</label>
                    <input type="radio" name="btn-filtro" id="days7" value={7} className="btn" onChange={handleValorFiltro}/>
                    <label htmlFor="days7">7d</label>
                    <input type="radio" name="btn-filtro" id="days30" value={30} className="btn" onChange={handleValorFiltro}/>
                    <label htmlFor="days30">30d</label>
                </div>
                <Suspense fallback={<div>Buscando dados...</div>}>
                    {/* Will change to graph component later */}
                    {/* List is being used only as visual representation for data filtering during tests */}
                    <div id="list">
                        <table>
                            <thead>
                                <tr>
                                    <th>sensor</th>
                                    <th>valor</th>
                                    <th>data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.leiturasFiltroData.map((leitura, index) => (
                                    <tr key={index}>
                                        <td>{leitura.sensor.equipmentID}</td>
                                        <td>{leitura.valor}</td>
                                        <td>{formatDate(leitura.dataLeitura)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Suspense>
            </div>
        </div>
    )
}