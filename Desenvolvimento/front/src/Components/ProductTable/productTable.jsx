import "./style.sass"
import { FaPen, FaTrash } from "react-icons/fa"

export function ProductTable({ produtos }) {
  return (
    <div className="productTableBox">
      <h3>Lista de Produtos</h3>
      <p>Visualize e gerencie todos os produtos cadastrados</p>

      <table className="productTable">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Est. Mínimo</th>
            <th>Est. Máximo</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>
                <strong>{p.nome}</strong>
                <br />
                <span>ID: {p.id}</span>
              </td>

              <td>{p.categoria}</td>
              <td>{p.quantidade}</td>
              <td>{p.min}</td>
              <td>{p.max}</td>
              <td>{p.preco}</td>

              <td>
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </td>

              <td className="acoes">
                <FaPen className="edit" />
                <FaTrash className="delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
