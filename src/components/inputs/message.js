import React from 'react'
import { useSpring, animated, config } from 'react-spring'

function MessageInput(props) {
    const [focusMessage, setFocusMessage] = useSpring(() => ({
        transform: "translateY(0px)", color: "gray",
        config: config.wobbly
    }))
    
    const focusMessageHandler = () => {
        setFocusMessage(() => ({
            transform: "translateY(-36px)", 
            color: "black"
        }))}
    const blurMessageHandler = (e) => {
        setFocusMessage(() => ({
            transform: e.target.value.length > 0 ? "translateY(-36px)" : "translateY(0px)", 
            color: e.target.value.length > 0 ? "black" : "gray"
        }))}
    return(
        <label>
            <animated.span style={focusMessage}>Wiadomość</animated.span>
            <textarea
                onFocus={focusMessageHandler}
                onBlur={blurMessageHandler}
                name="message"
            />
            <animated.div style={props.errAnim}>{props.messageErr}</animated.div>
        </label>
    )
}

export default MessageInput