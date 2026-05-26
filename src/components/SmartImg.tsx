import { useRef, useEffect, type CSSProperties } from 'react';

const EXTS = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];

interface Props {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}

export default function SmartImg({ src, alt = '', className = '', style }: Props) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    function tryAlts() {
      const s = img!.getAttribute('src') || '';
      const dot = s.lastIndexOf('.');
      if (dot === -1) return;
      const base = s.substring(0, dot);
      const ext = s.substring(dot + 1);
      const alts = EXTS.filter(e => e !== ext);
      let j = 0;
      function next() {
        if (j >= alts.length) return;
        img!.onerror = next;
        img!.src = base + '.' + alts[j++];
      }
      next();
    }

    img.onerror = tryAlts;
    if (img.complete && img.naturalWidth === 0) tryAlts();
  }, [src]);

  return <img ref={ref} src={src} alt={alt} className={className} style={style} />;
}
