
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

export default function Home() {
  return (
    <main className="relative font-sans">
      {/* Supergradiente contínuo por trás de todas as seções */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-1/5 h-4/5 w-4/5 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-2/5 h-3/5 w-3/5 translate-x-1/4 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute left-0 top-3/5 h-7/10 w-7/10 -translate-x-1/4 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-4/5 h-3/5 w-9/10 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
      </div>
      
      <Hero />
      <About />
      <Services />
      <ContactUs />
      <Footer />
    </main>
  );
}
