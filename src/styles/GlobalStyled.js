import { Button, Rating, Stack } from '@mui/material'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body{
        margin:0;
        font-size: 25px;
        padding: .5em 1em;
        /* background-color: #e65100; */
        @media screen and (max-width: 700px){
            font-size: 18px;
        }
        @media screen and (max-width: 400px){
            font-size: 15px;
        }
    }
`

export const StylesDivCarousel = styled.div`
    width: 100%;
    height: 20vh;
    margin: auto;
`
export const StylesImgCarousel = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;

`
export const StylesDivHome = styled.div`
    background-color: white;
    padding-top: 0.5em;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
`
export const StylesDivButton = styled.div`
    display: flex;
    width:100%;
    flex-direction: column;
    justify-content: center;
    gap: 0.6em;
    h1{
        font-size: 15px;
        color: #414141;
        margin-top: .5em;     
    }
`
export const StylesStack = styled(Stack)`
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const StylesButtonMui = styled(Button)`
    font-size: 14px !important;
    text-transform: capitalize !important;
    margin-top: 0.5em !important;
`
export const StylesDivCard = styled.div`
    display:flex;
    width: 21em;
    height: 7em;
    border-radius: 1em;
    margin: 1em;
    img{
        width: 8em;
        height: 100%;
        object-fit: cover;
        clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);
        border-radius: 1em;
    }
    div{
        display:flex;
        flex-direction: column;
        gap: 0.5em;
        margin-left: .6em;
        justify-content: center;        
        color: #414141;
        h5{
            font-size: 0.9em;
            font-weight: 400;
            margin:0;
        }
        p{
            font-size: 0.8em;
            font-weight: 300;
            margin: 0;
        }
        h6{
            font-weight: 300;
            font-size: 0.6em;
            color: #A7A7A7;
            margin:0;
        }
    }
`
export const StylesStars = styled(Rating)`
    width: 2.7em;
`
export const StylesDivLogged =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    svg{
        width: 2em;
        height:2em;
        color: #e65100;
    }
    div{
        display:flex;
        flex-direction: column;
        gap: 0.05em;
        h6{
            margin:0;
            color: #e65100;
            font-size: 0.6em;
        }
        span{
            margin:0;
            color: #414141;
            font-size: 0.7em;
            font-weight: 400;
        }
    }
`
export const StylesDivUserState = styled.div`
    display: flex;
    width: 100%;
`
export const StylesH1 = styled.h1`
    font-weight: 600;
    font-size: 1.5em;
    margin-left: 1em;
    color: #414141;
`
export const StylesP = styled.p`
    font-size: 15px;
    color: #414141;
    text-align: right;
    margin-top: 4em;
`
export const StylesLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
        width: 34%;
        height: auto;
    }
    h1{
        font-size: 1.3em;
        color: #414141;
        margin:0;
    }
    p{
        font-size: 1em;
        font-weight: 300;
        color: #414141;
        width: 80%;
        text-align: center;
        margin:0;
    }
`
export const StylesShowCards = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
`
export const StylesDetailsFood = styled.div`
    display: flex;
    flex-direction: column;
    img{
        width: 100%;
        height: 40%;
        object-fit: cover;
        border-radius: 1%;
    }
    p{
        text-align: justify;
        font-size: .9em;
        width: 85%
    }
`
export const StylesTitleDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5em;
    h1{
        font-size:1.5em;
    }
`
export const StylesCheck = styled.div`
    display: flex;
    flex-direction: column;
    h2{
        color: #A7A7A7;
        font-size: 1em;
    }
    div{
        display:flex;
        justify-content: space-between;
    }
    section{
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        font-size: 1.3rem;
        gap: 12px;
    }
`
export const StylesForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5em;
`
