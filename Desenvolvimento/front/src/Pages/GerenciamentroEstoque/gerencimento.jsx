import "./style.sass"
import { Sidebar } from "../../components/Sibedar/sibedar.jsx"
import { ProductTable } from "../../components/ProductTable/productTable.jsx"

export function Estoque() {
  const produtos = [
    { id: 1, nome: "iPhone 15 Pro", categoria: "Smartphones", quantidade: 45, min: 20, max: 100, preco: "R$ 5.999,99", status: "Normal" },
    { id: 2, nome: "Samsung Galaxy S24", categoria: "Smartphones", quantidade: 12, min: 15, max: 80, preco: "R$ 4.499,99", status: "Baixo" },
  ]

  return (
    <div className="estoqueGrid">
      <Sidebar />

      <main className="estoqueMain">
        <div className="header">
          <h1>Gerenciar Estoque</h1>
          <p>Controle completo do inventário de produtos eletrônicos</p>

          <button className="btnAdd">+ Adicionar Produto</button>
        </div>

        <ProductTable produtos={produtos} />
      </main>
    </div>
  )
}
