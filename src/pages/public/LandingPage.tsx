import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  Camera,
  FolderOpen,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  VideoOff,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  PageTitle,
  SectionHeading,
  BodyText,
  Badge,
  Button,
  Container,
} from '../../components/ui';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ROUTES } from '../../routes/routeConfig';

export const LandingPage: React.FC = () => {
  usePageTitle('Agri Rakshak | AI-Assisted Crop Disease & Pest Detection');

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Listen for prefers-reduced-motion OS preference updates
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Control video playback based on reduced-motion preferences
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Handled silently by browser autoplay policies
      });
    }
  }, [prefersReducedMotion]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div className="font-serif">
      {/* 1. FULL-WIDTH HERO SECTION (100% Viewport Width, Edge-to-Edge Video) */}
      <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden border-b-3 border-[#172117] bg-[#F5FAF3] py-14 sm:py-20 px-4 sm:px-6">
        {/* Animated 3D Crop Transformation Video Background (Spans 100% of Viewport) */}
        {!videoError && !prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-opacity duration-700"
          >
            <source
              src="/videos/agri-rakshak-crop-transformation.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/* Calibrated Cream & Agricultural Tint Overlay for Maximum Readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#F5FAF3]/92 via-[#F5FAF3]/80 to-[#F5FAF3]/95 pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Badge: 3D Simulation Indicator */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#E8F5E9]/95 border-2 border-[#172117] text-[#1B5E20] text-xs font-bold shadow-[2px_2px_0px_#172117] pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
          <span>3D Crop Health Cycle</span>
        </div>

        {/* Bottom Control: Accessibility Ambient Pause/Play Button */}
        {!videoError && !prefersReducedMotion && (
          <button
            type="button"
            onClick={toggleVideoPlayback}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white hover:bg-[#F5FAF3] border-2 border-[#172117] text-[#172117] text-xs font-bold shadow-[2px_2px_0px_#172117] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
            aria-label={isPlaying ? 'Pause background simulation video' : 'Play background simulation video'}
            title={isPlaying ? 'Pause background simulation' : 'Play background simulation'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#1B5E20]" />
                <span className="hidden sm:inline">Pause Video</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span className="hidden sm:inline">Play Video</span>
              </>
            )}
          </button>
        )}

        {/* Reduced Motion Active Indicator */}
        {prefersReducedMotion && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#FFF9C4] border-2 border-[#172117] text-[#8D5B00] text-xs font-bold shadow-[2px_2px_0px_#172117]">
            <VideoOff className="w-3.5 h-3.5" />
            <span>Reduced Motion Active</span>
          </div>
        )}

        {/* Foreground Hero Content (Above Video Background) */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#E8F5E9] border-2 border-[#172117] text-[#1B5E20] text-xs sm:text-sm font-black mb-5 shadow-[2px_2px_0px_#172117]">
            <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
            <span>Smart India Hackathon 2026 • Problem Statement SIH26131</span>
          </div>

          <PageTitle className="mb-3 text-3xl sm:text-5xl md:text-6xl text-[#172117] font-black tracking-tight">
            Agri Rakshak
          </PageTitle>

          <SectionHeading className="text-xl sm:text-2xl md:text-3xl text-[#1B5E20] font-black mb-5">
            AI-Assisted Crop Disease &amp; Pest Detection
          </SectionHeading>

          <BodyText size="lg" className="text-[#172117] mb-8 max-w-2xl mx-auto font-semibold text-base sm:text-lg">
            A unified agricultural case management platform connecting farmers with instant multimodal
            AI diagnosis, localized agronomic advisories, and expert triage by Agricultural Field Officers.
          </BodyText>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link to={ROUTES.FARMER_DASHBOARD}>
              <Button variant="primary" size="lg" leftIcon={<Camera className="w-5 h-5" />}>
                Farmer Portal
              </Button>
            </Link>
            <Link to={ROUTES.OFFICER_DASHBOARD}>
              <Button variant="secondary" size="lg" leftIcon={<FolderOpen className="w-5 h-5" />}>
                Officer Portal
              </Button>
            </Link>
            <Link to={ROUTES.ADMIN_DASHBOARD}>
              <Button variant="outline" size="lg" leftIcon={<Users className="w-5 h-5" />}>
                Admin Console
              </Button>
            </Link>
          </div>

          <div className="mt-7">
            <Link
              to={ROUTES.ROUTE_OVERVIEW}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] bg-white hover:bg-[#F5FAF3] border-2 border-[#172117] text-xs sm:text-sm font-black text-[#1B5E20] hover:text-[#2E7D32] shadow-[2px_2px_0px_#172117] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#172117]"
            >
              <Compass className="w-4 h-4 text-[#2E7D32]" />
              <span>Explore All 35+ Active Routes in Interactive Matrix →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT SECTION (Portal Cards & Development Status in Container) */}
      <div className="py-12 sm:py-16">
        <Container size="2xl">

        {/* Portal Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {/* Farmer Card */}
          <Card variant="interactive">
            <CardHeader>
              <div className="w-12 h-12 rounded-md bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-2 border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <CardTitle className="font-black text-[#172117]">Farmer Experience</CardTitle>
                <Badge variant="success">Kisan Seva</Badge>
              </div>
              <CardDescription className="text-[#496274]">
                Empowering smallholder farmers with mobile-first leaf diagnosis and treatments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-[#496274] font-medium">
                <li>• Instant AI crop disease identification</li>
                <li>• Step-by-step camera upload &amp; guidance</li>
                <li>• Regional SMS &amp; audio advisories</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.FARMER_DASHBOARD} className="w-full">
                <Button variant="primary" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Enter Farmer Portal
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Officer Card */}
          <Card variant="interactive">
            <CardHeader>
              <div className="w-12 h-12 rounded-md bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mb-2 border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
                <FolderOpen className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <CardTitle className="font-black text-[#172117]">Officer Triage</CardTitle>
                <Badge variant="info">Field Agronomist</Badge>
              </div>
              <CardDescription className="text-[#496274]">
                Agricultural Officer review console for verifying high-risk escalated cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-[#496274] font-medium">
                <li>• Triage queue with disease severity scoring</li>
                <li>• Regional epidemic hotspot mapping</li>
                <li>• Direct advisory prescription dispatch</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.OFFICER_DASHBOARD} className="w-full">
                <Button variant="secondary" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Enter Officer Portal
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Admin Card */}
          <Card variant="interactive">
            <CardHeader>
              <div className="w-12 h-12 rounded-md bg-[#FFF3E0] text-[#8D5B00] flex items-center justify-center mb-2 border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
                <Users className="w-6 h-6 text-[#8D5B00]" />
              </div>
              <div className="flex items-center justify-between">
                <CardTitle className="font-black text-[#172117]">Administrative Governance</CardTitle>
                <Badge variant="warning">SIH Console</Badge>
              </div>
              <CardDescription className="text-[#496274]">
                State and national oversight over AI accuracy, user roles, and outbreak containment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-sm text-[#496274] font-medium">
                <li>• AI model performance telemetry</li>
                <li>• Multi-district case monitoring</li>
                <li>• Agronomist jurisdiction management</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to={ROUTES.ADMIN_DASHBOARD} className="w-full">
                <Button variant="outline" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Enter Admin Console
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Development Status Notice */}
        <div className="max-w-4xl mx-auto p-6 rounded-md bg-white border-2 border-[#172117] shadow-neo flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-md bg-[#E8F5E9] text-[#2E7D32] border-2 border-[#172117] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#172117]">
              <Sparkles className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <div>
              <h4 className="font-serif font-black text-[#172117] text-base">
                Phase 3 Routing Architecture Active
              </h4>
              <p className="text-xs sm:text-sm text-[#496274] font-semibold">
                All 35+ routes across Public, Farmer, Officer, and Admin modules are registered and accessible.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link to={ROUTES.ROUTE_OVERVIEW}>
              <Button variant="primary" size="sm">
                Open Route Matrix
              </Button>
            </Link>
            <Link to={ROUTES.SHOWCASE}>
              <Button variant="outline" size="sm">
                UI Showcase
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      </div>
    </div>
  );
};

export default LandingPage;
