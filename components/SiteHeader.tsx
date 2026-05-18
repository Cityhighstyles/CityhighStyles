"use client";

import Link from 'next/link';
import React from 'react';

interface Breadcrumb {
  href: string;
  label: string;
}

export default function SiteHeader({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}) {
  return (
    <header className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="text-sm text-gray-600 mb-2">
          {breadcrumbs.map((b, i) => (
            <span key={b.href}>
              <Link href={b.href} className="hover:text-gray-900">
                {b.label}
              </Link>
              {i < breadcrumbs.length - 1 && ' / '}
            </span>
          ))}
        </nav>
      )}

      <div className="flex items-baseline justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}
