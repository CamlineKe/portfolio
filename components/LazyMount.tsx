import React, { useEffect, useRef, useState } from 'react';

interface LazyMountProps {
  sectionId: string;
  children: React.ReactNode;
  rootMargin?: string;
}

const LazyMount: React.FC<LazyMountProps> = ({
  sectionId,
  children,
  rootMargin = '0px 0px 600px 0px',
}) => {
  const placeholderRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      return;
    }

    if (window.location.hash === `#${sectionId}`) {
      setMounted(true);
      return;
    }

    const node = placeholderRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    const handleHashChange = () => {
      if (window.location.hash === `#${sectionId}`) {
        setMounted(true);
        observer.disconnect();
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [mounted, rootMargin, sectionId]);

  if (mounted) {
    return <>{children}</>;
  }

  return (
    <section
      ref={placeholderRef}
      id={sectionId}
      aria-hidden="true"
      style={{ minHeight: '1px' }}
    />
  );
};

export default LazyMount;
