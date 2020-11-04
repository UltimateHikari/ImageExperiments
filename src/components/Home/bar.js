import React from 'react';

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

export default ProgressBar;