import { Header } from '../../Componets/Header';
import './style.sass';

export function HomeUser() {
    const name = localStorage.getItem('name');

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
                    <p className='p'>
                        Este sistema foi desenvolvido para facilitar a gestão de estoque de produtos eletrônicos.
                        Com ele, você pode cadastrar novos produtos, acompanhar o estoque em tempo real, visualizar 
                        o histórico de movimentações e receber alertas quando algum item estiver abaixo do estoque mínimo.
                    </p>
                    <p className='p'>
                        Navegue pelo menu acima para acessar cada funcionalidade e gerenciar seu inventário de forma eficiente.
                    </p>
                </section>
            </main>
        </>
    )
}
