'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './GlowTrailBackground.module.css';

interface Point {
  x: number;
  y: number;
  age: number;
  vx?: number;
  vy?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface GlowTrailBackgroundProps {
  trailLength?: number;
  colorStart?: string;
  colorEnd?: string;
  lineWidth?: number;
  trailStyle?: 'glow' | 'smoke' | 'blade' | 'ember' | 'electric';
}

export default function GlowTrailBackground({
  trailLength = 50,
  colorStart = '#a78bfa',
  colorEnd = '#60a5fa',
  lineWidth = 16,
  trailStyle = 'glow',
}: GlowTrailBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();
  const isActiveRef = useRef(false);
  const fadeCounterRef = useRef(0);

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 167, g: 139, b: 250 };
  };

  // Original glow trail
  const drawGlowTrail = useCallback((ctx: CanvasRenderingContext2D, points: Point[]) => {
    const startColor = hexToRgb(colorStart);
    const endColor = hexToRgb(colorEnd);

    for (let layer = 3; layer >= 0; layer--) {
      const layerWidth = lineWidth + layer * 8;
      const layerOpacity = layer === 0 ? 0.9 : 0.15 / layer;

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      if (points.length > 1) {
        const gradient = ctx.createLinearGradient(
          points[0].x, points[0].y,
          points[points.length - 1].x, points[points.length - 1].y
        );
        gradient.addColorStop(0, `rgba(${startColor.r}, ${startColor.g}, ${startColor.b}, ${layerOpacity})`);
        gradient.addColorStop(1, `rgba(${endColor.r}, ${endColor.g}, ${endColor.b}, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = layerWidth * (1 - layer * 0.2);
        ctx.stroke();
      }
    }

    if (points.length > 0) {
      const headGradient = ctx.createRadialGradient(points[0].x, points[0].y, 0, points[0].x, points[0].y, 30);
      headGradient.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      headGradient.addColorStop(0.3, `rgba(${startColor.r}, ${startColor.g}, ${startColor.b}, 0.5)`);
      headGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 30, 0, Math.PI * 2);
      ctx.fillStyle = headGradient;
      ctx.fill();
    }
  }, [colorStart, colorEnd, lineWidth]);

  // Smoke trail - dark, wispy, mysterious
  const drawSmokeTrail = useCallback((ctx: CanvasRenderingContext2D, points: Point[]) => {
    // Multiple wispy layers
    for (let layer = 0; layer < 4; layer++) {
      const offset = (layer - 1.5) * 8;
      const opacity = 0.3 - layer * 0.05;

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < points.length; i++) {
        const wobble = Math.sin(i * 0.3 + layer) * (3 + layer * 2);
        const x = points[i].x + wobble + offset;
        const y = points[i].y + wobble * 0.5;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevWobble = Math.sin((i - 1) * 0.3 + layer) * (3 + layer * 2);
          const px = points[i - 1].x + prevWobble + offset;
          const py = points[i - 1].y + prevWobble * 0.5;
          const xc = (x + px) / 2;
          const yc = (y + py) / 2;
          ctx.quadraticCurveTo(px, py, xc, yc);
        }
      }

      const gradient = ctx.createLinearGradient(
        points[0].x, points[0].y,
        points[points.length - 1].x, points[points.length - 1].y
      );
      gradient.addColorStop(0, `rgba(55, 65, 81, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(31, 41, 55, ${opacity * 0.7})`);
      gradient.addColorStop(1, 'rgba(31, 41, 55, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 12 + layer * 6;
      ctx.stroke();
    }

    // Dark core
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    const coreGradient = ctx.createLinearGradient(
      points[0].x, points[0].y,
      points[points.length - 1].x, points[points.length - 1].y
    );
    coreGradient.addColorStop(0, 'rgba(17, 24, 39, 0.8)');
    coreGradient.addColorStop(1, 'rgba(17, 24, 39, 0)');
    ctx.strokeStyle = coreGradient;
    ctx.lineWidth = 4;
    ctx.stroke();
  }, []);

  // Blade slash - sharp, white, fast
  const drawBladeTrail = useCallback((ctx: CanvasRenderingContext2D, points: Point[]) => {
    if (points.length < 3) return;

    // Sharp white core with very fast fade
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }

    // Outer glow
    const glowGradient = ctx.createLinearGradient(
      points[0].x, points[0].y,
      points[Math.min(15, points.length - 1)].x, points[Math.min(15, points.length - 1)].y
    );
    glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    glowGradient.addColorStop(0.3, 'rgba(148, 163, 184, 0.3)');
    glowGradient.addColorStop(1, 'rgba(148, 163, 184, 0)');
    ctx.strokeStyle = glowGradient;
    ctx.lineWidth = 20;
    ctx.stroke();

    // Sharp white core - only first portion
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    const coreLength = Math.min(12, points.length - 1);
    for (let i = 1; i < coreLength; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }

    const coreGradient = ctx.createLinearGradient(
      points[0].x, points[0].y,
      points[coreLength].x, points[coreLength].y
    );
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = coreGradient;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Bright tip
    if (points.length > 0) {
      const tipGradient = ctx.createRadialGradient(points[0].x, points[0].y, 0, points[0].x, points[0].y, 15);
      tipGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      tipGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      tipGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 15, 0, Math.PI * 2);
      ctx.fillStyle = tipGradient;
      ctx.fill();
    }
  }, []);

  // Ember trail - fiery particles
  const drawEmberTrail = useCallback((ctx: CanvasRenderingContext2D, points: Point[], particles: Particle[]) => {
    // Spawn new particles along the trail
    if (points.length > 1) {
      const spawnCount = 3;
      for (let i = 0; i < spawnCount; i++) {
        const idx = Math.floor(Math.random() * Math.min(5, points.length));
        const spread = 15;
        particles.push({
          x: points[idx].x + (Math.random() - 0.5) * spread,
          y: points[idx].y + (Math.random() - 0.5) * spread,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 3 - 1, // Float upward
          life: 1,
          maxLife: 40 + Math.random() * 30,
          size: 2 + Math.random() * 4,
        });
      }
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.02; // Slight upward acceleration
      p.life += 1;

      if (p.life > p.maxLife) {
        particles.splice(i, 1);
        continue;
      }

      const lifeRatio = 1 - p.life / p.maxLife;
      const alpha = lifeRatio * 0.9;

      // Color shifts from bright orange/yellow to deep red as it ages
      const r = Math.floor(lerp(180, 239, lifeRatio));
      const g = Math.floor(lerp(30, 120, lifeRatio * lifeRatio));
      const b = Math.floor(lerp(20, 50, lifeRatio));

      // Glow
      const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      glowGradient.addColorStop(0.5, `rgba(${r}, ${g * 0.5}, ${b}, ${alpha * 0.3})`);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Bright core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, ${150 + Math.floor(lifeRatio * 105)}, 50, ${alpha})`;
      ctx.fill();
    }

    // Draw base trail (subtle)
    if (points.length > 2) {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      const trailGradient = ctx.createLinearGradient(
        points[0].x, points[0].y,
        points[points.length - 1].x, points[points.length - 1].y
      );
      trailGradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)');
      trailGradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.3)');
      trailGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.strokeStyle = trailGradient;
      ctx.lineWidth = 8;
      ctx.stroke();
    }

    // Bright head
    if (points.length > 0) {
      const headGradient = ctx.createRadialGradient(points[0].x, points[0].y, 0, points[0].x, points[0].y, 25);
      headGradient.addColorStop(0, 'rgba(255, 200, 100, 0.95)');
      headGradient.addColorStop(0.3, 'rgba(255, 120, 50, 0.6)');
      headGradient.addColorStop(0.6, 'rgba(239, 68, 68, 0.3)');
      headGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 25, 0, Math.PI * 2);
      ctx.fillStyle = headGradient;
      ctx.fill();
    }
  }, []);

  // Electric arc - jagged, bright, powerful
  const drawElectricTrail = useCallback((ctx: CanvasRenderingContext2D, points: Point[]) => {
    if (points.length < 3) return;

    // Generate jagged path
    const jaggedPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < points.length; i++) {
      const jitter = i < 3 ? 0 : (Math.random() - 0.5) * 12;
      const perpX = i > 0 ? -(points[i].y - points[i - 1].y) : 0;
      const perpY = i > 0 ? points[i].x - points[i - 1].x : 0;
      const len = Math.sqrt(perpX * perpX + perpY * perpY) || 1;
      jaggedPoints.push({
        x: points[i].x + (perpX / len) * jitter,
        y: points[i].y + (perpY / len) * jitter,
      });
    }

    // Outer glow (wide, diffuse)
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(jaggedPoints[0].x, jaggedPoints[0].y);
    for (let i = 1; i < jaggedPoints.length; i++) {
      ctx.lineTo(jaggedPoints[i].x, jaggedPoints[i].y);
    }
    const outerGlow = ctx.createLinearGradient(
      points[0].x, points[0].y,
      points[points.length - 1].x, points[points.length - 1].y
    );
    outerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
    outerGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.2)');
    outerGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.strokeStyle = outerGlow;
    ctx.lineWidth = 30;
    ctx.stroke();

    // Middle glow
    ctx.beginPath();
    ctx.moveTo(jaggedPoints[0].x, jaggedPoints[0].y);
    for (let i = 1; i < jaggedPoints.length; i++) {
      ctx.lineTo(jaggedPoints[i].x, jaggedPoints[i].y);
    }
    const midGlow = ctx.createLinearGradient(
      points[0].x, points[0].y,
      points[points.length - 1].x, points[points.length - 1].y
    );
    midGlow.addColorStop(0, 'rgba(125, 211, 252, 0.7)');
    midGlow.addColorStop(0.6, 'rgba(56, 189, 248, 0.4)');
    midGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.strokeStyle = midGlow;
    ctx.lineWidth = 12;
    ctx.stroke();

    // Bright white core
    ctx.beginPath();
    ctx.moveTo(jaggedPoints[0].x, jaggedPoints[0].y);
    for (let i = 1; i < Math.min(jaggedPoints.length, 20); i++) {
      ctx.lineTo(jaggedPoints[i].x, jaggedPoints[i].y);
    }
    const coreGlow = ctx.createLinearGradient(
      points[0].x, points[0].y,
      points[Math.min(19, points.length - 1)].x, points[Math.min(19, points.length - 1)].y
    );
    coreGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coreGlow.addColorStop(0.4, 'rgba(224, 242, 254, 0.8)');
    coreGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.strokeStyle = coreGlow;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Electric spark at head
    if (points.length > 0) {
      // Main glow
      const sparkGradient = ctx.createRadialGradient(points[0].x, points[0].y, 0, points[0].x, points[0].y, 35);
      sparkGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      sparkGradient.addColorStop(0.2, 'rgba(186, 230, 253, 0.8)');
      sparkGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.4)');
      sparkGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 35, 0, Math.PI * 2);
      ctx.fillStyle = sparkGradient;
      ctx.fill();

      // Random mini arcs
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const length = 15 + Math.random() * 20;
        const endX = points[0].x + Math.cos(angle) * length;
        const endY = points[0].y + Math.sin(angle) * length;
        const midX = points[0].x + Math.cos(angle) * length * 0.5 + (Math.random() - 0.5) * 10;
        const midY = points[0].y + Math.sin(angle) * length * 0.5 + (Math.random() - 0.5) * 10;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(midX, midY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
        ctx.lineWidth = 1 + Math.random();
        ctx.stroke();
      }
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const mouse = mouseRef.current;
    const points = pointsRef.current;
    const particles = particlesRef.current;

    if (isActiveRef.current && mouse.x > 0 && mouse.y > 0) {
      points.unshift({ x: mouse.x, y: mouse.y, age: 0 });
      fadeCounterRef.current = 0;
    }

    const effectiveTrailLength = trailStyle === 'blade' ? 25 : trailLength;
    for (let i = points.length - 1; i >= 0; i--) {
      points[i].age++;
      if (points[i].age > effectiveTrailLength) {
        points.splice(i, 1);
      }
    }

    // Clear canvas
    if (points.length === 0 && particles.length === 0) {
      fadeCounterRef.current++;
      if (fadeCounterRef.current > 30) {
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = 'rgba(250, 250, 250, 0.3)';
        ctx.fillRect(0, 0, width, height);
      }
    } else {
      const fadeSpeed = trailStyle === 'blade' ? 0.35 : 0.2;
      ctx.fillStyle = `rgba(250, 250, 250, ${fadeSpeed})`;
      ctx.fillRect(0, 0, width, height);
    }

    // Draw based on style
    if (points.length > 2 || particles.length > 0) {
      switch (trailStyle) {
        case 'smoke':
          if (points.length > 2) drawSmokeTrail(ctx, points);
          break;
        case 'blade':
          if (points.length > 2) drawBladeTrail(ctx, points);
          break;
        case 'ember':
          drawEmberTrail(ctx, points, particles);
          break;
        case 'electric':
          if (points.length > 2) drawElectricTrail(ctx, points);
          break;
        default:
          if (points.length > 2) drawGlowTrail(ctx, points);
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [trailLength, trailStyle, drawGlowTrail, drawSmokeTrail, drawBladeTrail, drawEmberTrail, drawElectricTrail]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Clear particles when switching styles
    particlesRef.current = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isActiveRef.current = true;
    };

    const handleMouseLeave = () => {
      isActiveRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isActiveRef.current = true;
      }
    };

    const handleTouchEnd = () => {
      isActiveRef.current = false;
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
