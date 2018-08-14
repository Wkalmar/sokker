import React from 'react';
import { translate, Trans } from 'react-i18next';
import { observer } from "mobx-react";


export default translate("translations")(function({ children, i18nKey='' }) {
	return (
		<Trans i18nKey={ i18nKey }>
			{ children }
		</Trans>
	);
})