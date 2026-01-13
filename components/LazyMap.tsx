"use client";

import dynamic from 'next/dynamic';

const DetailMap = dynamic(() => import('./DetailMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-800 animate-pulse rounded-xl"></div>
});

interface LazyMapProps {
  lat: number;
  lng: number;
  title: string;
}

export default function LazyMap(props: LazyMapProps) {
  return <DetailMap {...props} />;
}
