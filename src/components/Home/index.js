import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import { ValuedImages, gString, TestImages } from './images.js';
import ProgressBar from './bar';

import { AuthUserContext } from '../Session';
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

const ImageValues = [1,2,3,10];

function Image(props){
	return(
			<img src={gString + props.imageObj.src}
				onClick={() => props.onClick()}
				alt=""
			/>
			);
}

class ImageGrid extends React.Component{
	renderImage(i){
		var imageObj = 
			TestImages[this.props.images[i].category]
				[this.props.images[i].id];
		var clickFunction = () => this.props.onClick(i);
		if(this.props.isFrozen){
			imageObj = 
				ValuedImages[this.props.images[i].category];
			clickFunction = () => this.props.onFrozenClick();
		}

		return(
				<Image 
					imageObj={imageObj}
					onClick={clickFunction}
				/>
			)
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

class Game extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			images: this.generateImages(),
			score: 0,
			percentage: 0,
			isFrozen: false,
			history: [this.props.user]
			};
	}

	generateImages(){
		var categories = shuffleArray([0,1,2,3]);
		var result = [];
		for(let i = 0; i < 4; i++){
			result.push({
				category: categories[i],
				id: Math.floor(
					Math.random() * TestImages[categories[i]].length)
			});
		}
		return result;
	}

	freeze(){		
		this.setState({isFrozen: true})
	}

	unfreeze(){
		if(this.state.percentage < 100){
			this.setState({
				images: this.generateImages(),
				isFrozen: false},
				);
		}
	}

	refreshHistory(i){
		var images = this.state.images.slice();
		var history = this.state.history.slice();
		var historyFrame = [];
		for(let i = 0; i < 4; i++){
			historyFrame.push([images[i].category, images[i].id]);
		}
		historyFrame.push(i);
		history.push(historyFrame);
		return history;
	}

	handleClick(i){
		if(this.state.isFrozen){
			return;
		}
		let score = this.state.score;
		let index = this.state.images[i].category;
		this.freeze();
		let percentage = 
			Math.min(score + ImageValues[index], 100);
		this.setState({
			history: this.refreshHistory(i), 
			percentage: percentage, 
			score: score + ImageValues[index],
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
					isFrozen={this.state.isFrozen}
					onClick={(i) => this.handleClick(i)}
					onFrozenClick={() => this.unfreeze()}
				/>
				<div>{JSON.stringify(this.state.history)}</div>
			</Container>
		);
	}
}

const Homepage = (props) => (
	<AuthUserContext.Consumer>
		{({authUser, changeUser}) => <Game user={authUser}/>}
	</AuthUserContext.Consumer>
)

const Home = withFirebase(Homepage);

export default Home;