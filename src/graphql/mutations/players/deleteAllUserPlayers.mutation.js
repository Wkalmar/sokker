import gql from 'graphql-tag';


export default gql`mutation deleteAllUserPlayers(
	$userId: String!
) {
    deleteAllUserPlayers(userId: $userId) {
        response
    }
}`
