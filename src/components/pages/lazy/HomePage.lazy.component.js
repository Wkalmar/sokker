import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";


class HomePageContent extends React.Component {

    render() {
        return (
            <div>
                HomePage!

				<button onClick={ store.players.fetchPlayers }>Re fetch players</button>
            </div>
        )
    }
}


export default observer(HomePageContent);
