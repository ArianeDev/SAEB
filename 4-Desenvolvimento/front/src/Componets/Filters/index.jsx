import { Search } from 'lucide-react';
import './style.sass';

export function Filters({ selectedTypeSensor, setSelectedTypeSensor, setSelectedDate, selectedDate, getHistorys }) {
    return(
        <section className='container-filters'>
            <div className='container-input'> 
                <label>Tipo de sensor:</label>
                <select value={selectedTypeSensor} onChange={e => setSelectedTypeSensor(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="temperatura">Temperatura</option>
                    <option value="umidade">Umidade</option>
                    <option value="contador">Contador de pessoas</option>
                    <option value="luminosidade">Luminosidade</option>
                </select>
            </div>
            <div className='container-input'>
                <label>Data:</label>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </div>
            <button onClick={() => getHistorys()}><Search className='searchIcon'/></button>
        </section>
    )
}