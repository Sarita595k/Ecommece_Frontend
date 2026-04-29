import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
    // 1. Array of banner data
    const slides = [
        {
            id: 1,
            image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1600",
            title: "Zenith X1 Pro",
            subtitle: "Aerospace Aluminum Body. Teal OLED Display.",
        },
        {
            id: 2,
            image: "https://images.pexels.com/photos/163143/pexels-photo-163143.jpeg?auto=compress&cs=tinysrgb&w=1600",
            title: "Modern Interior",
            subtitle: "Curated Furniture for the Elite Workspace.",
        },
        {
            id: 3,
            image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1600",
            title: "QuietComfort",
            subtitle: "World-Class Noise Cancelling Headphones.",
        }
    ];

    // 2. State to track the current slide index
    const [currentIndex, setCurrentIndex] = useState(0);

    // 3. Functions to move slides
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // 4. Autoplay Effect (Moves slide every 5 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer); // Cleanup timer on unmount
    }, [currentIndex]);

    return (
        <div className="relative w-full h-[50vh] md:h-[75vh] group overflow-hidden bg-black">

            {/* 5. The Slides Container */}
            <div
                className="w-full h-full flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="min-w-full h-full relative">
                        {/* Background Image */}
                        <img
                            src={slide.image}
                            className="w-full h-full object-cover opacity-60"
                            alt={slide.title}
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                            <span className="text-[#008080] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                                Exclusive Collection
                            </span>
                            <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                                {slide.title}
                            </h1>
                            <p className="text-gray-300 max-w-lg mb-8 text-sm md:text-base tracking-wide">
                                {slide.subtitle}
                            </p>
                            <Link
                                to="/shop"
                                className="bg-[#006a4e] text-white px-8 py-3 font-bold text-xs uppercase tracking-widest no-underline hover:bg-[#008080] transition-all"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* 6. Navigation Arrows (Bottle Green) */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 left-5 text-white/50 hover:text-[#008080] transition-colors hidden group-hover:block"
            >
                <FaChevronLeft size={40} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 right-5 text-white/50 hover:text-[#008080] transition-colors hidden group-hover:block"
            >
                <FaChevronRight size={40} />
            </button>

            {/* 7. Bottom Dots (Teal for active) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 w-8 cursor-pointer transition-all duration-300 ${currentIndex === index ? "bg-[#008080]" : "bg-white/30"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};



export default HeroCarousel;