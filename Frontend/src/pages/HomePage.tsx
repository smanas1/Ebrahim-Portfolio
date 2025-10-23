import Hero from "../components/home/Hero";
import AboutMe from "../components/home/AboutMe";
import HowItWorks from "../components/home/HowItWorks";
import WhyChooseMe from "../components/home/WhyChooseMe";
import Services from "../components/home/Services";
import Partners from "../components/home/Partners";
import CTA from "../components/home/CTA";
import GlobalReach from "../components/home/GlobalReach";
import Testimonials from "../components/home/Testimonials";
import YouTubeSection from "../components/home/YouTubeSection";
import Blog from "../components/home/Blog";
import Contact from "../components/home/Contact";
import FloatingCallButton from "../components/home/FloatingCallButton";

// Main HomePage Component
const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutMe />
      <HowItWorks />
      <WhyChooseMe />
      <Services />
      <Partners />
      <CTA />
      <GlobalReach />
      <Testimonials />
      <YouTubeSection />
      <Blog />
      <Contact />
      <FloatingCallButton />
    </>
  );
};

export default HomePage;