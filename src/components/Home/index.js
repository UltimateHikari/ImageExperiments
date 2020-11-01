import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
//import tree from '../../tree.jpg'

import { withFirebase } from '../Firebase';

import './styles.css'

const Filler = (props) => {
	return <div
		className="filler"
		style={{width: `${props.percentage}%`}}
		/>
}

const ProgressBar = (props) => {
	return (
			<div className="progress-bar">
				<Filler percentage={props.percentage}/>
			</div>
		)
}

function StateBar(props){
	return(
			<div>
				<ProgressBar percentage={props.percentage} /> 
			</div>
		);
}

function Image(props){
		return(
			<button
				className={"square " + props.class}
				onClick={() => props.onClick()}
			>
				{props.value}
			</button>
			);
}
//<img src={tree} />

class ImageGrid extends React.Component{
	renderImage(i){
		let freeze = "";
		if(this.props.isFrozen){
			freeze="frozen";
		}
		return(
			<Image
				class={freeze}
				value={this.props.images[i]}
				onClick={() => this.props.onClick(i)}
			/>
			);
	}
	render(){
		return(
			<div>
			<Row>
				<Col md="4"> {this.renderImage(0)} </Col>
				<Col md="4"> {this.renderImage(1)} </Col>
			</Row>
			<Row>
				<Col md="4"> {this.renderImage(2)} </Col>
				<Col md="4"> {this.renderImage(3)} </Col>
			</Row>
			</div>
			);
	}
}

class Homepage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			images: this.getArray(),
			values: this.getValues(),
			score: 0,
			isFrozen: false,
			history: []
			};
	}

	getArray(){
		return(
			Array.from({length: 4}, 
				() => Math.floor(Math.random() * 40))
			);
	}

	getValues(){
		return([5,10,15,20]);
	}

	freeze(){		
		this.setState({isFrozen: true})
	}

	handleClick(i){
		if(this.state.isFrozen){
			return;
		}
		let images = this.state.images.slice();
		let history = this.state.history.slice();
		let score = this.state.score;
		this.freeze();
		images.push(i);
		history.push(images);
		score = Math.min(score + this.state.values[i], 100);
		this.setState({history: history, score: score });

		if(score < 100){
			this.setState({images: this.getArray(), isFrozen: false});
		}
	}

	render(){
		return(
			<Container>
				<Row>
					<Col md="8"> 
						<StateBar
						percentage={this.state.score}
						/> 
					</Col>
				</Row>
				<ImageGrid
					images={this.state.images}
					isFrozen={this.state.isFrozen}
					onClick={(i) => this.handleClick(i)}
				/>
				<div>{JSON.stringify(this.state.history)}</div>
			</Container>
		);
	}
}

//

const Home = withFirebase(Homepage);

export default Home;