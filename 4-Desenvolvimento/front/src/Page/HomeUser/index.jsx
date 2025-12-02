import { useEffect, useState } from 'react';
import { Header } from '../../Componets/Header';
import './style.sass';
import api from '../../Service/api';

export function HomeUser() {
    const name = localStorage.getItem('name');
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function fetchStock() {
            try {
                const response = await api.get("/stocks/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data.results;
                const msgs = data
                .filter(item => item.status_message)
                .map(item => item.status_message);
                setAlerts(msgs);
            } catch (err) {
                console.error("Erro ao carregar estoque", err);
            }
        }
        fetchStock();
    }, []);

    // itens do header
    const linkHeader = [
        { name: "Home", link: "/home" },
        { name: "Produtos", link: "/products" },
        { name: "Estoque", link: "/stock" },
        { name: "Sair", link: "/" }
    ];

    return (
        <>
            <Header linkHeader={linkHeader} />
            <main className='container-homeUser'>
                <section className="texts">
                    <h2>Seja bem-vindo(a), {name}</h2>
                    <div className="line"></div>
                    <p className='p'>Este sistema foi desenvolvido para facilitar a gestão de estoque...</p>
                </section>

                <section className="alerts">
                    <h3>📊 Alertas de Estoque</h3>
                    {alerts.length > 0 ? (
                        <ul>
                        {alerts.map((msg, i) => <li key={i}>{msg}</li>)}
                        </ul>
                    ) : (
                        <p>Todos os estoques estão dentro dos limites.</p>
                    )}
                </section>
            </main>
        </>
    )
}
