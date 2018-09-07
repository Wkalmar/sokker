import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


class ChartsPage extends React.Component {

	static permissions = {
		needAuth: true,
		redirectPath: "/login"
	};
}

export default observer(
	permissions(
		lazy(()=> import(/* webpackChunkName: "ChartsPage" */ 'components/pages/ChartsPage.component'))(ChartsPage)
	));