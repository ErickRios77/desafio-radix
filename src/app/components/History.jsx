"use client"
import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import client from "../apolloClient";

import '@/app/style/list.css';
import '@/app/style/history.css';

const leituras = gql`
    query getReadings($offset: Int!, $limit: Int!){
        leituras(offset: $offset, limit: $limit){
            sensor{
                equipmentID
            }
            dataLeitura
            valor
        }
    }
`;

export default function History({onOpenModal}){
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const [offset, setOffset] = useState(0);

    const { loading, error, data, fetchMore } = useQuery(leituras, { variables:{offset:offset,limit:10}, client, pollInterval: 5000 });

    if (loading) { return (<div style={{position:'fixed',top:'50%',left:'45%'}}>Buscando dados</div>) }
    if (error) { return <p>Erro na busca dos dados: {error.message}</p> }

    const nextPage = () => {
        fetchMore({ 
            variables: { offset: offset+10 },
            updateQuery:(prev, {fetchMoreResult})=>{
                if(!fetchMoreResult||fetchMoreResult.leituras.length===0){
                    return prev;
                }
                setOffset(offset + 10);
            }
        });
    }

    const previousPage = () => {
        if(offset===0)return;
        fetchMore({
            variables: { offset: Math.max(0, offset - 10) },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || fetchMoreResult.leituras.length === 0) {
                    return prev;
                }
                setOffset(offset - 10);
            }
        });
    }

    // A lot better now

    return (
        <div className="list-area history">
            <div className="add">
                <span id="addButton" onClick={onOpenModal}>Preencher lacuna</span>
            </div>
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
                        {data.leituras.map((leitura, index) => (
                            <tr key={index}>
                                <td>{leitura.sensor.equipmentID}</td>
                                <td>{leitura.valor}</td>
                                <td>{formatDate(leitura.dataLeitura)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={previousPage} disabled={offset===0}>Página anterior</button>
                <button onClick={nextPage} disabled={data.leituras.length<10}>Página seguinte</button>
            </div>
        </div>
    )
}