import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import TargetAudience from './/components/TargetAudience';
import Calculator from './components/Calculator';
import CallToAction from './components/CallToAction';
import Testimonials from './components/Testimonials';
import RegistrationForm from './components/RegistrationForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <TargetAudience />
        <HowItWorks />
        <Calculator />
        <CallToAction />
        <Testimonials />
        <RegistrationForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
