import React from 'react';
// MobX
import { observer } from "mobx-react";
// Store
import store from "store";
// Component
import Interface from "components/parts/interface/Interface.component";


class HomePageContent extends React.Component {

    render() {
        return (
            <div>
                HomePage!

				<button onClick={ store.players.fetchPlayers }>Re fetch players</button>

                <Interface />
            </div>
        )
    }
}


export default observer(HomePageContent);
