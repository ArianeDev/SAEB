import Logo from "../../assets/img/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react';
import './style.sass';
import { useEffect, useState } from "react";

export function Header({ linkHeader }){
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        navigate('/');
    }

    return(
        <header className={scrolled ? 'scrolled' : ''}>
            <figure>
                <img src={Logo} alt="logo do SmartTrack" />
            </figure>
            <nav>
                <ul>
                    {linkHeader.map((item) => (
                        <Link to={item.link} className="link">
                            {item.name === 'Sair' ? (
                                <button onClick={handleLogout} className="btn-exit">
                                    <LogOut />
                                </button>
                            ) : (
                                <li>{item.name}</li>
                            )}
                        </Link>
                    ))}
                </ul>
            </nav>
        </header>
    )
}