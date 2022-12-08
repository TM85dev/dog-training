import React, { useEffect, useState } from 'react'
import { useSpring, useSprings, animated } from 'react-spring'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainMenu from './MainMenu'
import Footer from './Footer'
import MainSite from './view/MainSite'
import Oferta from './view/Oferta'
import Omnie from './view/Omnie'
import Galeria from './view/Galeria'
import Regulamin from './view/Regulamin'
import Kontakt from './view/Kontakt'
import SocialIcon from './SocialIcon'
import Kurs from './view/Kurs'

function Content(props) {
    const menuData = [
        { id: 0, link: "/", name: "Strona Główna", component: MainSite },
        { id: 1, link: "/oferta", name: "Oferta", component: Oferta },
        { id: 2, link: "/o-mnie", name: "O mnie", component: Omnie },
        { id: 3, link: "/galeria", name: "Galeria", component: Galeria },
        { id: 4, link: "/regulamin", name: "Regulamin", component: Regulamin },
        { id: 5, link: "/kontakt", name: "Kontakt", component: Kontakt },
    ]
    const [list, setList] = useState(
        [
            {id: 0, name: 'psie przedszkole', link: require('../assets/oferta-0.png'), active: false },
            {id: 1, name: 'kurs podstawowy', link: require('../assets/oferta-1.png'), active: false },
            {id: 2, name: 'kurs rozszerzony', link: require('../assets/oferta-2.png'), active: false },
            {id: 3, name: 'kurs zaawansowany', link: require('../assets/oferta-3.png'), active: false },
            {id: 4, name: 'kurs tropienia', link: require('../assets/oferta-4.png'), active: false },
            {id: 5, name: 'kurs obronny', link: require('../assets/oferta-5.png'), active: false },
            {id: 6, name: 'kurs przedwystawowy', link: require('../assets/oferta-6.png'), active: false },
            {id: 7, name: 'egzaminy', link: require('../assets/oferta-7.png'), active: false },
            {id: 8, name: 'co daje szkolenie', link: require('../assets/oferta-8.png'), active: false },
        ]
    )
    const ofertaLinks = [
        {name: 'Psie Przedszkole', link: '/psie-przedszkole'},
        {name: 'Kurs Podstawowy', link: '/kurs-podstawowy'},
        {name: 'Kurs Rozszerzony', link: '/kurs-rozszerzony'},
        {name: 'Kurs Zaawansowany', link: '/kurs-zaawansowany'},
        {name: 'Kurs Tropienia', link: '/kurs-tropienia'},
        {name: 'Kurs Obronny', link: '/kurs-obronny'},
        {name: 'Kurs Przedwystawowy', link: '/kurs-przedwystawowy'},
        {name: 'Egzaminy', link: '/egzaminy'},
        {name: 'Co Daje Szkolenie', link: '/co-daje-szkolenie'},
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
            window.location.pathname = "./"
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
    return (
        <animated.div style={showMain} className="site">
            <Router basename="/tresura">
                <MainMenu menuData={menuData} activeLinks={activeLinks} menu={menu} setMenu={setMenu} />
                {/* {view} */}
                <Switch>
                    {menuData.map(site => (
                        <Route exact path={site.link} key={site.id}>
                            {site.name==="Oferta" ? 
                            <site.component list={list} setList={setList} /> : <site.component />}
                        </Route>
                    ))}
                    {ofertaLinks.map((oferta, index) => (
                        <Route exact path={`/oferta${oferta.link}`} key={index}>
                            <Kurs list={list} setList={setList} name={oferta.name} oferta={list[index]} index={index} />
                        </Route>
                    ))}
                </Switch>
                <Footer menuData={menuData} activeLinks={activeLinks} setMenu={setMenu} />
            </Router>
            <SocialIcon />
        </animated.div>
    )
}

export default Content