import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


class FavoritesPage extends React.Component {

	static permissions = {
		needAuth: true,
		redirectPath: "/login"
	};
}

export default observer(
	permissions(
		lazy(()=> import(/* webpackChunkName: "FavoritesPage" */ 'components/pages/FavoritesPage.component'))(FavoritesPage)
	));