import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import tree from '../../tree.jpg'

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

class StateBar extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			percentage: 20
		}
	}
	render(){
		return(
				<div>
					<ProgressBar percentage={this.state.percentage} /> 
				</div>
			)
	}
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

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			images: Array(4).fill(null),
			isFrozen: false,
		};
	}

	handleClick(i){
		if(this.state.isFrozen){
			return;
		}
		const images = this.state.images.slice();
		images[i] = 'X';
		this.setState({images: images, isFrozen: true});
	}

	render(){
		return(
			<Container>
				<Row>
					<Col md="8"> <StateBar/> </Col>
				</Row>
				<ImageGrid
					images={this.state.images}
					isFrozen={this.state.isFrozen}
					onClick={(i) => this.handleClick(i)}
				/>
			</Container>
		);
	}
}

export default Home;