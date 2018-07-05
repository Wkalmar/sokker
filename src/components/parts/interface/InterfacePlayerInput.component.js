import React from 'react';
import InputMask from 'react-input-mask';
// MobX
import { observer } from 'mobx-react';


export default observer(function({ output, role }) {
	return (
		<InputMask mask="9.9"
				   maskChar=" "
				   alwaysShowMask={ true }
				   value={ output.get(role) }
				   onChange={ (e)=> output.set(role, +e.currentTarget.value) }
				   style={{
					   outline: 'none',
					   width: 25,
					   height: 20,
					   border: 'none',
					   borderBottom: '1px solid black',
					   fontSize: 14
				   }}
		/>
	);
})