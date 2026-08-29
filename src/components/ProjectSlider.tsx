import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects'; // adjust path to your data file
import './ProjectSlider.css';

const baseItems = Object.values(projects).flat();
// clone first few items at the end for seamless infinite loop
const CLONE_COUNT = Math.min(3, baseItems.length);
const items = [...baseItems, ...baseItems.slice(0, CLONE_COUNT)];

const PAUSE_MS = 2600;
const TRANSITION_MS = 900;

export default function ProjectSlider() {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const movedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();

  const measure = useCallback(() => {
    const first = trackRef.current?.children[0] as HTMLElement | undefined;
    if (first) {
      const style = getComputedStyle(first);
      itemWidthRef.current = first.getBoundingClientRect().width + parseFloat(style.marginRight || '0');
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!draggingRef.current) {
        setWithTransition(true);
        setIndex((i) => i + 1);
      }
    }, PAUSE_MS);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    scheduleNext();
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timeoutRef.current);
    };
  }, [measure, scheduleNext, index]);

  // when we've scrolled past the real items into the clones, snap back invisibly
  const handleTransitionEnd = () => {
    if (index >= baseItems.length) {
      setWithTransition(false);
      setIndex(0);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      // re-enable transition on next tick after the instant snap
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  const currentOffset = () => index * itemWidthRef.current + dragOffsetRef.current;

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    clearTimeout(timeoutRef.current);
    setWithTransition(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !trackRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) movedRef.current = true;
    dragOffsetRef.current = -delta;
    trackRef.current.style.transform = `translateX(${-currentOffset()}px)`;
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const dragged = dragOffsetRef.current;
    const width = itemWidthRef.current || 1;
    const stepsMoved = Math.round(dragged / width);

    dragOffsetRef.current = 0;
    setWithTransition(true);
    setIndex((i) => Math.max(0, i + stepsMoved));
    scheduleNext();
  };

  const handleClick = () => {
    if (movedRef.current) return;
    navigate('/projects');
  };

  // --- manual arrow controls ---
  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearTimeout(timeoutRef.current);
    setWithTransition(true);
    setIndex((i) => Math.max(0, i - 1));
    scheduleNext();
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearTimeout(timeoutRef.current);
    setWithTransition(true);
    setIndex((i) => i + 1);
    scheduleNext();
  };

  return (
    <div className="project-slider__wrapper">
      <button
        type="button"
        className="project-slider__arrow project-slider__arrow--left"
        onClick={goPrev}
        aria-label="Previous project"
      >
        &#8249;
      </button>

      <div className="project-slider">
        <div
          ref={trackRef}
          className="project-slider__track"
          style={{
            transform: `translateX(${-currentOffset()}px)`,
            transition: withTransition
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
              : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {items.map((p, i) => (
            <div
              key={`${p.slug}-${i}`}
              className="project-slider__item"
              onClick={handleClick}
            >
              <img src={p.cover} alt={p.title} draggable={false} />
              <span className="project-slider__title">{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="project-slider__arrow project-slider__arrow--right"
        onClick={goNext}
        aria-label="Next project"
      >
        &#8250;
      </button>
    </div>
  );
}