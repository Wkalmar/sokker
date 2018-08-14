import React from 'react';
import { translate, Trans } from 'react-i18next';
import { observer } from "mobx-react";


export default translate("translations")(observer(function({ children, i18nKey='', params={} }) {
	return (
		<Trans i18nKey={ i18nKey } { ...params }>
			{ children }
		</Trans>
	);
}))