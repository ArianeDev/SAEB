import { useState } from 'react';
import { UserPen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Modal } from '../Modal';
import './style.sass'
import { Forms } from '../Forms';

export function Table({ data, columns, submitDelete, listForms, onSelect, loading, urlType }){
    const [isOpen, setIsOpen] = useState(false);
    const [sensorSelect, setSensorSelect] = useState(null);

    function handleOpenModal(sensor) {
        setSensorSelect(sensor);
        setIsOpen(true);
    }

    function handleCloseModal() {
        setSensorSelect(null);
        setIsOpen(false);
    }
    console.log(data);
    
    return(
        <>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className={index <= 1 ? 'firstItens' : ''}>{col.label}</th>
                        ))}
                        {urlType === 'S' && (
                            <th className='actionData'>Ações</th>
                        )}
                    </tr>
                </thead>
                {loading ? (
                    <tbody>
                        {[...Array(10)].map((_, i) => (
                        <tr key={`skeleton-${i}`}>
                            {columns.map((_, j) => (
                            <td key={j}>
                                <div className="skeletonLine" />
                            </td>
                            ))}
                            <td>
                                <div className="skeletonIcon" />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        {data.map((item, key) => (
                            <tr key={item.id || key}>
                                {columns.map((col, index) => (
                                    <td 
                                        key={index} 
                                        className='itensTable'>
                                        {
                                            col.key === 'status' ? (item[col.key].toLowerCase() === 'ativo' || item[col.key].toLowerCase() === "true" ? 
                                                <div className='green' title='Ativo'><p>Ativo</p></div>
                                                :
                                                <div className='red' title='Inativo'><p>Inativo</p></div>
                                            ): item[col.key]
                                        }
                                    </td>

                                ))}
                                {urlType === 'S' && (
                                    <td className='icons'>
                                        <span title='Deletar'>
                                            <button onClick={() => submitDelete(item.id)}><Trash2 className='trash'/></button>
                                        </span>
                                        <span title='Atualizar'>
                                            <button 
                                                onClick={() => {
                                                    handleOpenModal(item);
                                                    onSelect(item);
                                                }}>
                                                <UserPen className='userPen'/>
                                            </button>
                                        </span>
                                    </td>
                                )}
                            </tr>
                        ))}
                        {Array.from({length: Math.max(0, 10 - data.length)}).map((_,key) => (
                            <tr key={`empty-${key}`}>
                                {columns.map((_, key) => (
                                    <td key={key} className='empty-row'></td>
                                ))}
                                {urlType === 'S' && <td className='empty-row'></td>}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

            <section className="card">
                {data.map((item, key) => (
                    <div className="card-item" key={key}>
                        <div className="header-card">
                            <div className="icons-header">
                                <span title='Deletar'>
                                    <button onClick={() => submitDelete(item.id)}><Trash2 className='trash'/></button>
                                </span>
                                <span title='Atualizar'>
                                    <button 
                                        onClick={() => {
                                            handleOpenModal(item);
                                            onSelect(item);
                                        }}>
                                        <UserPen className='userPen'/>
                                    </button>
                                </span>
                            </div>
                            <p className='status-card'>
                                {
                                    item.status === 'ativo' || item.status === "true" ? 
                                        <div className='green' title='Ativo'><p>Ativo</p></div>
                                        :
                                        <div className='red' title='Inativo'><p>Inativo</p></div>
                                }
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>{item.type_sensors}</h3>
                            <p>Mac address: <span>{item.mac_address}</span></p>
                            <p>Latitude: <span>{item.latitude}</span></p>
                            <p>Longitude: <span>{item.longitude}</span></p>
                            <p>Unidade de medida: <span>{item.unit_measure}</span></p>
                        </div>
                    </div>
                ))}
                {Array.from({length: Math.max(0, 10 - data.length)}).map((_,key) => (
                    <div className="card-item-skeleton" key={key}>
                        
                    </div>
                ))}
            </section>

            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                >
                    {listForms.map((item,key) => (
                        <Forms 
                            title={item.title} 
                            listForms={item.listForms} 
                            buttonTitle={item.buttonTitle} 
                            text="" 
                            link="" 
                            method={item.method} 
                            methodFunction={item.methodFunction}
                            error={item.error}
                            disabled={item.disabled}
                        />
                    ))}
                </Modal>
            )}
        </>
    )
}