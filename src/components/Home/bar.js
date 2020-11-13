import React from 'react';

const Filler = (props) => {
	return <div
		className="filler"
		style={{width: `${props.percentage}%`}}
		/>
}

const Score = (props) => {
	return <table width="100%">
		<tr>
			<td className="mui--text-left"> Набрано очков: </td>
			<td className="mui--text-right"> {props.score}/100 </td>
		</tr>
		<tr>
			<td className="mui--text-left"> Раунд: </td>
			<td className="mui--text-right"> {props.round}/{props.max_round} </td>
		</tr>
		</table>
}

const ProgressBar = (props) => {
	return (
		<div>
			<div className="progress-bar">
				<Filler percentage={props.percentage}/>
			</div>
			<div className="progress-score mui--text-headline">
				<Score
				score={props.score}
				round={props.round}
				max_round={props.max_round}
				/>
			</div>
		</div>
		)
}

export default ProgressBar;