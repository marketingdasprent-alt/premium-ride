import { useEffect, useRef, useState } from 'react';
import type { ReactNode, CSSProperties, MouseEvent, WheelEvent, TransitionEvent } from 'react';

const chapters = [
  { id: 'inicio', label: 'Apresentação' },
  { id: 'experiencia', label: 'A experiência' },
  { id: 'viagem', label: 'A sua viagem' },
  { id: 'contactos', label: 'Contactos' },
];
const fromHash = () => Math.max(0, chapters.findIndex(item => `#${item.id}` === window.location.hash));

export default function HorizontalExperience({ header, panels }: { header: ReactNode; panels: ReactNode[] }) {
  const [active, setActive] = useState(fromHash);
  const [entered, setEntered] = useState<number | null>(null);
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const focusNext = useRef(false);
  const activeRef = useRef(active);
  const transitioning = useRef(false);
  const wheelTotal = useRef(0);
  const wheelQuiet = useRef(true);
  const transitionDone = useRef(true);
  const wheelEnd = useRef<number | undefined>(undefined);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setEntered(active));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [active]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const resize = () => setDesktop(media.matches);
    const hash = () => {
      if (media.matches) { transitioning.current = true; transitionDone.current = false; }
      focusNext.current = true;
      setEntered(null);
      setActive(fromHash());
    };
    media.addEventListener('change', resize);
    window.addEventListener('hashchange', hash);
    window.addEventListener('popstate', hash);
    return () => { media.removeEventListener('change', resize); window.removeEventListener('hashchange', hash); window.removeEventListener('popstate', hash); };
  }, []);

  useEffect(() => () => window.clearTimeout(wheelEnd.current), []);

  function go(index: number) {
    if (index < 0 || index >= chapters.length) return;
    if (index === activeRef.current) return;
    if (desktop && transitioning.current) return;
    if (desktop) {
      transitioning.current = true;
      transitionDone.current = false;
    }
    window.history.pushState(null, '', `#${chapters[index].id}`);
    focusNext.current = true;
    setEntered(null);
    setActive(index);
  }

  function canScrollVertically(target: HTMLElement, direction: number) {
    const panel = panelRefs.current[activeRef.current];
    for (let node: HTMLElement | null = target; node && panel?.contains(node); node = node.parentElement) {
      const style = window.getComputedStyle(node);
      const scrollable = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1;
      if (scrollable && (direction > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 1)) return true;
      if (node === panel) break;
    }
    return false;
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (!desktop || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const direction = Math.sign(event.deltaY);
    if (!direction || canScrollVertically(event.target as HTMLElement, direction)) { wheelTotal.current = 0; return; }
    event.preventDefault();
    wheelQuiet.current = false;
    window.clearTimeout(wheelEnd.current);
    wheelEnd.current = window.setTimeout(() => {
      wheelQuiet.current = true;
      wheelTotal.current = 0;
      if (transitionDone.current) transitioning.current = false;
    }, 180);
    if (transitioning.current) return;
    wheelTotal.current = Math.sign(wheelTotal.current) === direction ? wheelTotal.current + event.deltaY : event.deltaY;
    if (Math.abs(wheelTotal.current) < 48) return;
    wheelTotal.current = 0;
    go(activeRef.current + direction);
  }

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    transitionDone.current = true;
    if (wheelQuiet.current) transitioning.current = false;
  }

  useEffect(() => {
    if (desktop && focusNext.current) panelRefs.current[active]?.focus({ preventScroll: true });
    focusNext.current = false;
  }, [active, desktop]);

  function handleLink(event: MouseEvent<HTMLDivElement>) {
    if (!desktop || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement).closest('a');
    const href = anchor?.getAttribute('href');
    const index = chapters.findIndex(item => `#${item.id}` === href);
    if (index < 0) return;
    event.preventDefault();
    go(index);
  }

  return <div className="ride-site" onClick={handleLink} onWheel={handleWheel} onKeyDown={event => {
    if (!desktop || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || (event.target as HTMLElement).closest('input, textarea, select, button, a, summary, [contenteditable="true"]')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(active + (event.key === 'ArrowRight' ? 1 : -1)); }
  }} style={{ '--chapter-index': active } as CSSProperties}>
    {header}
    <main id="main-content" className="chapter-stage" tabIndex={-1}>
      <div className="chapter-track" onTransitionEnd={handleTransitionEnd}>{panels.map((panel, index) => <div key={chapters[index].id} id={index === 0 ? 'inicio' : undefined} ref={node => { panelRefs.current[index] = node; }} className={`chapter chapter--${chapters[index].id}${index < active ? ' is-before' : index > active ? ' is-after' : ' is-active'}${entered === index ? ' is-entered' : ''}`} role="region" aria-label={chapters[index].label} inert={desktop && active !== index} aria-hidden={desktop && active !== index ? true : undefined} tabIndex={-1}>{panel}</div>)}</div>
    </main>
    <nav className="chapter-navigation" aria-label="Navegação entre secções">
      {active > 0 && <button className="chapter-arrow chapter-arrow--previous" type="button" onClick={() => go(active - 1)} aria-label="Secção anterior"><span aria-hidden="true">←</span></button>}
      {active < chapters.length - 1 && <button className="chapter-arrow chapter-arrow--next" type="button" onClick={() => go(active + 1)} aria-label="Próxima secção"><span aria-hidden="true">→</span></button>}
      <span className="visually-hidden" aria-live="polite">{chapters[active].label}</span>
    </nav>
  </div>;
}

