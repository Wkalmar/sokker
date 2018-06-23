import gql from 'graphql-tag';


export default gql`mutation signupUser($email: String!, $password: String!, $name: String) {
    signupUser(email: $email, password: $password, name: $name) {
        id
        token
    }
}`
