import React from 'react';
import styles from '../styles/header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="/logo.png" alt="Logo" />
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Profil</a></li>
                    <li><a href="#">Réglage</a></li>
                    <li><a href="#">Communauté</a></li>
                </ul>
            </nav>
        </header>
    );
}

