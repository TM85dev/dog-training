import React, { useState, useEffect } from 'react'
import { useSpring, useSprings, animated, config } from 'react-spring'
import { Link } from "react-router-dom";
import '../App.css'

function MainMenu(props) {
    const colors = { default: "rgb(219,219,219)", red: "rgb(250,0,0)" }
    const [showMenu, setShowMenu] = useState(false);
    const [activeMobileMenu, setActiveMobileMenu] = useState(false);
    //show menu 
    const [slideDownMenu, setSlideDownMenu] = useSpring(() => ({
        height: "0px", opacity: 0
    }))
    // show logo
    const [showElement, setShowElement] = useSpring(() => ({
        opacity: 0
    }))
    // on click mobile menu
    const [mobile, setMobile] = useSprings(2, index => ({ width: "40px", height: "2px", top: "0px", transform: "rotate(0deg)", backgroundColor: colors.default }))
    const onClickMobileMenu = (i) => {
        setActiveMobileMenu(!activeMobileMenu);
        // disabled mobile menu
        if (activeMobileMenu === true) {
            setMobile(index => ({
                from: { transform: index === 0 ? "rotate(45deg)" : "rotate(-45deg)", width: "30px", height: "3px" },
                to: { transform: index === 0 ? "rotate(0deg)" : "rotate(0deg)", width: "40px", height: "2px" },
                config: config.wobbly
            }))
            setOverlayMenuLinks(index => ({
                marginLeft: "50px",
                opacity: 0,
                delay: index * 100
            }))
            setTimeout(() => {
                setMobile(index => ({
                    from: { top: index === 0 ? "5px" : "-5px" },
                    to: { top: "0px" },
                    config: config.wobbly
                }))
                setTimeout(() => {
                    setOverlayScreen(() => ({
                        opacity: 0
                    }))
                    setOverlayMenu(() => ({
                        width: "0px",
                        config: config.wobbly
                    }))
                    setTimeout(() => {
                        document.querySelector(".overlay").style.zIndex = null
                        document.querySelector("main").style.zIndex = null
                        document.querySelector("footer").style.zIndex = null
                    }, 200)
                }, 300)
            }, 300)
        }
        else {
            // enabled mobile menu
            setMobile(index => ({
                from: { top: "0px" },
                to: { top: index === 0 ? "5px" : "-5px" },
                config: config.wobbly
            }))
            setOverlayMenu(() => ({
                width: "200px",
                config: config.wobbly
            }))
            setOverlayScreen(() => ({
                opacity: 1
            }))
            setTimeout(() => {
                setMobile(index => ({
                    from: { transform: index === 0 ? "rotate(0deg)" : "rotate(0deg)", width: "40px", height: "2px" },
                    to: { transform: index === 0 ? "rotate(45deg)" : "rotate(-45deg)", width: "30px", height: "3px" },
                    config: config.wobbly
                }))
                setTimeout(() => {
                    setOverlayMenuLinks(index => ({
                        marginLeft: "0px",
                        opacity: 1,
                        delay: index * 100
                    }))
                }, 300)
            }, 300)
            document.querySelector(".overlay").style.zIndex = "1"
            document.querySelector("main").style.zIndex = "-1"
            document.querySelector("footer").style.zIndex = "-1"
        }
    }
    // mobile menu icon activator
    const mobileMenu = mobile.map((item, key) => <animated.div style={item} key={key}></animated.div>)
    // on hover mobile menu
    const onHoverMobileMenu = () => {
        setMobile(index => ({
            backgroundColor: colors.red
        }))
    }
    const onUnhoverMobileMenu = () => {
        setMobile(index => ({
            backgroundColor: colors.default
        }))
    }
    // on click main menu
    const onClickMenuLink = (i) => {
        props.activeLinks.forEach((item, index) => {
            return props.activeLinks[index] = index === i ? true : false
        })
        props.setMenu(index => ({
            color: index === i ? colors.red : colors.default
        }))
    }
    // on hover main menu
    const onHoverMenu = (i) => {
        props.setMenu(index => ({
            color: (index === i || props.activeLinks[index]) ? colors.red : colors.default
        }))
    }
    // on unhover main menu
    const onUnhoverMenu = (i) => {
        props.setMenu(index => ({
            color: (props.activeLinks[index]) ? colors.red : colors.default
        }))
    }

    const mainMenu = props.menuData.map((item, index) => {
        return (<Link
            to={item.link} 
            key={index}>
            <animated.span
                onMouseOver={() => onHoverMenu(index)}
                onMouseLeave={() => onUnhoverMenu(index)}
                onClick={() => onClickMenuLink(index)}
                style={props.menu[index]}
            >{item.name}
            </animated.span>
        </Link>
        )
    })

    //overlay
    const [overlayScreen, setOverlayScreen] = useSpring(() => ({
        opacity: 0
    }))
    const [overlayMenu, setOverlayMenu] = useSpring(() => ({
        width: "0px"
    }))
    const [overlayMenuLinks, setOverlayMenuLinks] = useSprings(props.menuData.length, index => ({
        marginLeft: "50px", opacity: 0, color: "rgb(219,219,219)"
    }))
    const hoveredOverlayMenuLinks = (i) => {
        setOverlayMenuLinks(index => ({
            color: index === i ? "rgb(250,0,0)" : "rgb(219,219,219)"
        }))
    }
    const unhoveredOverlayMenuLinks = () => {
        setOverlayMenuLinks(index => ({
            color: "rgb(219,219,219)"
        }))
    }
    const mobileMenuLinks = props.menuData.map(item => {
        return (<Link 
            to={item.link}
            key={item.id}>
            <animated.span
                style={overlayMenuLinks[item.id]}
                onMouseEnter={() => hoveredOverlayMenuLinks(item.id)}
                onMouseLeave={unhoveredOverlayMenuLinks}
                onClick={() => onClickMenuLink(item.id)}
            >{item.name}
            </animated.span>
        </Link>
        )
    })

    useEffect(() => {
        setTimeout(() => {
            setSlideDownMenu(() => ({
                height: "80px", opacity: 1,
                config: config.wobbly
            }))
            setTimeout(() => {
                setShowElement(() => ({
                    opacity: 1
                }))
            }, 600)
        }, 1800)
        onResizeWindow()
        window.addEventListener("resize", function () {
            onResizeWindow()
        })
        function onResizeWindow() {
            if (window.innerWidth < 900) {
                setShowMenu(false)
            }
            else {
                setShowMenu(true);
                // close overlay menu
                if (activeMobileMenu === true) {
                    onClickMobileMenu();
                }
            }
            document.querySelector(".hide").style.display = "none"
            document.querySelector(".show").style.display = ""
        }
    })

    return (
        <div>
            <animated.div
                style={overlayScreen}
                onClick={activeMobileMenu === true ? onClickMobileMenu : null}
                className="overlay"
            >
                <animated.div style={overlayMenu}>
                    {mobileMenuLinks}
                </animated.div>
            </animated.div>

            <animated.nav style={slideDownMenu}>
                <div>
                    <animated.img style={showElement} src={require("../assets/logo.png")} alt="logo" />
                </div>
                <div>
                    <animated.span
                        style={showElement}
                        className={showMenu ? 'show' : 'hide'}
                    >{mainMenu}
                    </animated.span>
                    <animated.span
                        style={showElement}
                        onClick={onClickMobileMenu}
                        onMouseOver={onHoverMobileMenu}
                        onMouseLeave={onUnhoverMobileMenu}
                        className={showMenu ? 'hide' : 'show'}
                    >
                        {mobileMenu}
                    </animated.span>
                </div>
            </animated.nav>
        </div>
    )
}

export default MainMenu