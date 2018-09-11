import React from 'react';
import InputMask from 'react-input-mask';
// MobX
import { observer } from 'mobx-react';


export default observer(function({ output, pos, color='transparent' }) {
	const value = output.get(pos).trim().length < 2 ? `0${output.get(pos)}` : output.get(pos);
	return (
		<InputMask mask="99"
				   maskChar="0"
				   style={{ borderBottom: `6px solid ${color}` }}
				   alwaysShowMask={ true }
				   value={ value }
				   onChange={ (e)=> output.set(pos, e.currentTarget.value) }
		/>
	);
})