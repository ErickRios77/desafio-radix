import React from 'react';

import '@/app/style/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar(){
    return (
        <div className='sidebar'>
            <input type='radio' id='closeSidebarRadio' name='sidebarRadio'/>
            <label htmlFor='closeSidebarRadio' id='closeSidebar'><FontAwesomeIcon icon={faX} className='icon'/></label>
            <div>
                <a href="#" className="sidebarItem">aaaaaaaaaaaaaa</a>
                <a href="#" className="sidebarItem">aaaaaaaaaaaaaa</a>
            </div>
        </div>
    )
}