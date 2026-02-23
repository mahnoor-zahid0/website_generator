'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/user/Navbar';
import Hero from '@/components/user/Hero';
import Features from '@/components/user/Features';
import Pricing from '@/components/user/Pricing';
import Footer from '@/components/user/Footer';
import TemplateGrid from '@/components/user/TemplateGrid';
import UniverseBackground from '@/components/user/UniverseBackground';
import VirtualSection from '@/components/user/VirtualSection';
import HowItWorks from '@/components/user/HowItWorks';
import GeneratorForm from '@/components/user/GeneratorForm';
import DashboardPreview from '@/components/user/DashboardPreview';

export default function HomePage() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`/api/templates`);
        const data = await response.json();
        setTemplates(data.templates || []);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-accent-cyan/30">
      <UniverseBackground />
      <Navbar />

      <main className="relative z-10 w-full">
        {/* Full Height Hero */}
        <VirtualSection fullHeight={true} type="zoom">
          <Hero />
        </VirtualSection>

        {/* How It Works Layer */}
        <VirtualSection type="slide">
          <HowItWorks />
        </VirtualSection>

        {/* Features / Capabilities */}
        <VirtualSection type="focus">
          <Features />
        </VirtualSection>

        {/* Generator Form Slab */}
        <VirtualSection type="zoom">
          <GeneratorForm />
        </VirtualSection>

        {/* Templates Grid with Parallax */}
        <VirtualSection className="py-24" type="zoom">
          <div className="w-full">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-accent-cyan/20 border-t-accent-cyan rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 text-lg">Initializing System...</p>
              </div>
            ) : (
              <TemplateGrid templates={templates} />
            )}
          </div>
        </VirtualSection>

        {/* Pricing Matrix */}
        <VirtualSection type="focus">
          <Pricing />
        </VirtualSection>

        {/* Dashboard Scale Preview */}
        <VirtualSection type="slide">
          <DashboardPreview />
        </VirtualSection>

        {/* Comprehensive Footer */}
        <VirtualSection type="focus" className="py-0">
          <Footer />
        </VirtualSection>
      </main>
    </div>
  );
}
