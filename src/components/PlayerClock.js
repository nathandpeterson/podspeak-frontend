import React from 'react'

const formatTimer = (seconds) => {
    if(seconds < 60) return `0:${leftPad(seconds)}`
    let minutes = Math.floor(seconds/60)
    seconds = seconds % 60
    if(minutes < 60) return `${minutes}:${leftPad(seconds)}`
    let hours = Math.floor(minutes/60)
    minutes = minutes % 60
    return `${hours}:${leftPad(minutes)}:${leftPad(seconds)}`
}

const leftPad = (unit) => {
    return unit < 10 ? `0${unit}` : unit.toString()
}

export default function ({time}){
    if(!time) return null
    const seconds = parseInt(time)
    const formattedTime = formatTimer(seconds)
    return <h5> {formattedTime} </h5>
}