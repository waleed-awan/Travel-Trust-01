import AboutSection from "@/components/about-section";
import BookYourCab from "@/components/BookYourCab";
import ExpertDrivers from "@/components/expert-driver";
import FAQ from "@/components/Faq";
import FeaturesSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/hero-section";
import { MainNav } from "@/components/main-nav";
import ServicesSection from "@/components/services-section";
import TaxiListing from "@/components/taxi-listing";
import WhyChooseUs from "@/components/WhyChooseUs";
import React from "react";

const page = () => {
  return (
    <div>
      <MainNav/>
      <HeroSection />
      <AboutSection />
      <ServicesSection/>
      <TaxiListing/>
      <FeaturesSection/>
      <ExpertDrivers/>
      <WhyChooseUs/>
      <BookYourCab/>
      <FAQ/>
      <Footer/>
    </div>
  );
};

export default page;
