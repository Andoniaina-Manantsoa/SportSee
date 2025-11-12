import React from 'react';
import styles from '../styles/sidebar.module.css';
import { FaHeartbeat, FaSwimmer} from 'react-icons/fa';
import { LuDumbbell } from "react-icons/lu";
import { BiCycling } from "react-icons/bi";

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.icon}><FaHeartbeat /></div>
            <div className={styles.icon}><FaSwimmer /></div>
            <div className={styles.icon}><BiCycling /></div>
            <div className={styles.icon}><LuDumbbell /></div>

            <span className={styles.rotate}>Copiryght, SportSee 2020</span>
        </aside>
    );
}
