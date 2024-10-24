"use client"

import React, { startTransition, useState, Suspense, useEffect } from "react";

import { gql, useSuspenseQuery } from "@apollo/client";
import client from "../apolloClient";

import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import '@/app/style/graph.css';

const leiturasFiltradas = gql`
    query getFiltered($filtro:Int!, $sensor: String!){
        leiturasFiltroData(intervalo:$filtro, sensor:$sensor){
            sensor{
                equipmentID
            }
            dataLeitura
            valor
        }
    }
`;

export default function Graph({ sensor }){

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

    const dadosGrafico = {
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    };

    const { data } = useSuspenseQuery(leiturasFiltradas, { variables: { filtro, sensor }, client });
    data.leiturasFiltroData.forEach(leitura => {
        dadosGrafico.labels.push(formatDate(leitura.dataLeitura));
        dadosGrafico.datasets[0].label = leitura.sensor.equipmentID;
        dadosGrafico.datasets[0].data.push(leitura.valor)
    });

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
                <span className="legenda">Média de leituras</span>
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
                    <Line data={dadosGrafico}/>
                </Suspense>
            </div>
        </div>
    )
}