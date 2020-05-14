import React, { useEffect } from 'react'
import { useSpring, useSprings, animated, config } from 'react-spring'
import { Link } from 'react-router-dom'

function Footer(props) {
    const [link, setLink] = useSprings(props.menuData.length, index => ({
        color: "rgb(219,219,219)"
    }))
    const [showFooter, setShowFooter] = useSpring(() => ({
        height: "0px"
    }))
    // hovered link
    const linkHoverHandler = (i) => {
        setLink((index) => ({
            color: index === i ? "rgb(250,0,0)" : "rgb(219,219,219)"
        }))
    }
    // unhovered link
    const linkUnhoverHandler = () => {
        setLink(() => ({
            color: "rgb(219,219,219)"
        }))
    }
    // clicked link
    const onClickMenuLink = (i) => {
        props.activeLinks.forEach((item, index) => {
            return props.activeLinks[index] = index === i ? true : false
        })
        props.setMenu(index => ({
            color: index === i ? "rgb(250,0,0)" : "rgb(219,219,219)"
        }))
    }
    const menu = props.menuData.map(item => {
        return (<Link to={item.link} key={item.id}>
            <animated.span
                style={link[item.id]}
                onMouseOver={() => linkHoverHandler(item.id)}
                onMouseLeave={linkUnhoverHandler}
                onClick={() => onClickMenuLink(item.id)}
            >{item.name}
            </animated.span>
        </Link>
        )
    })

    useEffect(() => {
        const footerOnResize = () => {
            if (window.innerWidth < 370) {
                setShowFooter(() => ({
                    height: "0px",
                    config: config.wobbly
                }))
            } else {
                setShowFooter(() => ({
                    height: "60px",
                    config: config.wobbly
                }))
            }
        }
        setTimeout(() => {
            footerOnResize()
        }, 1900)
        window.addEventListener("resize", function () {
            footerOnResize()
        })
    })
    return (
        <animated.footer style={showFooter}>
            <div>
                {menu}
            </div>
            <p>Copyright © 2020. All Rights Reserved.</p>
        </animated.footer>
    )
}

export default Footer