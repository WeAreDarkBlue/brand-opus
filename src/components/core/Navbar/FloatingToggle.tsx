import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function FloatingToggle({ onClick }: { onClick: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const topBarRef = useRef<HTMLSpanElement>(null);
  const bottomBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!topBarRef.current || !bottomBarRef.current) return;

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });

    if (open) {
      tl.to(topBarRef.current, {
        rotation: 45,
        y: 0,
        backgroundColor: "#000",
      }).to(
        bottomBarRef.current,
        {
          rotation: -45,
          y: 0,
          backgroundColor: "#000",
        },
        "<"
      );
    } else {
      tl.to(topBarRef.current, {
        rotation: 0,
        y: -6,
        backgroundColor: "#fff",
      }).to(
        bottomBarRef.current,
        {
          rotation: 0,
          y: 6,
          backgroundColor: "#fff",
        },
        "<"
      );
    }
  }, [open]);

  if (!mounted) return null;

  const handleClick = () => {
    setOpen((prev) => !prev);
    onClick();
  };

  return createPortal(
    <button
      onClick={handleClick}
      className="fixed top-[12px] right-5 z-[9999] w-10 h-10 flex items-center justify-center pointer-events-auto"
    >
      <div className="relative w-8 h-8">
        <span
          ref={topBarRef}
          className="absolute top-1/2 left-0 w-8 h-[3px] bg-white origin-center -translate-y-[6px]"
        ></span>
        <span
          ref={bottomBarRef}
          className="absolute top-1/2 left-0 w-8 h-[3px] bg-white origin-center translate-y-[6px]"
        ></span>
      </div>
    </button>,
    document.body
  );
}
