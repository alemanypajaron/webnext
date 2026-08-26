'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const MURCIA: [number, number] = [37.9861, -1.1303];

export default function MurciaMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let map: import('leaflet').Map | undefined;
    let cancelled = false;

    const init = async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView(MURCIA, 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      const pin = L.divIcon({
        className: 'murcia-map-pin',
        html: '<span class="murcia-map-pin-dot"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      L.marker(MURCIA, { icon: pin, title: 'Murcia' }).addTo(map);
    };

    void init();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="murcia-map w-full h-[360px] lg:h-[480px]"
      role="img"
      aria-label="Mapa de Murcia, zona de trabajo de Alemán y Pajarón"
    />
  );
}
