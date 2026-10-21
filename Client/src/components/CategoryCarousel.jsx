import React, { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"


const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cyber Security",
]

function CategoryCarousel() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }


    return (
        <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{}}
        >
            <Carousel className="w-full max-w-[260px] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto my-10" opts={{ align: "start", dragFree: true }}>
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-auto">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full cursor-pointer whitespace-nowrap hover:bg-accent transition-colors">
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </motion.div>
    )
}

export default CategoryCarousel