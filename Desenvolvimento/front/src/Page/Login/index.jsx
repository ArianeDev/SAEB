import api from '../../Service/api';
import { Card_information } from '../../Componets/Card_informations';
import { Forms } from '../../Componets/Forms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.sass';
import Loader from '../../Componets/Loader';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('login/', {
                email: email,
                password: password
            });

            const { access, refresh } = response.data;
    
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            localStorage.setItem('token', access); 

            const responseUser = await api.get('user/', {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });

            const {id, name } = responseUser.data;
            console.log("Usuário logado:", responseUser.data);
            localStorage.setItem('id', id);
            localStorage.setItem('name', name);
    
            console.log("Login bem-sucedido");
            navigate('/home', { replace: true });

        } catch (error) {
            console.error("Erro no login", error);
            setError("Email ou senha inválidas.");
        } finally {
            setIsLoading(false);
        }
    }

    const loginForms = [
        {
            "nameLabel": "Email:",
            "type": "email",
            "placeholder": "Digite seu email...",
            "atributo": email,
            setFunction: setEmail
        },
        {
            "nameLabel": "Senha:",
            "type": "password",
            "placeholder": "Digite sua senha...",
            "atributo": password,
            setFunction: setPassword
        }
    ]

    const onLinkClick = () => {
        navigate("/register");
    }
    
    return (
        <main className="login-container">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="container">
                        <Card_information 
                            firtsText="Bem vindo(a) de volta" 
                            secondText="Acesse as informações com o seu login" 
                        />
                        <Forms 
                            title="Login" 
                            listForms={loginForms} 
                            buttonTitle="Entrar" 
                            method="post"
                            methodFunction={handleLogin}
                            error={error}
                        />
                    </div>
                )}
        </main>
    )
}