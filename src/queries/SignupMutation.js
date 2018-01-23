import gql from 'graphql-tag'

export default gql` mutation signup($email: String, 
                                    $password: String, 
                                    $first_name: String,
                                    $last_name: String,
                                    $privacy: Int,
                                    $avatar: String) {
                                            signup(email: $email, 
                                            password: $password,
                                            first_name: $first_name,
                                            last_name: $last_name,
                                            avatar: $avatar,
                                            privacy: $privacy
                                                                ){
                                                            email
                                                            }
}`