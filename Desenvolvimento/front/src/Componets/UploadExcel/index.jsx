import { useState } from 'react';
import api from '../../Service/api';
import './style.sass';

export function UploadExcel({ onClose, urlType }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const token = localStorage.getItem('token');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Arquivo selecionado", file);
        setSelectedFile(file);        
    }

    const uploadFile = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
        alert("Por favor, selecione um arquivo .xlsx.");
        return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await api.post(`upload/${urlType}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            window.alert(response.data.message);
            console.log("Dados importados:", response.data.eventos);
            onClose();
        } catch (error) {
            alert("Erro: " + error);
            console.error("Erro na importação:", error.response?.data || error);
        }
    }
    return (
        <form onSubmit={uploadFile} className='container-exportForm'>
            <input type="file" name="file" accept=".xlsx" onChange={handleFileChange} />
            <button type="submit">Importar Excel</button>
        </form>

    )
}