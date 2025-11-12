// pages/_app.js
import '../src/styles/globals.css'; // CSS global obligatoire ici

export default function App({ Component, pageProps }) {
    return (
            <Component {...pageProps} />
    );
}
