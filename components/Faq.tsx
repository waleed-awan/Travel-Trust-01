"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuestionCircle } from "react-icons/fa";

export default function FAQ() {
  return (
    <section  className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
      {/* Left Side Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <p className="text-yellow-500 font-semibold">FAQ&apos;S</p>
        <h2 className="text-3xl font-bold mt-2">
          General <span className="text-yellow-500">Frequently</span> Asked Questions
        </h2>
        <p className="text-gray-500 mt-4">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even.
        </p>
        <Image
        width={300}
        height={300} 
          src="/FAQ.jpg" // Replace with your actual image path
          alt="FAQ"
          className="mt-6 rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Right Side Accordion */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-1/2 space-y-4 "
      >
        <Accordion type="single" collapsible className="w-full space-y-2">
          {[
            "How Long Does A Booking Take ?",
            "How Can I Become A Member ?",
            "What Payment Gateway You Support ?",
            "How Can I Cancel My Request ?"
          ].map((question, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white shadow-md rounded-lg overflow-hidden">
              <AccordionTrigger className="flex items-center gap-3 px-4 py-3 text-lg cursor-pointer font-semibold">
                <span className="bg-yellow-400 text-white p-2 rounded-full">
                  <FaQuestionCircle />
                </span>
                {question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
