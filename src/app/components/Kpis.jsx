import React from "react";

import { useQuery, gql } from "@apollo/client";
import client from "../apolloClient";

import '@/app/style/kpi.css';

const kpisMedia = gql`
    query getKpis($sensor:String!){
        kpisMedia(sensor:$sensor){
            media1d
            media2d
            media7d
            media30d
        }
    }
`;

export default function Kpis({ sensor }){

    const { loading, error, data } = useQuery(kpisMedia, { client, variables:{sensor}, pollInterval: 5000 });

    if (loading) { return <p>Buscando dados</p> }
    if (error) { return <p>Erro na busca dos dados: {error.message}</p> }

    return (
        <div className="kpis">
            <div className="kpi"><span className="legenda">Média: 1 dia</span>{data.kpisMedia.media1d===null?"sem dados":data.kpisMedia.media1d}</div>
            <div className="kpi"><span className="legenda">Média: 2 dias</span>{data.kpisMedia.media2d===null?"sem dados":data.kpisMedia.media2d}</div>
            <div className="kpi"><span className="legenda">Média: 7 dias</span>{data.kpisMedia.media7d===null?"sem dados":data.kpisMedia.media7d}</div>
            <div className="kpi"><span className="legenda">Média: 30 dias</span>{data.kpisMedia.media30d===null?"sem dados":data.kpisMedia.media30d}</div>
        </div>
    )
}