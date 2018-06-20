import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


class LogInPage extends React.Component {

	static permissions = {
		notForAuth: true,
		redirectPath: "/"
	};
}

export default observer(
	permissions(
		lazy(()=> import(/* webpackChunkName: "LogInPage" */ 'components/pages/LogInPage.component'))(LogInPage)
	));