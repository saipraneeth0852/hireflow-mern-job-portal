import React, { useState } from 'react'
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
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto my-10 px-4">
                {category.map((cat) => (
                    <Button key={cat} onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full cursor-pointer whitespace-nowrap hover:bg-accent transition-colors">
                        {cat}
                    </Button>
                ))}
            </div>
        </motion.div>
    )
}

export default CategoryCarousel