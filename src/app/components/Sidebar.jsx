"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import '@/app/style/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar(){
    const pathname = usePathname();
    return (
        <div className='sidebar'>
            <input type='radio' id='closeSidebarRadio' name='sidebarRadio'/>
            <label htmlFor='closeSidebarRadio' id='closeSidebar'><FontAwesomeIcon icon={faX} className='icon'/></label>
            <div>
                <Link className={clsx('sidebarItem', { 'active': pathname === '/dashboard' },)} href={'/dashboard'}>Dashboard</Link>
                <Link className={clsx('sidebarItem', { 'active': pathname === '/dashboard/readings' },)} href={'/dashboard/readings'}>Leituras</Link>
            </div>
        </div>
    )
}