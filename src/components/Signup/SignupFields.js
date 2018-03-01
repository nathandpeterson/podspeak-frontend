import React from 'react'
import { Row, Col, Input } from 'react-materialize'

const fields = ['email', 'password', 'first name', 'last name']

const removeWhitespace = (field) =>{
  for(let i = 0; i < field.length; i++){
    if(field[i] === ' ') field[i] = '_'
  }
}

const format = (field) => {
  const fieldFormat = removeWhitespace(field)
  console.log(fieldFormat)
}




export default SignupFields
