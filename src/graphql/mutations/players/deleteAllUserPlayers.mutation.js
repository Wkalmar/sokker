import gql from 'graphql-tag';


export default gql`mutation deleteAllUserPlayers(
	$userId: ID!
) {
    deleteAllUserPlayers(userId: $userId) {
        response
    }
}`
