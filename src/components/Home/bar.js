import React from 'react';

const Filler = (props) => {
	return <div
		className="filler"
		style={{width: `${props.percentage}%`}}
		/>
}

const Score = (props) => {
	return <table width="100%">
		<tbody>
		<tr>
			<td className="mui--text-left"> Набрано очков: </td>
			<td className="mui--text-right"> {props.score}/{props.max_score} </td>
		</tr>
		<tr>
			<td className="mui--text-left"> Раунд: </td>
			<td className="mui--text-right"> {props.round}/{props.max_round} </td>
		</tr>
		</tbody>
		</table>
}

const ProgressBar = (props) => {
	let mult = 1 + Math.floor(props.score/100);
	let percentage = props.score/mult;
	return (
		<div>
			<div className="progress-bar">
				<Filler percentage={percentage}/>
			</div>
			<div className="progress-score mui--text-headline">
				<Score
				score={props.score}
				max_score={100*mult}
				round={props.round}
				max_round={props.max_round}
				/>
			</div>
		</div>
		)
}

export default ProgressBar;