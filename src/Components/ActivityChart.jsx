import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,} from "recharts";

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
                <div className="bg-red-500 text-white text-xs p-2 rounded shadow-md">
                    <p>{payload[0].value} kg</p>
                    <p>{payload[1].value} kCal</p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="w-full h-[320px] bg-white rounded-2xl shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Activité quotidienne</h2>
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
                <BarChart
                    data={data}
                    margin={{ top: 50, right: 20, left: 20 }}
                >
                    {/* 👉 Ajout une grille horizontale en pointillés */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    {/* 👉 affiche l’axe X (les jours) */}
                    <XAxis
                        dataKey="day"
                        tickFormatter={(d, i) => i + 1}
                    />

                    {/* 👉 affiche deux axes Y (les poids et les calories) */}
                    <YAxis
                        yAxisId="kg"
                        orientation="right"
                        dataKey="kilogram"
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis yAxisId="cal" hide dataKey="calories" />

                    {/* 👉 Quand on survole sur une barre le payload contient les valeurs du jour 
                    <Tooltip
                        content={({ payload }) => {
                            if (!payload || payload.length === 0) return null;
                            return (
                                <div className="bg-red-500 text-white text-xs p-2 rounded">
                                    <p>{payload[0].value}kg</p>
                                    <p>{payload[1].value}Kcal</p>
                                </div>
                            );
                        }}
                    />*/}

                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        yAxisId="kg"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={7}
                        radius={[3, 3, 0, 0]}
                    />
                    <Bar
                        yAxisId="cal"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={7}
                        radius={[3, 3, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}




