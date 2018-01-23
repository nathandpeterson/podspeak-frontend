import React from 'react'

const avatars = ["😀","👻", "💩", "👽", "🤡", "🤖", "😀", "😺", "👾", "💋", "🐶", "🐸", "🦉", "🦄", "🦖", 
"🐙","🐠", "🦍", "🐉"]

export default () => {
     return avatars.map((avatar, i) => {
        return <option key={i} value={avatar} className="avatar-option">{avatar}</option>
    })
}