import React, { useEffect, useState } from 'react'
import { useSpring, useSprings, animated } from 'react-spring'
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainMenu from './MainMenu'
import Footer from './Footer'
import MainSite from './view/MainSite'
import Oferta from './view/Oferta'
import Omnie from './view/Omnie'
import Galeria from './view/Galeria'
import Regulamin from './view/Regulamin'
import Kontakt from './view/Kontakt'
import SocialIcon from './SocialIcon'

function Content(props) {
    const menuData = [
        { id: 0, link: "/", name: "Strona Główna", component: MainSite },
        { id: 1, link: "/oferta", name: "Oferta", component: Oferta },
        { id: 2, link: "/o-mnie", name: "O mnie", component: Omnie },
        { id: 3, link: "/galeria", name: "Galeria", component: Galeria },
        { id: 4, link: "/regulamin", name: "Regulamin", component: Regulamin },
        { id: 5, link: "/kontakt", name: "Kontakt", component: Kontakt },
    ]
    const [showMain, setShowMain] = useSpring(() => ({
        width: "0%", top: "50%", left: "50%", height: "0vh"
    }))
    const [showSite, setShowSite] = useState(false)
    const activeLinks = [true];
    for (let i = 0; i <= 4; i++) {
        activeLinks.push(false)
    }
    const [menu, setMenu] = useSprings(menuData.length, index => ({
        color: index === 0 ? "rgb(250,0,0)" : "rgb(219,219,219)"
    }))
    useEffect(() => {
        if (window.location.pathname !== '/') {
            window.location.pathname = "/"
        }
        setShowMain(() => ({
            width: "100%", left: "0px", height: "1px"
        }))
        setTimeout(() => {
            setShowMain(() => ({
                top: "0%", height: "100vh"
            }))
            setTimeout(() => {
                setShowSite(true);
                document.querySelector(".site").style.position = "relative"
                document.querySelector(".site").style.height = null
            }, 1800)
            setTimeout(() => { // show background image
                document.querySelector("body").classList = "bg"
            },600)
        }, 800)
    }, [setShowMain])

    const view = menuData.map(item => <Route exact path={item.link} key={item.id} component={(props) => <item.component {...props} showSite={showSite} />} />)
    return (
        <animated.div style={showMain} className="site">
            <Router>
                <MainMenu menuData={menuData} activeLinks={activeLinks} menu={menu} setMenu={setMenu} />
                {view}
                <Footer menuData={menuData} activeLinks={activeLinks} setMenu={setMenu} />
            </Router>
            <SocialIcon />
        </animated.div>
    )
}

export default Content