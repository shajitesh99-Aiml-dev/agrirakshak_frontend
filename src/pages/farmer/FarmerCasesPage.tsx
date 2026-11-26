import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderOpen,
  Plus,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Search,
} from 'lucide-react';
import { Breadcrumbs, BreadcrumbItem } from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import Badge, { BadgeVariant } from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import { ROUTES } from '../../routes/routeConfig';
import { CropCase } from '../../types';
import { devCases } from '../../features/cases/devCases';
import { getLocalizedCropName } from '../../features/cases/data/cropOptions';
import { useI18n } from '../../i18n';

export const FarmerCasesPage: React.FC = () => {
  const { t, language, formatDate } = useI18n();
  const [cases, setCases] = useState<CropCase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    async function loadCases() {
      setIsLoading(true);
      try {
        const list = await devCases.getAllMockCases();
        setCases(list);
      } finally {
        setIsLoading(false);
      }
    }
    loadCases();
  }, []);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('nav.home'), href: ROUTES.FARMER_DASHBOARD },
    { label: t('nav.myCases'), isCurrent: true },
  ];

  const getStatusBadge = (status: string): { variant: BadgeVariant; label: string; icon: React.ReactNode } => {
    switch (status) {
      case 'resolved':
        return {
          variant: 'success',
          label: t('statusLabels.resolved'),
          icon: <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'analyzing':
        return {
          variant: 'warning',
          label: t('statusLabels.analyzing'),
          icon: <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'under_review':
        return {
          variant: 'info',
          label: t('statusLabels.under_review'),
          icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'escalated':
        return {
          variant: 'error',
          label: t('statusLabels.escalated'),
          icon: <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />,
        };
      case 'pending':
      default:
        return {
          variant: 'neutral',
          label: t('statusLabels.pending'),
          icon: <Clock className="w-3.5 h-3.5" aria-hidden="true" />,
        };
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.prediction && c.prediction.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-neutral-50/50 py-8 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="w-6 h-6 text-primary" aria-hidden="true" />
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                {t('nav.myCases')}
              </h1>
            </div>
            <p className="text-sm text-neutral-600 font-sans">
              {t('farmer.tasksTitle')}
            </p>
          </div>

          <Link to={ROUTES.FARMER_REPORT}>
            <Button variant="primary" size="md" className="gap-2 shadow-xs shrink-0 w-full sm:w-auto">
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{t('farmer.reportProblemBtn')}</span>
            </Button>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label={t('common.status')}
              className="px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-primary transition-all cursor-pointer"
            >
              <option value="all">{t('common.all')}</option>
              <option value="pending">{t('statusLabels.pending')}</option>
              <option value="analyzing">{t('statusLabels.analyzing')}</option>
              <option value="under_review">{t('statusLabels.under_review')}</option>
              <option value="resolved">{t('statusLabels.resolved')}</option>
            </select>
          </div>
        </div>

        {/* Cases List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-5 bg-white rounded-card border border-neutral-200 space-y-2">
                <Skeleton variant="rectangular" height={20} width="30%" />
                <Skeleton variant="text" width="60%" />
              </div>
            ))}
          </div>
        ) : filteredCases.length > 0 ? (
          <div className="space-y-3.5">
            {filteredCases.map((c) => {
              const badge = getStatusBadge(c.status);
              const cropDisplay = getLocalizedCropName(c.cropName, language);
              return (
                <div
                  key={c.id}
                  className="p-5 bg-white rounded-card border border-neutral-200 shadow-2xs hover:border-primary/40 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                        #{c.id}
                      </span>
                      <Badge variant={badge.variant} size="sm" className="gap-1 font-semibold text-xs">
                        {badge.icon}
                        <span>{badge.label}</span>
                      </Badge>
                      {c.prediction && (
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          <span>AI: {c.prediction.diseaseName}</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">
                      {cropDisplay || c.cropName}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-sans">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(c.reportedAt)}</span>
                      </span>
                      {c.village && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{c.village}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    <Link to={`/farmer/cases/${c.id}`} className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto gap-1 text-xs hover:border-primary hover:text-primary"
                      >
                        <span>{t('common.details')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-card border border-neutral-200 space-y-3">
            <FolderOpen className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-base font-bold text-neutral-800">
              {t('farmer.noCasesYet')}
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto font-sans">
              {t('farmer.reportFirstCase')}
            </p>
            <div className="pt-2">
              <Link to={ROUTES.FARMER_REPORT}>
                <Button variant="primary" size="sm">
                  {t('farmer.reportProblemBtn')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerCasesPage;
