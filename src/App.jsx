import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";

import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import CursorGlow from "./components/CursorGlow";
import Cursor from "./components/Cursor";

import TechSkills from "./components/ProjectShowcase/TechSkills";
import WorkingStyle from "./components/ProjectShowcase/WorkingStyle";
import ServicePricing from "./components/ProjectShowcase/ServicePricing";
import ClientStories from "./components/ClientStories";
function PortfolioHome() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechSkills />
      <WorkingStyle />
      <Experience />
      <Contact />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [transition, setTransition] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }

  function navigateTo(id, title, path) {
    setPageTitle(title);
    setTransition(true);

    window.setTimeout(() => {
      // Navigate to a separate page
      if (path) {
        navigate(path);
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });

        return;
      }

      // Already on portfolio homepage
      if (location.pathname === "/") {
        scrollToSection(id);
        return;
      }

      // Return from services page, then scroll
      navigate("/");

      window.setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }, 450);

    window.setTimeout(() => {
      setTransition(false);
    }, 900);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-black">
      <CursorGlow />
      <Cursor />

      <PageTransition
        show={transition}
        title={pageTitle}
      />

      <Navbar navigateTo={navigateTo} />

      <Routes>
        <Route path="/" element={<PortfolioHome />} />

        <Route
          path="/services"
          element={<ServicePricing />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
        <Route
  path="/client-stories"
  element={<ClientStories navigateTo={navigateTo} />}
/>
      </Routes>
<Footer navigateTo={navigateTo} />
      
    </div>
  );
}