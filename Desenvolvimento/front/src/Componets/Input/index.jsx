import './style.sass';

export function Input({ type, placeholder, atributo, setFunction, disabled, options }) {
  const handleChange = (e) => {
    let value = e.target.value;

    if (type === 'number') {
      value = value.replace(/\D/g, '');
    }

    setFunction(value);
  };

  if (type === 'selectType') {
    return (
      <div className="textInputWrapper">
        <select
          value={atributo || ""}
          onChange={(e) => setFunction(e.target.value)} 
          disabled={disabled}
          className="textInput"
          required
        >
          <option value="">Selecione...</option>
          {options && options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
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
  );
}
