import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import { Settings, Save, CheckCircle2, Shield, Bell, Globe } from 'lucide-react';
import { ROUTES } from '../../routes/routeConfig';
import { SettingsLanguageCard, SettingsAccessibilityPreferences } from '../../features/settings';

export const AdminSettingsPage: React.FC = () => {
  const [jurisdiction, setJurisdiction] = useState('All India (National Directorate)');
  const [defaultWindow, setDefaultWindow] = useState('30d');
  const [criticalOutbreakThreshold, setCriticalOutbreakThreshold] = useState('15');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <Breadcrumbs
          items={[
            { label: 'Admin', href: ROUTES.ADMIN_DASHBOARD },
            { label: 'Settings', isCurrent: true },
          ]}
        />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1 flex items-center gap-2">
          <Settings className="w-7 h-7 text-primary" />
          <span>Governance &amp; Surveillance Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-0.5">
          Configure regional surveillance boundaries, default telemetry intervals, and outbreak threshold alerts.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Regional Scope */}
        <section className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-150">
            <Globe className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-neutral-900">Administrative Jurisdiction</h2>
              <p className="text-xs text-neutral-500">Default operational scope for outbreak detection</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label htmlFor="jurisdiction-select" className="font-semibold text-neutral-700 block mb-1">
                Territory Scope:
              </label>
              <select
                id="jurisdiction-select"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="All India (National Directorate)">All India (National Directorate)</option>
                <option value="Northern Wheat/Mustard Belt">Northern Wheat/Mustard Belt</option>
                <option value="Central Cotton/Soybean Belt">Central Cotton/Soybean Belt</option>
                <option value="Southern Chilli/Paddy Delta">Southern Chilli/Paddy Delta</option>
              </select>
            </div>

            <div>
              <label htmlFor="default-window-select" className="font-semibold text-neutral-700 block mb-1">
                Default Analytics Window:
              </label>
              <select
                id="default-window-select"
                value={defaultWindow}
                onChange={(e) => setDefaultWindow(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days (Recommended)</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last 1 Year</option>
              </select>
            </div>
          </div>
        </section>

        {/* Card 2: Outbreak Sensitivity */}
        <section className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-150">
            <Bell className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-base font-bold text-neutral-900">Outbreak Sensitivity Thresholds</h2>
              <p className="text-xs text-neutral-500">Surge trigger parameters for regional epidemic alerts</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label htmlFor="threshold-input" className="font-semibold text-neutral-700 block mb-1">
                Minimum Cluster Cases for High Severity Flag:
              </label>
              <input
                id="threshold-input"
                type="number"
                min="5"
                max="100"
                value={criticalOutbreakThreshold}
                onChange={(e) => setCriticalOutbreakThreshold(e.target.value)}
                className="w-48 px-3 py-2 rounded-lg border border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Districts with case volume exceeding this threshold in a 7-day period generate an automated directorate alert.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
              <input
                id="emailAlerts"
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-neutral-300 focus:ring-primary"
              />
              <label htmlFor="emailAlerts" className="text-xs font-semibold text-neutral-800">
                Dispatch high-priority email alerts to state agricultural commissioners
              </label>
            </div>
          </div>
        </section>

        {/* Card 3: Security & Privacy */}
        <section className="p-5 rounded-card bg-white border border-neutral-200 shadow-2xs space-y-2 text-xs text-neutral-600">
          <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Data Protection &amp; Secret Isolation</span>
          </div>
          <p>
            Backend secrets, database credentials, and Groq API tokens remain strictly isolated on the server environment. Frontend interfaces operate in zero-trust governance mode.
          </p>
        </section>

        {/* Global Language Preferences */}
        <SettingsLanguageCard />

        {/* Accessibility & Display Preferences */}
        <SettingsAccessibilityPreferences />

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Governance Preferences
          </Button>

          {saved && (
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings successfully updated</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
