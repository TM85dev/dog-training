import React, { useEffect, useState, useRef } from 'react'
import  { useSpring, animated } from 'react-spring'

import NameInput from '../inputs/name'
import EmailInput from '../inputs/email'
import MessageInput from '../inputs/message'

function Kontakt() {
// variables
    const [show, setShow] = useSpring(() => ({
        opacity: 0, transform: "translateY(50px)"}))
    const [button, setButton] = useSpring(() => ({
        color: "red", backgroundColor: "white", border: "2px solid red"}))
    // input errors
    const [nameErr, setNameErr] = useState(" ")
    const [emailErr, setEmailErr] = useState(" ")
    const [messageErr, setMessageErr] = useState(" ")
    const [nameErrAnim, setNameErrAnim] = useSpring(() => ({
        transform: "translateX(-20px)", opacity: 0
    }))
    const [emailErrAnim, setEmailErrAnim] = useSpring(() => ({
        transform: "translateX(-20px)", opacity: 0
    }))
    const [messageErrAnim, setMessageErrAnim] = useSpring(() => ({
        transform: "translateX(-20px)", opacity: 0
    }))
    //for button
    const buttonOverHandler = () => {
        setButton(() => ({
            color: "white", backgroundColor: "red", border: "2px solid red"
        }))}
    const buttonUnhoverHandler = () => {
        setButton(() => ({
            color: "red", backgroundColor: "white", border: "2px solid red"
        }))
    }

    // submit handler
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const messageRef = useRef(null)
    const [validationInfo, setValidationInfo] = useState(" ")
    const submitHandler = (e) => {
        const validationCheck = [false, false,false]
        e.preventDefault()
        nameRef.current = e.target.name.value
        emailRef.current = e.target.email.value
        messageRef.current = e.target.message.value
    // name validation
        if(nameRef.current.length < 3) {
            validationCheck[0] = false
            setNameErr('*Pole "Imię" musi posiadać więcej niż 3 znaki.')
            setNameErrAnim(() => ({transform: "translateX(0px)", opacity: 1}))
        } else {
            validationCheck[0] = true
            setNameErr(" ")
            setNameErrAnim(() => ({transform: "translateX(-20px)", opacity: 0}))
        }
    // email validation
        let emailValid = emailRef.current.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        if(emailValid) {
            validationCheck[1] = true
            setEmailErr(" ")
            setEmailErrAnim(() => ({transform: "translateX(-20px)", opacity: 0}))
        } else {
            validationCheck[1] = false
            setEmailErr('*Proszę podać prawidłowy email.')
            setEmailErrAnim(() => ({transform: "translateX(0px)", opacity: 1}))
        }
    //message validation
        if(messageRef.current.length < 8) {
            validationCheck[2] = false
            setMessageErr('*Pole "Wiadomość" musi zawierać więcej niż 8 znaków.')
            setMessageErrAnim(() => ({transform: "translateX(0px)", opacity: 1}))
        } else {
            validationCheck[2] = true
            setMessageErr(" ")
            setMessageErrAnim(() => ({transform: "translateX(-20px)", opacity: 0}))
        }
    // all inputs validated
        if(validationCheck[0]===true && validationCheck[1]===true && validationCheck[2]===true) {
            setValidationInfo("Wiadomość wysłana")
            e.target.button.disabled = true
            e.target.button.style.pointerEvents = "none"
            e.target.name.disabled = true
            e.target.email.disabled = true
            e.target.message.disabled = true
            setButton(() => ({
                color: "lightgray", backgroundColor: "white", border: "2px solid lightgray"
            }))
            // here goes logic for sending email
        }
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
                    <NameInput nameErr={nameErr} errAnim={nameErrAnim} />
                    <EmailInput emailErr={emailErr} errAnim={emailErrAnim} />
                    <MessageInput messageErr={messageErr} errAnim={messageErrAnim} />
                    <span className="validation-info">{validationInfo}</span>
                    <animated.button 
                        style={button}
                        onMouseOver={buttonOverHandler} 
                        onMouseLeave={buttonUnhoverHandler}
                        name="button"
                        type="submit">Wyślij</animated.button>
                </form>
            </animated.div>
        </main>
    )
}

export default Kontakt