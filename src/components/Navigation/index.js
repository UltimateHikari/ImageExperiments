import React from 'react';
import Appbar from 'muicss/lib/react/appbar'
import Container from 'muicss/lib/react/container';
import { Link } from 'react-router-dom';

import '../../styles.css'
import './index.css'

import * as ROUTES from '../../constants/routes'

class Navigation extends React.Component{
	render(){
		return(
			<div>
				<Appbar className="mui--z1">
				<Container>
					<table width='100%'>
						<tbody>
							<tr className='mui--appbar-height'>
								<td className="mui--text-title">ImageExperiment</td>
								<td className="mui--text-right">
									<ul className='mui-list--inline mui--text-body2'>
										<li>
											<Link className='link' to={ROUTES.LANDING}>Landing</Link>
										</li>
										<li>
											<Link className='link' to={ROUTES.HOME}>Home</Link>
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</Container>
				</Appbar>
			</div>
		);
	}
}

export default Navigation;