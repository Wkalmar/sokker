import gql from 'graphql-tag';


export default gql` query Player($id: ID!) {
    Player(id:$id) {
        id
        user {
            id
        }

        playerId
        name

        age
        defender
        keeper
        pace
        passing
        playmaker
        stamina
        striker
        technique

        att
        def
        gk
        mid
    }
}`
