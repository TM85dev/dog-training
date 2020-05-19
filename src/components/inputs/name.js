import React from 'react'
import { useSpring, animated, config } from 'react-spring'

function NameInput(props) {
    const [focusName, setFocusName] = useSpring(() => ({
        transform: "translateY(0px)", color: "gray",
        config: config.wobbly
    }))

    const focusNameHandler = () => {
        setFocusName(() => ({
            transform: "translateY(-36px)", 
            color: "black"
        }))
    }
    const blurNameHandler = (e) => {
        setFocusName(() => ({
            transform: e.target.value.length > 0 ? "translateY(-36px)" : "translateY(0px)", 
            color: e.target.value.length > 0 ? "black" : "gray"
        }))
    }

    return(
        <label>
            <animated.span style={focusName}>Imię</animated.span>
            <input 
                onFocus={focusNameHandler}
                onBlur={blurNameHandler}
                type="text"
                name="name"
            />
            <animated.div style={props.errAnim}>{props.nameErr}</animated.div>
        </label>
    )
}

export default NameInput