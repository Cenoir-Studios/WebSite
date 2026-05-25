import { useState, useEffect } from 'react';

const EXTS = ['png', 'jpg'];

interface Props {
  photo: string;
  initials: string;
}

export default function TeamAvatar({ photo, initials }: Props) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    let i = 0;
    let cancelled = false;

    function attempt() {
      if (i >= EXTS.length || cancelled) return;
      const url = `./assets/Team/${photo}.${EXTS[i++]}`;
      const img = new Image();
      img.onload = () => {
        if (!cancelled && img.naturalWidth > 0) setImgSrc(url);
      };
      img.onerror = () => { if (!cancelled) attempt(); };
      try { img.src = url; } catch { attempt(); }
    }

    attempt();
    return () => { cancelled = true; };
  }, [photo]);

  return (
    <div className="team-avatar">
      {imgSrc
        ? <img src={imgSrc} alt={photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <div className="team-avatar-placeholder">{initials}</div>}
    </div>
  );
}
