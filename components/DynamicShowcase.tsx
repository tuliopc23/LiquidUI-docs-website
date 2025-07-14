'use client';

import { useEffect, useState } from 'react';
import { SimpleShowcase } from './SimpleShowcase';
import { StaticShowcase } from './StaticShowcase';

export default function DynamicShowcase() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <StaticShowcase />;
  }

  return <SimpleShowcase />;
}
