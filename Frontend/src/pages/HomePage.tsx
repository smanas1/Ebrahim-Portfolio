import { Suspense, lazy } from "react";
import HeroSkeleton from "../components/home/HeroSkeleton";
import AboutMeSkeleton from "../components/home/AboutMeSkeleton";
import HowItWorksSkeleton from "../components/home/HowItWorksSkeleton";
import ServicesSkeleton from "../components/home/ServicesSkeleton";
import PartnersSkeleton from "../components/home/PartnersSkeleton";

import ContactSkeleton from "../components/home/ContactSkeleton";
import WhyChooseMeSkeleton from "../components/home/WhyChooseMeSkeleton";
import GlobalReachSkeleton from "../components/home/GlobalReachSkeleton";
import YouTubeSectionSkeleton from "../components/home/YouTubeSectionSkeleton";

// Lazy load components for better performance
const Hero = lazy(() => import("../components/home/Hero"));
const AboutMe = lazy(() => import("@/components/home/AboutMe"));
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

// Main HomePage Component
const HomePage = () => {
  return (
    <div className="">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<AboutMeSkeleton />}>
        <AboutMe />
      </Suspense>
      <Suspense fallback={<HowItWorksSkeleton />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<WhyChooseMeSkeleton />}>
        <WhyChooseMe />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<PartnersSkeleton />}>
        <Partners />
        <CTA />
      </Suspense>
      <Suspense fallback={<GlobalReachSkeleton />}>
        <GlobalReach />
        <Testimonials />
      </Suspense>
      <Suspense fallback={<YouTubeSectionSkeleton />}>
        <YouTubeSection />
        <Blog />
      </Suspense>
      <Suspense fallback={<ContactSkeleton />}>
        <Contact />
        <FloatingCallButton />
      </Suspense>
    </div>
  );
};

export default HomePage;
