import React from "react";

import { useQuery, gql } from "@apollo/client";
import client from "../apolloClient";

import '@/app/style/list.css';
import Link from "next/link";

const leiturasRecentes = gql`
    query getRecent{
        leiturasRecentes{
            equipmentID
            dataLeitura
            valor
        }
    }
`;

export default function List({onOpenModal}) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const {loading, error, data} = useQuery(leiturasRecentes, {client, pollInterval:5000});

    if(loading){return <p>Buscando dados</p>}
    if(error){return <p>Erro na busca dos dados: {error.message}</p>}

    return (
        <div className="list-area">
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
                        {data.leiturasRecentes.map((leitura, index) => (
                            <tr key={index}>
                                <td>{leitura.equipmentID}</td>
                                <td>{leitura.valor}</td>
                                <td>{formatDate(leitura.dataLeitura)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link href={'/dashboard/readings'} className="mais">VER MAIS</Link>
        </div>
    )
}