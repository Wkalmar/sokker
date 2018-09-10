import React from 'react';
import InputMask from 'react-input-mask';
// MobX
import { observer } from 'mobx-react';


export default observer(function({ output, pos, color='transparent' }) {
	return (
		<InputMask mask="99"
				   maskChar="0"
				   style={{ borderBottom: `6px solid ${color}` }}
				   alwaysShowMask={ true }
				   value={ output.get(pos) }
				   onChange={ (e)=> output.set(pos, e.currentTarget.value) }
		/>
	);
})