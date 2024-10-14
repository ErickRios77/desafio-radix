import React from "react";

import '@/app/style/list.css';

export default function List({onOpenModal}) {
    const handleVerMais = () => {alert("")}

    return (
        <div className="list-area">
            <div className="add">
                <span id="addButton" onClick={onOpenModal}>Preencher lacuna</span>
            </div>
            <div id="list">
                <table>
                    <tbody>
                        <tr>
                            <th>sensor</th>
                            <th>valor</th>
                            <th>data</th>
                        </tr>
                        <tr>
                            <td>EQ-12495</td>
                            <td>100.00</td>
                            <td>2023-02-15T01:30:00.000-05:00</td>
                        </tr><tr>
                            <td>EQ-12495</td>
                            <td>100.00</td>
                            <td>2023-02-15T01:30:00.000-05:00</td>
                        </tr><tr>
                            <td>EQ-12495</td>
                            <td>164.00</td>
                            <td>2023-02-15T01:30:00.000-05:00</td>
                        </tr><tr>
                            <td>EQ-12495</td>
                            <td>78.00</td>
                            <td>2023-02-15T01:30:00.000-05:00</td>
                        </tr><tr>
                            <td>EQ-12495</td>
                            <td>00.00</td>
                            <td>2023-02-15T01:30:00.000-05:00</td>
                        </tr><tr>
                            <td>EQ-12495</td>
                            <td>1.00</td>
                            <td>2023-02-15T01:30:00.000-05:00</td>
                        </tr><tr>
                            <td>EQ-12495</td>
                            <td>1000.00</td>
                            <td>2023-02-15T01:30:00.000-05:00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mais" onClick={handleVerMais}><span>VER MAIS</span></div>
        </div>
    )
}