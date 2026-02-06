import type { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  concept: string;
  children: ReactNode; // The visual component
}

export default function PageLayout({ title, subtitle, concept, children }: PageLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-medium text-main leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-columbia mt-2">{subtitle}</p>
        )}
      </div>

      {/* Concept */}
      <div className="mb-8">
        <p className="text-lg leading-relaxed text-main max-w-2xl">
          {concept}
        </p>
      </div>

      {/* Visual */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {children}
        </div>
      </div>
    </div>
  );
}
