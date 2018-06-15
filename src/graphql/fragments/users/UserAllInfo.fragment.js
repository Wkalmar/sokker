import gql from 'graphql-tag';


export default gql`fragment UserAllInfo on User {
    id
    email
    avatar
    name
}`