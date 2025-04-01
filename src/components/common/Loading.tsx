import Logo from '@/components/common/Logo';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loading = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(logoRef.current, { opacity: 0.1, scale: 0.95 }, { opacity: 0.4, scale: 1, duration: 0.5, ease: 'power1.inOut', repeat: -1, yoyo: true });
  }, []);

  return (
    <div ref={logoRef} className="opacity-0">
      <Logo className="w-20 h-20 relative" />
    </div>
  );
}

export default Loading;
