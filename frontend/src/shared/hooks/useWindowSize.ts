'use client'

import { useEffect, useState } from "react"

export const useWindowSize = ()=>{
    const [windowWidth,setWindowWidth]=useState(0)
    const [windowHeight,setWindowHeight]=useState(0)

    const resizeHandler = ()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    };

    useEffect(()=>{
        window.addEventListener("resize",resizeHandler)

        return ()=>{
            window.removeEventListener('resize',resizeHandler)
        }
    })

    return {windowWidth,windowHeight}
}