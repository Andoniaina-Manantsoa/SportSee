// src/Components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "../styles/layout.module.css";

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.contentWrapper}>
                <Sidebar />
                <main className={styles.mainContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}
