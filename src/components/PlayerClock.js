import React from 'react'

export default function ({time}){
    if(!time) return null
    time = parseInt(time)
    return <p> clock {time} </p>
}