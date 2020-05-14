import React, { useEffect, useState } from 'react'
import { useSpring, useSprings, animated } from 'react-spring'
import OfertaMenu from '../OfertaMenu'

function Oferta() {
    const [list, setList] = useState(
        [
            { name: 'psie przedszkole', link: require('../../assets/oferta-0.png'), active: false },
            { name: 'kurs podstawowy', link: require('../../assets/oferta-1.png'), active: false },
            { name: 'kurs rozszerzony', link: require('../../assets/oferta-2.png'), active: false },
            { name: 'kurs zaawansowany', link: require('../../assets/oferta-3.png'), active: false },
            { name: 'kurs tropienia', link: require('../../assets/oferta-4.png'), active: false },
            { name: 'kurs obronny', link: require('../../assets/oferta-5.png'), active: false },
            { name: 'kurs przedwystawowy', link: require('../../assets/oferta-6.png'), active: false },
            { name: 'egzaminy', link: require('../../assets/oferta-7.png'), active: false },
            { name: 'co daje szkolenie', link: require('../../assets/oferta-8.png'), active: false },
        ]
    )
    const nameList = ['psie przedszkole', 'kurs podstawowy', 'kurs rozszerzony', 'kurs zaawansowany', 'kurs tropienia', 'kurs obronny', 'kurs przedwystawowy', 'egzaminy', 'co daje szkolenie']

    const [fadeIn, setFadeIn] = useSpring(() => ({
        opacity: 0,
        transform: "translateY(50px)"
    }))
    const [blurBox, setBlurBox] = useSprings(list.length, index => ({
        filter: "blur(0px)"
    }))
    const [displayText, setDisplayText] = useSprings(list.length, index => ({
        height: "40px", bottom: "44px", color: "white", opacity: 1
    }))
    // on hover box
    const hoveredImage = (i) => {
        setBlurBox(index => ({
            filter: index === i ? "blur(4px)" : "blur(0px)"
        }))
        setDisplayText(index => ({
            height: index === i ? "0px" : "40px",
            bottom: index === i ? "0px" : "44px",
            opacity: index === i ? 0 : 1
        }))
        setTimeout(() => {
            let newList = []
            list.filter((item, index) => {
                if (index === i) {
                    item.name = "zobacz więcej"
                }
                return newList.push(item)
            })
            setList(() => {
                return newList
            })
            setDisplayText(index => ({
                height: "40px",
                bottom: "44px",
                color: index === i ? "#f0ece7" : "white",
                opacity: 1
            }))
        }, 400)
    }
    // on unhover box
    const unhoverImage = (i) => {
        setBlurBox(index => ({
            filter: "blur(0px)"
        }))
        setDisplayText(index => ({
            height: index === i ? "0px" : "40px",
            bottom: index === i ? "0px" : "44px",
            color: "white",
            opacity: index === i ? 0 : 1
        }))
        setTimeout(() => {
            let newList = []
            list.filter((item, index) => {
                if (index === i) {
                    item.name = nameList[i]
                }
                return newList.push(item)
            })
            setList(() => {
                return newList
            })
            setDisplayText(index => ({
                height: "40px",
                bottom: "44px",
                opacity: 1
            }))
        }, 400)
    }
    useEffect(() => {
        // show component at first
        setFadeIn(() => ({
            opacity: 1,
            transform: "translateY(0px)"
        }))
    })
    const row = list.map((item, index) => {
        return (
            <div className="oferta-box" key={index}>
                <animated.img
                    style={blurBox[index]}
                    src={item.link}
                />
                <animated.div style={displayText[index]}>
                    <span>{item.name}</span>
                </animated.div>
                <div id="box-cover"
                    onMouseOver={() => hoveredImage(index)}
                    onMouseLeave={() => unhoverImage(index)}
                ></div>
            </div>
        )
    })

    return (
        <animated.main style={fadeIn}>
            <div>
                <OfertaMenu list={list} setList={setList} />
                <h1>OFERTA</h1>
                <div className="oferta-row">
                    {row.slice(0, 3)}
                </div>
                <div className="oferta-row">
                    {row.slice(3, 6)}
                </div>
                <div className="oferta-row">
                    {row.slice(6)}
                </div>
            </div>
        </animated.main>
    )
}

export default Oferta