import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from '../../Componets/Footer';
import { Header } from "../../Componets/Header";
import { Table } from "../../Componets/Table";
import { MenuActions } from "../../Componets/MenuActions";
import './style.sass';

export function DataStock() {

    const token = localStorage.getItem('token');

    const [selectedId, setSelectedId] = useState(null);
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [minQuantity, setMinQuantity] = useState("");
    const [maxQuantity, setMaxQuantity] = useState("");
    const [stockData, setStockData] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const linkHeader = [
        { name: "Home", link: "/home" },
        { name: "Produtos", link: "/products" },
        { name: "Estoque", link: "/stock" },
        { name: "Sair", link: "/" }
    ];

    const listColumns = [
        { key: "product_name", label: "Produto" },
        { key: "quantity", label: "Quantidade Atual" },
        { key: "min_quantity", label: "Quantidade Mínima" },
        { key: "max_quantity", label: "Quantidade Máxima" },
    ];

    const listInputsForms = [
        {
            nameLabel: "Produto",
            type: "selectType",
            options: productsList.map(p => ({ value: p.id, label: p.name })),
            atributo: product,
            setFunction: setProduct
        },
        {
            nameLabel: "Quantidade Atual",
            type: "number",
            placeholder: "Digite a quantidade atual...",
            atributo: quantity,
            setFunction: setQuantity
        },
        {
            nameLabel: "Quantidade Mínima",
            type: "number",
            placeholder: "Digite a quantidade mínima...",
            atributo: minQuantity,
            setFunction: setMinQuantity
        },
        {
            nameLabel: "Quantidade Máxima",
            type: "number",
            placeholder: "Digite a quantidade máxima...",
            atributo: maxQuantity,
            setFunction: setMaxQuantity
        }
    ];

    async function loadProducts() {
        try {
            const response = await api.get("/products/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProductsList(response.data.results);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    async function getStockData(pageUrl = "/stocks/") {
        try {
            const response = await api.get(pageUrl, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStockData(response.data.results);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
        } catch {
            console.log("Não foi possível carregar o estoque");
        }
    }

    function handleSelect(item) {
        setSelectedId(item.id);
        setProduct(item.product?.id || item.product_id || "");
        setQuantity(item.quantity || "");
        setMinQuantity(item.min_quantity || "");
        setMaxQuantity(item.max_quantity || "");
    }

    function clearForm() {
        setSelectedId(null);
        setProduct("");
        setQuantity("");
        setMinQuantity("");
        setMaxQuantity("");
    }

    async function submitStock() {
        if (!product || quantity === "" || minQuantity === "" || maxQuantity === "") {
            alert("Preencha todos os campos!");
            return;
        }

        const body = {
            product,
            quantity: parseInt(quantity),
            min_quantity: parseInt(minQuantity),
            max_quantity: parseInt(maxQuantity)
        };

        try {
            if (selectedId) {
                await api.put(`/stocks/${selectedId}/`, body, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Estoque atualizado com sucesso!");
            } else {
                await api.post("/stocks/", body, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Estoque cadastrado com sucesso!");
            }
            clearForm();
            getStockData();
        } catch (error) {
            alert("Erro ao salvar estoque!");
            console.error(error);
        }
    }

    async function deleteStock() {
        if (!selectedId) return;

        try {
            await api.delete(`/stocks/${selectedId}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Estoque deletado com sucesso!");
            clearForm();
            getStockData();
        } catch (error) {
            alert("Erro ao deletar estoque!");
            console.error(error);
        }
    }

    useEffect(() => {
        loadProducts();
        getStockData();
    }, []);

    return (
        <>
            <Header linkHeader={linkHeader} />
            <main className="container-table">
                <div className="table-header">
                    <h2>Gestão de Estoque</h2>
                    <div className="buttons">
                        <button
                            title="Anterior"
                            disabled={!prevPage}
                            onClick={() => getStockData(prevPage)}
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            title="Próximo"
                            disabled={!nextPage}
                            onClick={() => getStockData(nextPage)}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
                <Table
                    data={stockData}
                    columns={listColumns}
                    onSelect={handleSelect}
                    submitDelete={deleteStock}
                    listForms={[
                        {
                            title: selectedId ? "Atualizar Produto" : "Cadastrar Produto",
                            listForms: listInputsForms,
                            buttonTitle: selectedId ? "Atualizar" : "Cadastrar",
                            method: selectedId ? "put" : "post",
                            methodFunction: (e) => {
                                e.preventDefault();
                                if (selectedId) {
                                    submitUpdateStock();
                                } else {
                                    submitRegisterProduct();
                                }
                            }
                        }
                    ]}
                    urlType="S"
                />
                <MenuActions
                    listRegister={[
                        {
                            title: selectedId ? "Atualizar Estoque" : "Cadastrar Estoque",
                            listForms: listInputsForms,
                            buttonTitle: selectedId ? "Atualizar" : "Cadastrar",
                            methodFunction: (e) => {
                                e.preventDefault();
                                submitStock();
                            }
                        }
                    ]}
                    clearForms={clearForm}
                    urlType="stock"
                    deleteFunction={deleteStock}
                    selectedId={selectedId}
                />
            </main>
            <Footer />
        </>
    );
}
