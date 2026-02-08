import { RefObject, useEffect, useRef } from 'react';

type Bounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export function useSpotlightReveal(
  containerRef: RefObject<HTMLElement | null>,
  cardRef: RefObject<HTMLElement | null>
) {
  const rafRef = useRef<number | null>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const cardBounds = useRef<Bounds>({ left: 0, top: 0, right: 0, bottom: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;

    if (!container || !card) {
      return;
    }

    const updateCardBounds = () => {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const left = Math.max(0, cardRect.left - containerRect.left);
      const top = Math.max(0, cardRect.top - containerRect.top);
      const width = Math.max(0, cardRect.width);
      const height = Math.max(0, cardRect.height);

      cardBounds.current = {
        left,
        top,
        right: left + width,
        bottom: top + height,
      };

      container.style.setProperty('--card-left', `${left}px`);
      container.style.setProperty('--card-top', `${top}px`);
      container.style.setProperty('--card-width', `${width}px`);
      container.style.setProperty('--card-height', `${height}px`);

      const radius = getComputedStyle(card).borderRadius;
      if (radius) {
        container.style.setProperty('--card-radius', radius);
      }
    };

    updateCardBounds();

    const resizeObserver = new ResizeObserver(updateCardBounds);
    resizeObserver.observe(container);
    resizeObserver.observe(card);

    const updateReveal = () => {
      rafRef.current = null;

      if (!lastPoint.current) {
        return;
      }

      const { x, y } = lastPoint.current;
      const bounds = cardBounds.current;
      const insideCard =
        x >= bounds.left &&
        x <= bounds.right &&
        y >= bounds.top &&
        y <= bounds.bottom;

      container.style.setProperty('--reveal-opacity', insideCard ? '0' : '1');

      if (!insideCard) {
        container.style.setProperty('--reveal-x', `${x}px`);
        container.style.setProperty('--reveal-y', `${y}px`);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const containerRect = container.getBoundingClientRect();
      lastPoint.current = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(updateReveal);
      }
    };

    const handlePointerLeave = () => {
      container.style.setProperty('--reveal-opacity', '0');
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [containerRef, cardRef]);
}
