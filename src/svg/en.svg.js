import React from 'react';

export default function({ width=24, height=24 }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${width}`}>
			<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	)
}
