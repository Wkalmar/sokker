import React from 'react';
import { translate, Trans } from 'react-i18next';


export default translate("translations")(function({ children, i18nKey='' }) {
	return (
		<Trans i18nKey={ i18nKey }>
			{ children }
		</Trans>
	);
})