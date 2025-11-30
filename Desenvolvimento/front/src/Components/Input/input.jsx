import './style.sass';

export function Input({ type, placeholder, atributo, setFunction, disabled }) {
	const handleChange = (e) => {
		let value = e.target.value;
		
		if (type === 'number') {
			value = value.replace(/\D/g, ''); 
		}

		setFunction(value);
 	}
	
	return (
		<div className="textInputWrapper">
			<input
				type={type}
				value={atributo}
				placeholder={placeholder}
				onChange={handleChange}
				className="textInput"
				disabled={disabled}
				required
			/>
		</div>
	)
}