import gql from 'graphql-tag';


export default gql`query allPlayers($userId: ID!) {
    allPlayers(filter: {
        user: {
            id: $userId
        }
    }){
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
