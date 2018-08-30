import gql from 'graphql-tag';


export default gql`mutation deletePlayer(
	$id: ID!
) {
    deletePlayer(
		id: $id
	) {
        id
    }
}`
