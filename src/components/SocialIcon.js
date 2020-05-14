import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import fb from '../assets/fb.png'


function SocialIcon() {
    // default icon
    const [hoverIcon, setHoverIcon] = useSpring(() => ({
        filter: "saturate(60%)",
        scale: "1",
        marginRight: "-40px",
        opacity: 0
    }))
    // hovered icon
    const hoverIconHandler = () => {
        setHoverIcon(() => ({
            filter: "saturate(100%)",
            scale: "1.02",
            marginRight: "0px",
            config: { duration: 200 }
        }))
    }
    // unhovered icon
    const unhoverIconHandler = () => {
        setHoverIcon(() => ({
            filter: "saturate(60%)",
            scale: "1",
            marginRight: "-4px",
            config: { duration: 200 }
        }))
    }
    useEffect(() => {
        setTimeout(() => {
            setHoverIcon(() => ({
                marginRight: "-4px",
                opacity: 1
            }))
        }, 2000)
    }, [setHoverIcon])
    return (
        <animated.div
            style={hoverIcon}
            className="social-icon"
            onMouseOver={hoverIconHandler}
            onMouseLeave={unhoverIconHandler}
        >
            <img src={fb} alt="facebook" />
        </animated.div>
    )
}

export default SocialIcon