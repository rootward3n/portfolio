import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { AISection } from "@/components/ai/AISection";
import { CybersecuritySection } from "@/components/cybersecurity/CybersecuritySection";
import { DevelopmentSection } from "@/components/development/DevelopmentSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { GitHubSection } from "@/components/github/GitHubSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <AISection />
      <CybersecuritySection />
      <DevelopmentSection />
      <SkillsSection />
      <ProjectsSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </>
  );
}