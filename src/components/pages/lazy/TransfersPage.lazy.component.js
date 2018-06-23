import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


class TransfersPage extends React.Component {

	static permissions = {
		needAuth: true
	};
}


export default observer(
	permissions(
		lazy(()=> import(/* webpackChunkName: "TransfersPage" */ 'components/pages/TransfersPage.component'))(TransfersPage)
	));

