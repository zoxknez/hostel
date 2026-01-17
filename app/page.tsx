import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Rooms from "@/components/Rooms";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <Rooms />
      <Testimonials />
      <Gallery />
      <Location />
      <Footer />
    </main>
  );
}
