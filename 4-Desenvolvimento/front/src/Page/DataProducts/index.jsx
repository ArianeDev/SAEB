import api from "../../Service/api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "../../Componets/Footer";
import { Header } from "../../Componets/Header";
import { MenuActions } from "../../Componets/MenuActions";
import { Table } from "../../Componets/Table";
import { toast, Toaster } from "react-hot-toast";
import { TourProvider } from '@reactour/tour';
import { z } from "zod";
import './style.sass';

export function DataProduct() { 
    const token = localStorage.getItem('token'); 

    // Product fields
    const [selectedId, setSelectedId] = useState(null); 
    const [name, setName] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [tension, setTension] = useState(""); 
    const [dimensions, setDimensions] = useState(""); 
    const [storage, setStorage] = useState(""); 
    const [resolution, setResolution] = useState(""); 
    const [conectivity, setConectivity] = useState(""); 

    // Table data
    const [products, setProducts] = useState([]); 
    const [nextPage, setNextPage] = useState(null); 
    const [prevPage, setPrevPage] = useState(null); 
    const [initialLoading, setInitialLoading] = useState(true); 

    // Search bar
    const [search, setSearch] = useState(""); 

    // Tour
    const steps = [ 
        { selector: '#BtnFirst', content: 'Clique aqui para ver as funções.' }, 
        { selector: '#RegisterItems', content: 'Clique aqui para cadastrar novos dados.' }, 
    ]; 

    const linkHeader = [ 
        { name: "Home", link: "/home" }, 
        { name: "Produtos", link: "/products" }, 
        { name: "Estoque", link: "/stock" }, 
        { name: "Sair", link: "/" } 
    ]; 

    const listColumns = [ 
        { key: "name", label: "Nome" }, 
        { key: "description", label: "Descrição" }, 
        { key: "tension", label: "Tensão" }, 
        { key: "dimensions", label: "Dimensões" }, 
        { key: "storage", label: "Armazenamento" }, 
        { key: "resolution", label: "Resolução" }, 
        { key: "conectivity", label: "Conectividade" }, 
    ]; 

    const listInputsForms = [ 
        { nameLabel: "Nome:", type: "text", placeholder: "Digite o nome...", atributo: name, setFunction: setName }, 
        { nameLabel: "Descrição:", type: "text", placeholder: "Digite a descrição...", atributo: description, setFunction: setDescription }, 
        { nameLabel: "Tensão:", type: "text", placeholder: "Digite a tensão...", atributo: tension, setFunction: setTension }, 
        { nameLabel: "Dimensões:", type: "text", placeholder: "Digite as dimensões...", atributo: dimensions, setFunction: setDimensions }, 
        { nameLabel: "Armazenamento:", type: "text", placeholder: "Digite o armazenamento...", atributo: storage, setFunction: setStorage }, 
        { nameLabel: "Resolução:", type: "text", placeholder: "Digite a resolução...", atributo: resolution, setFunction: setResolution }, 
        { nameLabel: "Conectividade:", type: "text", placeholder: "Digite a conectividade...", atributo: conectivity, setFunction: setConectivity }, 
    ]; 

    const productSchema = z.object({ 
        name: z.string().min(1, "Nome é obrigatório"), 
        description: z.string().min(1, "Descrição é obrigatória"), 
        tension: z.string().min(1, "Tensão é obrigatória"), 
        dimensions: z.string().min(1, "Dimensões são obrigatórias"), 
        storage: z.string().min(1, "Armazenamento é obrigatório"), 
        resolution: z.string().min(1, "Resolução é obrigatória"), 
        conectivity: z.string().min(1, "Conectividade é obrigatória") 
    }); 

    function handleSelectProduct(item) { 
        setSelectedId(item.id); 
        setName(item.name); 
        setDescription(item.description); 
        setTension(item.tension); 
        setDimensions(item.dimensions); 
        setStorage(item.storage); 
        setResolution(item.resolution); 
        setConectivity(item.conectivity); 
    } 

    function handleClearForm() { 
        setSelectedId(null); 
        setName(""); 
        setDescription(""); 
        setTension(""); 
        setDimensions(""); 
        setStorage(""); 
        setResolution(""); 
        setConectivity(""); 
    } 

    async function getProducts(page = "/products/") { 
        try { 
            const response = await api.get(page, { 
                params: search ? { name: search } : {}, 
                headers: { Authorization: `Bearer ${token}` } 
            }); 
            setProducts(response.data.results); 
            setNextPage(response.data.next); 
            setPrevPage(response.data.previous); 
        } catch (error) { 
            toast.error("Erro ao buscar produtos", error); 
        } 
    } 

    const submitRegisterProduct = async () => { 
        const newProd = { name, description, tension, dimensions, storage, resolution, conectivity }; 
        const result = productSchema.safeParse(newProd); 
        if (!result.success) { 
            toast.error(result.error.errors[0].message); 
            return; 
        } 
        try { 
            await api.post('/products/', newProd, { 
                headers: { Authorization: `Bearer ${token}` } 
            }); 
            toast.success("Produto cadastrado com sucesso!"); 
            handleClearForm(); 
            getProducts(); 
        } catch (error) { 
            toast.error("Erro ao cadastrar produto!", error); 
        } 
    }; 

    const submitUpdateProduct = async () => { 
        if (!selectedId) { 
            toast.error("Nenhum produto selecionado para atualização."); 
            return; 
        } 
        const updated = { name, description, tension, dimensions, storage, resolution, conectivity }; 
        const result = productSchema.safeParse(updated); 
        if (!result.success) { 
            toast.error(result.error.errors[0].message); 
            return; 
        } 
        try { 
            await api.put(`/products/${selectedId}/`, updated, { 
                headers: { Authorization: `Bearer ${token}` } 
            }); 
            toast.success("Atualizado com sucesso!"); 
            getProducts(); 
        } catch (error) { 
            toast.error("Erro ao atualizar produto", error); 
        } 
    }; 

    const submitDeleteProduct = async (id) => { 
        if (!window.confirm("Tem certeza que deseja excluir este produto?")) return; 
        try { 
            await api.delete(`/products/${id}/`, { 
                headers: { Authorization: `Bearer ${token}` } 
            }); 
            toast.success("Produto excluído com sucesso!"); 
            if (selectedId === id) { 
                handleClearForm(); 
            } 
            getProducts(); 
        } catch (error) { 
            toast.error("Não foi possível excluir", error); 
        } 
    }; 

    useEffect(() => { 
        getProducts().then(() => setInitialLoading(false)); 
    }, []); 

    function handleSearchKeyDown(e) { 
        if (e.key === 'Enter') { 
            getProducts("/products/"); 
        } 
    }

    return (
        <TourProvider steps={steps}>
            <Toaster 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            /> 

            <Header linkHeader={linkHeader} />
            <main className="container-table">

                <h2 className="title">Produtos</h2>

                <div className="table-header">
                    <div className="buttons">
                        <button disabled={!prevPage} onClick={() => getProducts(prevPage)}>
                            <ChevronLeft />
                        </button>

                        <button disabled={!nextPage} onClick={() => getProducts(nextPage)}>
                            <ChevronRight />
                        </button>
                    </div>
                </div>

                <section className="search-container" style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Pesquisar por nome e pressione Enter..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />
                </section>

                <Table
                    data={products}
                    columns={listColumns}
                    submitDelete={submitDeleteProduct}
                    listForms={[
                        {
                            title: "Atualizar Produto",
                            listForms: listInputsForms,
                            buttonTitle:"Atualizar",
                            method: "put",
                            methodFunction: (e) => {
                                e.preventDefault();
                                submitUpdateProduct();
                            }
                        }
                    ]}
                    onSelect={handleSelectProduct}
                    loading={initialLoading}
                    urlType="S"
                />

                <MenuActions
                    listRegister={[
                        {
                            title:"Cadastrar Produto",
                            listForms: listInputsForms,
                            buttonTitle: "Cadastrar",
                            method: "post",
                            methodFunction: (e) => {
                                e.preventDefault();
                                submitRegisterProduct();
                            }
                        }
                    ]}
                    clearForms={handleClearForm}
                    urlType="products"
                />

            </main>

            <Footer />
        </TourProvider>
    );
}
