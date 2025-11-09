import { Suspense, lazy, useState, useEffect } from "react";
import HeroSkeleton from "../components/home/HeroSkeleton";
import AboutMeSkeleton from "../components/home/AboutMeSkeleton";
import HowItWorksSkeleton from "../components/home/HowItWorksSkeleton";
import ServicesSkeleton from "../components/home/ServicesSkeleton";
import PartnersSkeleton from "../components/home/PartnersSkeleton";
import ContactSkeleton from "../components/home/ContactSkeleton";
import WhyChooseMeSkeleton from "../components/home/WhyChooseMeSkeleton";
import GlobalReachSkeleton from "../components/home/GlobalReachSkeleton";
import YouTubeSectionSkeleton from "../components/home/YouTubeSectionSkeleton";
import CTASkeleton from "../components/home/CTASkeleton";
import TestimonialsSkeleton from "../components/home/TestimonialsSkeleton";
import BlogSkeleton from "../components/home/BlogSkeleton";

// Lazy load all components to optimize initial page load
const Hero = lazy(() => import("../components/home/Hero"));
const AboutMe = lazy(() => import("../components/home/AboutMe"));
const HowItWorks = lazy(() => import("../components/home/HowItWorks"));
const WhyChooseMe = lazy(() => import("../components/home/WhyChooseMe"));
const Services = lazy(() => import("../components/home/Services"));
const Partners = lazy(() => import("../components/home/Partners"));
const CTA = lazy(() => import("../components/home/CTA"));
const GlobalReach = lazy(() => import("@/components/home/GlobalReach"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const YouTubeSection = lazy(() => import("../components/home/YouTubeSection"));
const Blog = lazy(() => import("../components/home/Blog"));
const Contact = lazy(() => import("../components/home/Contact"));
const FloatingCallButton = lazy(
  () => import("../components/home/FloatingCallButton")
);

// Performance-optimized HomePage Component
const HomePage = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Preload critical components when component mounts
  useEffect(() => {
    const preloadComponents = async () => {
      // Preload the Hero component
      import("../components/home/Hero").then(() => setHeroLoaded(true));
    };
    
    preloadComponents();
  }, []);

  return (
    <div className="">
      {/* Critical sections with optimized loading */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<AboutMeSkeleton />}>
        <AboutMe />
      </Suspense>
      
      <Suspense fallback={<HowItWorksSkeleton />}>
        <HowItWorks />
      </Suspense>
      
      {/* Less critical sections that load as user scrolls */}
      <Suspense fallback={<WhyChooseMeSkeleton />}>
        <WhyChooseMe />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<PartnersSkeleton />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<CTASkeleton />}>
        <CTA />
      </Suspense>
      <Suspense fallback={<GlobalReachSkeleton />}>
        <GlobalReach />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<YouTubeSectionSkeleton />}>
        <YouTubeSection />
      </Suspense>
      <Suspense fallback={<BlogSkeleton />}>
        <Blog />
      </Suspense>
      <Suspense fallback={<ContactSkeleton />}>
        <Contact />
      </Suspense>
      
      <FloatingCallButton />
    </div>
  );
};

export default HomePage;
