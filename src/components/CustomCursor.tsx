import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']");
      setHovering(isInteractive);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full border border-primary/70 mix-blend-difference transition-[width,height,opacity,transform] duration-200 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          transform: `translate(-50%, -50%) scale(${clicking ? 0.8 : 1})`,
          boxShadow: "0 0 20px hsl(var(--primary) / 0.6)",
        }}
      />
      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full bg-primary"
        style={{
          left: pos.x,
          top: pos.y,
          width: 6,
          height: 6,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 12px hsl(var(--primary))",
        }}
      />
    </>
  );
};

export default CustomCursor;
