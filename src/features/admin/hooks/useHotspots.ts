import { useState, useEffect, useCallback } from 'react';
import { Hotspot, OutbreakAlert } from '../../../types/analytics';
import { hotspotService } from '../services/hotspotService';

export const useHotspots = () => {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [alerts, setAlerts] = useState<OutbreakAlert[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    hotspotService
      .getHotspots()
      .then((res) => {
        if (isMounted) {
          setHotspots(res.hotspots);
          setAlerts(res.alerts);
          if (res.hotspots.length > 0) {
            setSelectedHotspot(res.hotspots[0]);
          }
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Unable to load outbreak hotspot surveillance.';
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshHotspots = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await hotspotService.getHotspots();
      setHotspots(res.hotspots);
      setAlerts(res.alerts);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to refresh hotspot surveillance.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    hotspots,
    alerts,
    selectedHotspot,
    setSelectedHotspot,
    isLoading,
    error,
    refreshHotspots,
  };
};

export default useHotspots;
