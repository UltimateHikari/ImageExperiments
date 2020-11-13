import React from 'react';
import { Redirect } from 'react-router-dom'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';


import { ValuedImages, TestImages } from './images.js';
import ProgressBar from './bar';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


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
			<img src={props.imageObj.src}
				onClick={() => props.onClick()}
				alt=""
				hidden={props.hidden}
				onLoad={() => props.onLoad()}
			/>
			);
}

class ImageGrid extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loaded: 0,
		};
	}

	componentDidUpdate(){
		console.log("grid updated");
	}
	
	shouldComponentUpdate(nextProps, nextState){
		console.log("checking " + this.state.loaded + " and " + nextState.loaded +  " " + nextState.loaded % 4);
		if((nextState.loaded % 4 === 0) || this.state.loaded === 0){
			return true;
		}else{
			return false;
		}
	}

	Counter(){
		let loaded_ = this.state.loaded;
		loaded_++;
		let hidden_ = true;
		if(loaded_ % 4 === 0){
			hidden_ = false;
		}
				console.log(loaded_ + " " + hidden_);
		this.setState({loaded: loaded_, isHidden: hidden_});
	}

	renderImage(i){
		var imageObj = 
			TestImages[this.props.images[i].category]
				[this.props.images[i].id];

		var clickFunction = () =>
				this.props.onClick(i);

		if(this.props.isFrozen){
			imageObj = 
				ValuedImages[this.props.images[i].category];
			clickFunction = () =>
				this.props.onFrozenClick();
		}
		return(
				<Image 
					imageObj={imageObj}
					onClick={clickFunction}
					hidden={this.state.isHidden}
					onLoad={() => this.Counter()}
				/>
			)
	}

	render(){
		// this.setState({hidden: false});
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
			round: 1,
			max_round: 30,
			isFrozen: false,
			history: [this.props.user],
			redirect: null,
			};
	}

	componentDidUpdate(){
		console.log("game updated");
	}
	componentDidMount(){
		console.log(" game mounted");
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
			this.setState({
				images: this.generateImages(),
				isFrozen: false},
				);
	}

	refreshHistory(i){
		var images = this.state.images.slice();
		var history = this.state.history.slice();
		if(history.length === 1){
			history.push([]);
		}
		//var historyFrame = history[1];
		// for(let i = 0; i < 4; i++){
		// 	historyFrame.push(images[i].category);
		// }
		history[1].push(ImageValues[images[i].category]);
		//history.push(historyFrame);
		return history;
	}

	handleClick(i){
		if(this.state.isFrozen){
			return;
		}
		let score = this.state.score;
		let index = this.state.images[i].category;
		let round_ = this.state.round;
		this.freeze();
		this.setState({
			history: this.refreshHistory(i), 
			score: score + ImageValues[index],
			round: round_ + 1,
		});

		if(round_ === this.state.max_round){
			this.props.firebase.attempts().push(this.state.history);
			this.setState({redirect: ROUTES.FINAL, });
		}
		// if(percentage < 100){
		// 	this.setState({images: this.getArray(), isFrozen: false});
		// }else{
		// 	//this.props.firebase.attempts().push(history);
		// }
	}

	render(){
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}
		return(
			<Container>
				<Row>
					<Col md="8"> 
						<ProgressBar
						score={this.state.score}
						round={this.state.round}
						max_round={this.state.max_round}
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
		{({authUser, changeUser}) => <Game firebase={props.firebase} user={authUser}/>}
	</AuthUserContext.Consumer>
)

const Home = withFirebase(Homepage);

export default Home;