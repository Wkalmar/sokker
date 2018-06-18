import React from 'react';
// MobX
import { observer } from "mobx-react";
// Utils
import permissions from "utils/permissions.utils";
import lazy from "utils/lazy.utils";


class HomePage extends React.Component {

	static permissions = {
	};
}


export default observer(
	permissions(
		lazy(()=> import(/* webpackChunkName: "HomePage" */ 'components/pages/lazy/HomePage.lazy.component'))(HomePage)
));
