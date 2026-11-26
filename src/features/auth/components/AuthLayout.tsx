import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sprout, Sparkles, HelpCircle, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  alternateAction?: {
    text: string;
    linkText: string;
    to: string;
  };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  alternateAction,
}) => {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col font-serif selection:bg-primary-subtle selection:text-primary-dark">
      {/* Top minimal bar */}
      <header className="w-full bg-white border-b-2 border-[#172117] px-4 py-3 sm:px-6 shadow-neo-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 group text-[#172117] hover:text-[#2E7D32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#172117] rounded p-1"
          >
            <div className="w-9 h-9 rounded-md bg-[#E8F5E9] border-2 border-[#172117] shadow-[2px_2px_0px_#172117] flex items-center justify-center text-[#2E7D32]">
              <Sprout className="w-5 h-5 text-[#2E7D32]" />
            </div>
            <div>
              <span className="font-serif font-black text-lg tracking-tight text-[#172117] block leading-none">
                Agri Rakshak
              </span>
              <span className="text-[11px] text-[#496274] font-bold block leading-tight mt-0.5">
                AI Crop Health &amp; Surveillance
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#172117] hover:text-[#2E7D32] px-3 py-1.5 rounded-md border-2 border-[#172117] shadow-[2px_2px_0px_#172117] bg-white active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main split content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white rounded-md border-3 border-[#172117] shadow-neo-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          {/* Left Brand Panel (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 bg-[#1B5E20] border-r-2 border-[#172117] text-white p-8 flex-col justify-between relative overflow-hidden">
            {/* Top section */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8F5E9] border-2 border-[#172117] text-xs font-bold text-[#1B5E20] shadow-[2px_2px_0px_#172117] mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>SIH 2026 Initiative (SIH26131)</span>
              </div>
              <h2 className="text-2xl font-black leading-tight mb-3 text-white">
                Protecting Every Field With AI &amp; Timely Action
              </h2>
              <p className="text-[#C8E6C9] text-sm leading-relaxed font-medium">
                Connect directly with agricultural extension officers, diagnose crop afflictions instantly, and track regional advisory alerts.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="relative z-10 space-y-4 my-8">
              <div className="flex items-start gap-3 bg-[#2E7D32] p-3.5 rounded-md border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
                <ShieldCheck className="w-5 h-5 text-accent-light shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-accent-light">
                    Verified Surveillance
                  </div>
                  <div className="text-xs text-white font-medium">
                    Official officer review with government-backed agronomic guidance.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#2E7D32] p-3.5 rounded-md border-2 border-[#172117] shadow-[2px_2px_0px_#172117]">
                <Sprout className="w-5 h-5 text-accent-light shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-accent-light">
                    Kisan First Architecture
                  </div>
                  <div className="text-xs text-white font-medium">
                    High contrast, multilingual-ready, accessible for Indian rural farming communities.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Support Callout */}
            <div className="relative z-10 pt-4 border-t-2 border-[#172117] flex items-center justify-between text-xs text-[#C8E6C9] font-bold">
              <span>National Kisan Portal 1551</span>
              <span className="text-white">100% Free &amp; Open Access</span>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="w-full max-w-md mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-[#172117] tracking-tight">
                  {title}
                </h1>
                <p className="text-sm text-[#496274] font-medium mt-1.5">{subtitle}</p>
              </div>

              {/* Form Content */}
              {children}

              {/* Alternate navigation */}
              {alternateAction && (
                <div className="mt-6 pt-5 border-t-2 border-[#172117] text-center">
                  <p className="text-sm text-[#496274] font-medium">
                    {alternateAction.text}{' '}
                    <Link
                      to={alternateAction.to}
                      className="font-bold text-[#2E7D32] hover:text-[#1B5E20] underline"
                    >
                      {alternateAction.linkText}
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Bottom farmer support footer */}
            <div className="w-full max-w-md mx-auto mt-6 pt-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#496274] font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-[#172117]" />
                <span>Need assistance? Contact Kisan Call Centre at 1800-180-1551</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
