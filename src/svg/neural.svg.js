import React from 'react';

export default function({ width=24, height=24 }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
			<path d="M12 2l-5.5 9h11z"/>
			<circle cx="17.5" cy="17.5" r="4.5"/>
			<path d="M3 13.5h8v8H3z"/>
			<path fill="none" d="M0 0h24v24H0z"/>
		</svg>
	)
}
