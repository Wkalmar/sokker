import React from 'react';
// Utils
import permissions from "utils/permissions.utils";


class Page404 extends React.Component {

	render() {

		return (
			<div>
				{ window.location.pathname } 404
			</div>
		)
	}
}


export default permissions(Page404);
