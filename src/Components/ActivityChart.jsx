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
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 50, right: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} yAxisId="cal" />
                    <XAxis dataKey="day" tickFormatter={(d, i) => i + 1} />
                    <YAxis yAxisId="kg" orientation="right" dataKey="kilogram" axisLine={false} tickLine={false} />
                    <YAxis yAxisId="cal" hide dataKey="calories" />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar yAxisId="kg" dataKey="kilogram" fill="#282D30" barSize={8} radius={[3, 3, 0, 0]} />
                    <Bar yAxisId="cal" dataKey="calories" fill="#E60000" barSize={8} radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}




