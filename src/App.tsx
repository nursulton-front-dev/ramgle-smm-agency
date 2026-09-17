import { useState } from 'react';
import { Grain } from '@/components/ui/Grain';
import { Marquee } from '@/components/ui/Marquee';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { AIProduction } from '@/components/sections/AIProduction';
import { Services } from '@/components/sections/Services';
import { Cases } from '@/components/sections/Cases';
import { Pricing } from '@/components/sections/Pricing';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

function App() {
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <>
      <Grain />
      <Header />
      <main>
        <Hero />
        <About />
        <Marquee />
        <AIProduction />
        <Services />
        <Cases />
        <Pricing onSelectPlan={setSelectedPlan} />
        <Process />
        <Contact selectedPlan={selectedPlan} />
      </main>
      <Footer />
    </>
  );
}

export default App;
