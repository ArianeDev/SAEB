import './style.sass';

export function CardSensors({ listCard, onCardClick }){
    return(
        <section className="cards-container">
            {listCard.map((item, key) => (
                <button 
                    key={key}
                    onClick={() => onCardClick(item.sensorType)}
                    className='flip-card'
                >
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <figure title={item.imgTitle}>
                                {item.img}
                            </figure>
                            <p className="title">{item.title}</p>
                        </div>
                        <div className="flip-card-back">
                            <p className="title">{item.title}</p>
                            <p>{item.text}</p>
                        </div>
                    </div>
                </button>
            ))}
        </section>
    )
}