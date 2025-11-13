import Layout from '@/Components/Layout';
import { useEffect, useState } from 'react';
import ActivityChart from '@/Components/ActivityChart';

export default function App() {
    const [firstName, setFirstName] = useState("");

    //Récupérer prénom utilisateur
    useEffect(() => {
        fetch('http://localhost:3000/user/18')
            .then(response => response.json())
            .then(data => {
                setFirstName(data.data.userInfos.firstName); // récupère le prénom
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <Layout>
            <div className='app-container'>
                <h1>
                    Bonjour <span className='username'>{firstName}</span>
                </h1>
                <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

                {/* 👉 Ajout du graphique ici */}
                <div className="charts-section mt-8">
                    <ActivityChart userId={18} />
                </div>
            </div>
        </Layout>
    );
}

