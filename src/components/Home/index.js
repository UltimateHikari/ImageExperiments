import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import { ValuedImages, gString } from './images.js'

import { withFirebase } from '../Firebase';

import './styles.css'

function shuffleArray(array) {
	let curId = array.length;
	while (0 !== curId) {
		let randId = Math.floor(Math.random() * curId);
		curId -= 1;
		let tmp = array[curId];
		array[curId] = array[randId];
		array[randId] = tmp;
	}
	return array;
}

const Filler = (props) => {
	return <div
		className="filler"
		style={{width: `${props.percentage}%`}}
		/>
}

const Score = (props) => {
	return <table width="100%">
			<td className="mui--text-left"> Набрано очков: </td>
			<td className="mui--text-right"> {props.score}/100 </td>
		</table>
}

const ProgressBar = (props) => {
	return (
		<div>
			<div className="progress-bar">
				<Filler percentage={props.percentage}/>
			</div>
			<div className="progress-score mui--text-headline">
				<Score score={props.score}/>
			</div>
		</div>
		)
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

function ImageValue(props){
	return(
			<img src={gString + ValuedImages[props.valueindex].src}
				onClick={() => props.onClick()}
			/>
			);
}

class ImageGrid extends React.Component{
	renderImage(i){
		if(this.props.isFrozen){
		return(
			<ImageValue
				valueindex={this.props.valueindices[i]}
				onClick={() => this.props.onFrozenClick()}
			/>
			);
		}else{
		return(
			<Image
				class=""
				value={this.props.images[i]}
				onClick={() => this.props.onClick(i)}
			/>
			);
		}
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
			valueindices: this.getIndices(),
			score: 0,
			percentage: 0,
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
		return([1,2,3,10]);
	}

	getIndices(){
		return(shuffleArray([0,1,2,3]));
	}

	freeze(){		
		this.setState({isFrozen: true})
	}

	unfreeze(){
		if(this.state.percentage < 100){
			this.setState({
				images: this.getArray(),
				valueindices: this.getIndices(),
				isFrozen: false},
				);
		}
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
		let percentage = Math.min(score + this.state.values[i], 100);
		this.setState({
			history: history, 
			percentage: percentage, 
			score: score + this.state.values[i],
		});

		// if(percentage < 100){
		// 	this.setState({images: this.getArray(), isFrozen: false});
		// }else{
		// 	//this.props.firebase.attempts().push(history);
		// }
	}

	render(){
		return(
			<Container>
				<Row>
					<Col md="8"> 
						<ProgressBar
						percentage={this.state.percentage}
						score={this.state.score}
						/> 
					</Col>
				</Row>
				<ImageGrid
					images={this.state.images}
					values={this.state.values}
					valueindices={this.state.valueindices}
					isFrozen={this.state.isFrozen}
					onClick={(i) => this.handleClick(i)}
					onFrozenClick={() => this.unfreeze()}
				/>
				<div>{JSON.stringify(this.state.history)}</div>
			</Container>
		);
	}
}

//

const Home = withFirebase(Homepage);

export default Home;