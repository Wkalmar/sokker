import gql from 'graphql-tag';


export default gql`mutation createPlayer(
	$playerId: String!,
	$name: String!,
	$age: Float!,
	$defender: Float!,
	$keeper: Float!,
	$pace: Float!,
	$passing: Float!,
	$playmaker: Float!,
	$stamina: Float!,
	$striker: Float!,
	$technique: Float!,
	$att: Float!,
	$def: Float!,
	$gk: Float!,
	$mid: Float!
) {
    createPlayer(
        playerId: $playerId,
        name: $name,
		
        age: $age,
        defender: $defender,
        keeper: $keeper,
        pace: $pace,
        passing: $passing,
        playmaker: $playmaker,
        stamina: $stamina,
        striker: $striker,
        technique: $technique,
		
		att: $att,
		def: $def,
		gk: $gk,
		mid: $mid
	) {
        id
    }
}`
