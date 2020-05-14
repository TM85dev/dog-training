import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

function MainSite(props) {

    const [fadeIn, setFadeIn] = useSpring(() => ({
        opacity: 0,
        transform: "translateY(50px)"
    }))
    useEffect(() => {
        setFadeIn(() => ({
            opacity: 1,
            transform: "translateY(0px)"
        }))
    })
    const main = <animated.div style={fadeIn}><h1>Szkolenie psów</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br /></p></animated.div>
    return (
        <main>
            {props.showSite && main}
        </main>
    )
}

export default MainSite