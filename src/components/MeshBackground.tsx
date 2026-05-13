// MeshBackground — all animations are pure CSS (see index.css).
// No framer-motion here means JS is 100% uninvolved with these animations.
// They run on the GPU compositor thread, which is free and always smooth.
export default function MeshBackground() {
  return (
    <div
      aria-hidden="true"
      className="mesh-bg fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="mesh-blob mesh-blob--orange" />
      <div className="mesh-blob mesh-blob--purple" />
      <div className="mesh-blob mesh-blob--blue" />
      <div className="mesh-blob mesh-blob--rose" />
      <div className="mesh-noise" />
    </div>
  );
}

