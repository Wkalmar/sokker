import React from 'react';
import { Link } from 'react-router-dom';


export default ({ to, children, ...rest })=> {

	// Storybook fix Link outside Router problem
	if(global.STORYBOOK_ENV) return <span>{ children }</span>;

	return <Link to={ to } { ...rest }>{ children }</Link>;
}