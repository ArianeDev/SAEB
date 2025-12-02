import './style.sass';

export function Button({ text }) {
	return (
		<input
			type="submit"
			value={text}
			className='btn'
		/>
	)
}