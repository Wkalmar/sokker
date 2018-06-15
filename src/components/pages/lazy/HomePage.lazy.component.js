import React from 'react';
// MobX
import { observer } from "mobx-react";


class HomePageContent extends React.Component {

    render() {
        return (
            <div>
                HomePage!
            </div>
        )
    }
}


export default observer(HomePageContent);
