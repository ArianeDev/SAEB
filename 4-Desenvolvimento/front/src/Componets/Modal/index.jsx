import './style.sass';

export function Modal({ onClose, isOpen, children}){
    if(!isOpen){
        return null;
    }

    return(
        <div className="modalBack">
            <div className="modalContainer">
                <div className="modalHeader">
                    <button onClick={onClose}>x</button>
                </div>
                <div className="modalMain">
                    {children}
                </div>
            </div>
        </div>
    )
}