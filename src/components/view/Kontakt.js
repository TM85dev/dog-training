import React, { useEffect } from 'react'
import  { useSpring, animated, config } from 'react-spring'

function Kontakt() {
// variable
    const [show, setShow] = useSpring(() => ({
        opacity: 0, transform: "translateY(50px)"
    }))
    const [button, setButton] = useSpring(() => ({
        color: "red", backgroundColor: "white"
    }))
    const [focusName, setFocusName] = useSpring(() => ({
        transform: "translateY(0px)", color: "gray",
        config: config.wobbly
    }))
    const [focusEmail, setFocusEmail] = useSpring(() => ({
        transform: "translateY(0px)", color: "gray",
        config: config.wobbly
    }))
    const [focusMessage, setFocusMessage] = useSpring(() => ({
        transform: "translateY(0px)", color: "gray",
        config: config.wobbly
    }))

// functions
    const buttonOverHandler = () => {
        setButton(() => ({
            color: "white", backgroundColor: "red"
        }))
    }
    const buttonUnhoverHandler = () => {
        setButton(() => ({
            color: "red", backgroundColor: "white"
        }))
    }

    // for imię input
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

    // for email input
    const focusEmailHandler = () => {
        setFocusEmail(() => ({
            transform: "translateY(-36px)", 
            color: "black"
        }))
    }
    const blurEmailHandler = (e) => {
        setFocusEmail(() => ({
            transform: e.target.value.length > 0 ? "translateY(-36px)" : "translateY(0px)", 
            color: e.target.value.length > 0 ? "black" : "gray"
        }))
    }

    // for message input
    const focusMessageHandler = () => {
        setFocusMessage(() => ({
            transform: "translateY(-36px)", 
            color: "black"
        }))
    }
    const blurMessageHandler = (e) => {
        setFocusMessage(() => ({
            transform: e.target.value.length > 0 ? "translateY(-36px)" : "translateY(0px)", 
            color: e.target.value.length > 0 ? "black" : "gray"
        }))
    }

    // submit handler
    const submitHandler = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        setShow(() => ({
            opacity: 1, transform: "translateY(0px)"
        }))
    })
    return (
        <main>
            <animated.div style={show}>
                <h1>KONTAKT</h1>
                <form onSubmit={submitHandler} >
                    <label>
                        <animated.span style={focusName}>Imię</animated.span>
                        <input 
                            onFocus={focusNameHandler}
                            onBlur={blurNameHandler}
                            type="text"
                        />
                    </label>
                    <label>
                        <animated.span style={focusEmail}>Email</animated.span>
                        <input
                            onFocus={focusEmailHandler}
                            onBlur={blurEmailHandler}
                            type="email" 
                        />
                    </label>
                    <label>
                        <animated.span style={focusMessage}>Wiadomość</animated.span>
                        <textarea
                            onFocus={focusMessageHandler}
                            onBlur={blurMessageHandler}
                        />
                    </label>
                    <animated.button 
                        style={button}
                        onMouseOver={buttonOverHandler} 
                        onMouseLeave={buttonUnhoverHandler}
                        type="submit">Wyślij</animated.button>
                </form>
            </animated.div>
        </main>
    )
}

export default Kontakt