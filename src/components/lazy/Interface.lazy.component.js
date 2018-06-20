import React from 'react';
// Utils
import lazy from "utils/lazy.utils";


class Interface extends React.Component {
}


export default lazy(()=> import(/* webpackChunkName: "Interface" */ 'components/parts/interface/Interface.component'))(Interface);
