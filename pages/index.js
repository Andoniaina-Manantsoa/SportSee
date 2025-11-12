import Layout from "../src/Components/Layout";

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3001/user/12");
    const data = await res.json();

    return {
        props: { user: data.data },
    };
}

export default function Home({ user }) {
    return (
        <Layout>
            <h1>Bienvenue, {user.userInfos.firstName}</h1>
        </Layout>
    );
}
