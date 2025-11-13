import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from "recharts";
import styles from '../styles/activityChart.module.css';

//Déclaration du composant
export default function ActivityChart({ userId }) {
    const [data, setData] = useState([]);

    //Chargement des données depuis l'API
    useEffect(() => {
        async function fetchActivity() {
            try {
                const res = await fetch(`http://localhost:3000/user/${userId}/activity`);
                const json = await res.json();
                setData(json.data.sessions);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        }
        fetchActivity();
    }, [userId]);

    //fonction quand on survole une barre payload contient les valeurs du jour (poids + calories)
    function CustomTooltip({ payload, active }) {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p>{payload[0].value} kg</p>
                    <p>{payload[1].value} kCal</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className={styles.activityChartContainer}>
            <div className={styles.activityChartHeader}>
                <h2>Activité quotidienne</h2>
                <ul className={styles.activityList}>
                    <li>Poids (kg)</li>
                    <li>Calories brûlées (kCla)</li>
                </ul>

                {/*Construction de la légende manuellement*/}
                <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ top: -10 }}
                    payload={[
                        { value: "Poids (kg)", type: "circle", color: "#282D30" },
                        { value: "Calories brûlées (kCal)", type: "circle", color: "#E60000" },
                    ]}
                />
            </div>

            {/*Ajustement de la taille du graphique au conteneur*/}
            <ResponsiveContainer width="100%" height={250}>

                {/*Graphique alimenté par le tableau data*/}
                <BarChart data={data} margin={{ top: 50, right: 20, left: 20 }}>

                    {/*Ajout grille horizontale en pointillés*/}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} yAxisId="cal" />

                    {/*affiche l’axe X (les jours).*/}
                    <XAxis dataKey="day" tickFormatter={(d, i) => i + 1} />
                    
                    {/*affiche deux axes Y (poids et calories).*/}
                    <YAxis yAxisId="kg" orientation="right" dataKey="kilogram" axisLine={false} tickLine={false} />
                    <YAxis yAxisId="cal" hide dataKey="calories" />

                    <Tooltip content={<CustomTooltip />} />

                    {/*Barres du graphique*/}
                    <Bar yAxisId="kg" dataKey="kilogram" fill="#282D30" barSize={8} radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="cal" dataKey="calories" fill="#E60000" barSize={8} radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}




