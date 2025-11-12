import Layout from '@/Components/Layout';
import { useEffect, useState } from 'react';

export default function App() {
    const [firstName, setFirstName] = useState("");

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
            <h1>
                Bonjour <span style={{ color: "red" }}>{firstName}</span>
            </h1>
        </Layout>
    );
}

