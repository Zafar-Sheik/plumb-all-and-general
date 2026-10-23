import { Navbar } from "@/components/navbar";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { Hero } from "@/components/sections/hero";
import { Sectors } from "@/components/sections/sectors";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { WhyUs } from "@/components/sections/why-us";
import { Coverage } from "@/components/sections/coverage";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Sectors />
        <Manifesto />
        <Services />
        <Process />
        <WhyUs />
        <Coverage />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
