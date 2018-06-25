import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


class UserPlayersPage extends React.Component {

	static permissions = {
		needAuth: true
	};
}


export default observer(
	permissions(
		lazy(()=> import(/* webpackChunkName: "UserPlayersPage" */ 'components/pages/UserPlayersPage.component'))(UserPlayersPage)
	));

