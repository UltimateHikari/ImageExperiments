import React from 'react';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import Col from 'muicss/lib/react/col'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './styles.css';
import tree from './tree.jpg';

const Landing = () => (
	<Container>
		<Panel>
		<Col md="6">
		<h1> Главная страница </h1>
		Здесь может (должна?) быть справка по происходящему <br/>
		А вот тут формочка перед экспериментом: <br/>
		<Link className='landlink' to={ROUTES.SIGN_IN}>Тык</Link>
		</Col>
		<Col md="6">
			<img width="100%" src={tree} alt="tree"/>
		</Col>
		</Panel>
	</Container>
);

export default Landing;