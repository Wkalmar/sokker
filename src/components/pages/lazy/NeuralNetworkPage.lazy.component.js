import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


class NeuralNetworkPage extends React.Component {

	static permissions = {
		needAuth: true,
		redirectPath: "/login"
	};
}

export default observer(
	permissions(
		lazy(()=> import(/* webpackChunkName: "NeuralNetworkPage" */ 'components/pages/NeuralNetworkPage.component'))(NeuralNetworkPage)
	));