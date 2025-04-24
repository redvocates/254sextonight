import Hero from "./components/Hero";
import MasseuseHome from './components/MasseuseHome'
import EscortsHome from "./components/EscortsHome";
import EventsHome from "./components/EventsHome";
import HowItWorks from "./components/HowItWorks";
import EscortRegistrationHelp from "./components/EscortRegistrationHelp";
import ReportSection from "./components/ReportSection";
import CountiesList from "./components/CountiesList";
import MasseuseEventsRegistrationHelp from "./components/MasseuseEventsRegistrationHelp";
import WelcomeOverlay from "./components/WelcomeOverlay";

export default function Home() {
  return (
    <div className="relative">
    <Hero/>
    <WelcomeOverlay/>
    <MasseuseHome/>
    <EscortsHome/>
    <EventsHome/>
    <HowItWorks/>
    <ReportSection id='report'/>
    <EscortRegistrationHelp/>
    <CountiesList/>
    <MasseuseEventsRegistrationHelp/>
    </div>
  )
}