import Logo from "../../assets/img/Logo.svg";
import "./style.sass";

export function Card_information({ firtsText, secondText }){
	return(
		<section className="container-informations">
			<img src={Logo} alt="SmartTrack - logo" />
			<div className="text">
				<h1>{firtsText}</h1>
				<p>{secondText}</p>
			</div>
		</section>
	)
}