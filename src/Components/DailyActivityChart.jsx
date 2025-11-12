import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DailyActivityChart({ data }) {
    return (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
            <h3>Activité quotidienne</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="kg" orientation="right" />
                    <YAxis yAxisId="cal" orientation="left" hide />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="kg" dataKey="weight" fill="#000" barSize={10} />
                    <Bar yAxisId="cal" dataKey="calories" fill="#f00" barSize={10} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
