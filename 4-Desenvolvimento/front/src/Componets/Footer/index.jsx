import { Github, Linkedin } from 'lucide-react';
import Logo from '../../assets/img/Logo_puple.svg';
import './style.sass';

export function Footer(){
	return(
		<footer>
			<div className="part1">
				<img src={Logo} alt="Logo do SmartTrack" />
				<div className="iconsFooter">
					<a href="https://github.com/ArianeDev" target='_blank' rel='noopener noreferrer'>
						<span title='GitHub'>
							<Github className='icons'/>
						</span>
					</a>
					<a href="https://www.linkedin.com/in/ariane-silva-a21039260/" target='_blank' rel='noopener noreferrer'>
						<span title='Linkedin'>
							<Linkedin className='icons'/>
						</span>
					</a>
				</div>
			</div>
			<div className="part2">
				<p>©2025 Ariane Oliveira Silva - Todos os direitos reservados.</p>
			</div>
		</footer>
	)
}