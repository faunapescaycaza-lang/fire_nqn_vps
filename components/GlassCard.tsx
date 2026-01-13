import React from 'react';

interface GlassCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date?: Date;
  onClick?: () => void;
}

export default function GlassCard({ title, description, imageUrl, date, onClick }: GlassCardProps) {
  return (
    <div 
      onClick={onClick}
      className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all cursor-pointer h-full flex flex-col"
    >
      <div className="relative h-48 w-full shrink-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {date && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] text-white font-medium">
            {new Date(date).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-slate-400 text-xs line-clamp-2 mb-2">{description}</p>
      </div>
    </div>
  );
}
