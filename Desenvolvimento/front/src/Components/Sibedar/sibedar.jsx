import "./style.sass"
import { FaChartBar, FaBoxes, FaHistory, FaSignOutAlt } from "react-icons/fa"

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logoBox">
        <div className="logoIcon">📊</div>
        <div className="logoText">
          <h2>StockFlow</h2>
          <span>Gerenciamento de Estoque</span>
        </div>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <FaChartBar /> Dashboard
          </li>
          <li className="active">
            <FaBoxes /> Gerenciar Estoque
          </li>
          <li>
            <FaHistory /> Histórico
          </li>
        </ul>
      </nav>

      <div className="bottomSection">
        <div className="userBox">
          <span>Usuário logado</span>
          <strong>Administrador</strong>
        </div>

        <button className="logoutBtn">
          <FaSignOutAlt />
          Sair
        </button>
      </div>
    </aside>
  )
}
