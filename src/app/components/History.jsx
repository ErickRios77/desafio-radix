import React from "react";

import { useQuery, gql } from "@apollo/client";
import client from "../apolloClient";

import '@/app/style/list.css';
import '@/app/style/history.css';

const leituras = gql`
    query getReadings($offset: Int!, $limit: Int!){
        leituras(offset: $offset, limit: $limit){
            equipmentID
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

    const { loading, error, data, fetchMore } = useQuery(leituras, { variables:{offset:0,limit:10}, client});

    if (loading) { return <p>Buscando dados</p> }
    if (error) { return <p>Erro na busca dos dados: {error.message}</p> }

    const nextPage = () => {
        fetchMore({ 
            variables: { offset: data.leituras.length },
        });
    }

    // Why is it that every internet tutorial only teaches how to create infinite scroll pagination?
    // Will eventually apply PROPER pagination here

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
                                <td>{leitura.equipmentID}</td>
                                <td>{leitura.valor}</td>
                                <td>{formatDate(leitura.dataLeitura)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={nextPage}>Próxima página</button>
            </div>
        </div>
    )
}