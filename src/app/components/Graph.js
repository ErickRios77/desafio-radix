import React from "react";

import '@/app/style/graph.css';

export default function Graph(){
    return (
        <div className="graph-area">
            <div id="graph">
                <div className="filtro">
                    <input type="radio" name="btn-filtro" id="days1" className="btn" defaultChecked/>
                    <label htmlFor="days1">1d</label>
                    <input type="radio" name="btn-filtro" id="days2" className="btn"/>
                    <label htmlFor="days2">2d</label>
                    <input type="radio" name="btn-filtro" id="days7" className="btn"/>
                    <label htmlFor="days7">7d</label>
                    <input type="radio" name="btn-filtro" id="days30" className="btn"/>
                    <label htmlFor="days30">30d</label>
                </div>
            </div>
        </div>
    )
}