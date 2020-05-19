import React from 'react'
import { useSpring, animated, config } from 'react-spring'

function EmailInput(props) {
    const [focusEmail, setFocusEmail] = useSpring(() => ({
        transform: "translateY(0px)", color: "gray",
        config: config.wobbly
    }))
    
    const focusEmailHandler = () => {
        setFocusEmail(() => ({
            transform: "translateY(-36px)", 
            color: "black"
        }))}
    const blurEmailHandler = (e) => {
        setFocusEmail(() => ({
            transform: e.target.value.length > 0 ? "translateY(-36px)" : "translateY(0px)", 
            color: e.target.value.length > 0 ? "black" : "gray"
        }))}
    return(
        <label>
            <animated.span style={focusEmail}>Email</animated.span>
            <input
                onFocus={focusEmailHandler}
                onBlur={blurEmailHandler}
                type="email" 
                name="email"
            />
            <animated.div style={props.errAnim}>{props.emailErr}</animated.div>
        </label>
    )
}

export default EmailInput