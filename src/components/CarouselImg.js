import { Carousel } from 'antd'
import React from 'react'
import { StylesDivCarousel, StylesImgCarousel } from '../styles/GlobalStyled'

const CarouselImg = () => {
    return (
        <StylesDivCarousel>
            <Carousel autoplay>
                <StylesDivCarousel>
                    <StylesImgCarousel src="https://i.ibb.co/qB2YnWT/Promo1.png" alt='image1'/>
                </StylesDivCarousel>
                <StylesDivCarousel>
                    <StylesImgCarousel src='https://dam.cocinafacil.com.mx/wp-content/uploads/2021/08/sopas-gourmet.jpg' alt='image2'/>
                </StylesDivCarousel>
                
            </Carousel>
        </StylesDivCarousel>
    )
}

export default CarouselImg