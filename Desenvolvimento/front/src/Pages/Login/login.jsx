import { useState } from "react"
import { Input } from "../../Components/Input/input.jsx"
import { PackageOpen } from "lucide-react"
import "./style.sass"

export function Login() {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // lógica de login...
  }

  return (
    <main className="loginContainer">
        <div className="loginCard">
            <section className="logoArea">
            <div className="logoIcon">
                <PackageOpen />
            </div>
            </section>
            <h2>Sistema de Gerenciamento</h2>
            <p className="subtitle">
                Faça login para acessar o sistema de estoque
            </p>
            <form onSubmit={handleSubmit} className="formArea">
                <label>Usuário</label>
                <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    atributo={usuario}
                    setFunction={setUsuario}
                />

                <label>Senha</label>
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    atributo={senha}
                    setFunction={setSenha}
                />

                <button type="submit" className="btnEntrar">Entrar</button>
            </form>
        </div>
    </main>
  )
}
