"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // ShadCN Button
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "WELCOME TO TAXICA!",
    heading: "BOOK TAXI FOR YOUR RIDE",
    text: "There are many variations of passages available. The majority have suffered alteration in some form. Generators on the Internet tend to repeat predefined chunks.",
    image: "/slider-1.jpg",
  },
  {
    id: 2,
    title: "ENJOY YOUR TRAVEL!",
    heading: "SAFE & RELIABLE RIDES",
    text: "Experience the best taxi services in your city. Our drivers ensure a comfortable and smooth journey. Book your ride now and enjoy premium services.",
    image: "/slider-2.jpg",
  },
  {
    id: 3,
    title: "FASTEST TAXI SERVICE!",
    heading: "REACH YOUR DESTINATION ON TIME",
    text: "Book a ride with ease and comfort. Our taxis are available 24/7 to serve you. Travel fast, safe, and in style with our professional service.",
    image: "/slider-3.jpg",
  },
];

export default function CustomCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000 })] // Auto-scroll every 4 sec
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi?.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div id="home" className="relative w-full h-screen overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full flex-none h-screen">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
              <motion.p
                className="text-yellow-400 uppercase tracking-widest"
                initial={{ y: -20, opacity: 0 }}
                animate={selectedIndex === index ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                {slide.title}
              </motion.p>

              <motion.h1
                className="text-4xl md:text-6xl font-bold mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={selectedIndex === index ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slide.heading}
              </motion.h1>

              <motion.p
                className="mt-4 text-lg max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={selectedIndex === index ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {slide.text}
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-6 flex gap-4"
                initial={{ opacity: 0 }}
                animate={selectedIndex === index ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Link href="/pages/book-your-ride">
                  <Button variant="secondary" className="px-6 py-3">
                    Book Yours Now →
                  </Button>
                </Link>
                <Link href={"/pages/Sign-Up"}>
                <Button variant="secondary" className="px-6 py-3 bg-yellow-400">
                  Become a Partner →
                </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
