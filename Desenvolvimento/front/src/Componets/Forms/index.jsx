import { Input } from "../Input";
import { Label } from "../Label";
import { Button } from "../Button";
import './style.sass';

export function Forms({ title, listForms, buttonTitle, text, link, method, methodFunction, error, onLinkClick }){
    return(
        <section className="container-forms">
            <h2>{title}</h2>
            {error &&
                <p className="error">{error}</p>
            }
            <form method={method} onSubmit={methodFunction}>
                {listForms.map((item, key) => (
                    <div className="container-input">
                        <Label text={item.nameLabel} />
                        <Input 
                            type={item.type} 
                            atributo={item.atributo} 
                            placeholder={item.placeholder} 
                            setFunction={item.setFunction}
                            disabled={item.disabled}
                        />
                    </div>
                ))}
                <Button text={buttonTitle} />
            </form>
            
        </section>
    )
}