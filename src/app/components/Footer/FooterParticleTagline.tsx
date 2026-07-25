"use client";

import { useEffect, useRef } from "react";

const TAGLINE_LINES = ["Spawn Agents", "Step Away", "Ship Faster"];

interface Particle {
  homeX: number;
  homeY: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  delay: number;
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export function FooterParticleTagline() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    const footer = host?.parentElement;
    if (!host || !canvas || !context || !footer) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: -9999, y: -9999, active: false };
    let width = 1;
    let height = 1;
    let dpr = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let entered = false;
    let assembled = false;
    let visible = false;
    let assemblyStartedAt = Number.POSITIVE_INFINITY;

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        context.globalAlpha = 0.9;
        context.fillStyle = "#faf8ef";
        context.beginPath();
        context.arc(particle.x, particle.y, 1.35, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const animate = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;

      if (!assembled) {
        if (now < assemblyStartedAt) {
          for (const particle of particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
            particle.startX = particle.x;
            particle.startY = particle.y;
          }
        } else {
          let complete = true;
          for (const particle of particles) {
            const progress = clamp(
              (now - assemblyStartedAt - particle.delay) / 460,
              0,
              1,
            );
            const eased = 1 - (1 - progress) ** 4;
            particle.x =
              particle.startX + (particle.homeX - particle.startX) * eased;
            particle.y =
              particle.startY + (particle.homeY - particle.startY) * eased;
            if (progress < 1) complete = false;
          }
          assembled = complete;
        }
      } else if (!reducedMotion) {
        for (const particle of particles) {
          let forceX = (particle.homeX - particle.x) * 0.075;
          let forceY = (particle.homeY - particle.y) * 0.075;

          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0.001 && distance < 76) {
              const force = (1 - distance / 76) * 1.7;
              forceX += (dx / distance) * force;
              forceY += (dy / distance) * force;
            }
          }

          particle.vx = (particle.vx + forceX) * 0.82;
          particle.vy = (particle.vy + forceY) * 0.82;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }
      }

      draw();
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frame && visible) frame = window.requestAnimationFrame(animate);
    };

    const build = () => {
      const wasAssembled = assembled;
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = width;
      sampleCanvas.height = height;
      const sampleContext = sampleCanvas.getContext("2d");
      if (!sampleContext) return;

      const fontFamily = getComputedStyle(host).fontFamily;
      const horizontalPadding = width >= 1024 ? 60 : 64;
      const contentWidth = Math.min(1280, width - horizontalPadding);
      const contentLeft = (width - contentWidth) / 2;
      const desktopGap = 40;
      const targetWidth =
        width >= 1024
          ? (contentWidth - desktopGap) / 2.35
          : contentWidth;
      const targetHeight = width >= 640 ? 300 : 250;
      const targetTop = width >= 640 ? 80 : 56;
      const fontSize = Math.min(
        64,
        targetWidth / 7.5,
        targetHeight / 4.15,
      );
      const lineHeight = fontSize * 1.12;
      const blockHeight = lineHeight * TAGLINE_LINES.length;
      const firstBaseline =
        targetTop + (targetHeight - blockHeight) / 2 + fontSize * 0.86;

      sampleContext.fillStyle = "#fff";
      sampleContext.font = `650 ${fontSize}px ${fontFamily}`;
      sampleContext.textBaseline = "alphabetic";
      TAGLINE_LINES.forEach((line, index) => {
        sampleContext.fillText(
          line,
          contentLeft + 10,
          firstBaseline + index * lineHeight,
        );
      });

      const pixels = sampleContext.getImageData(0, 0, width, height).data;
      const sampleGap = width < 560 ? 3 : 4;
      const nextParticles: Particle[] = [];

      for (let y = 0; y < height; y += sampleGap) {
        for (let x = 0; x < width; x += sampleGap) {
          let coveredPixels = 0;
          let coveredX = 0;
          let coveredY = 0;

          for (
            let sampleY = y;
            sampleY < Math.min(y + sampleGap, height);
            sampleY += 1
          ) {
            for (
              let sampleX = x;
              sampleX < Math.min(x + sampleGap, width);
              sampleX += 1
            ) {
              const alpha = pixels[(sampleY * width + sampleX) * 4 + 3];
              if (alpha < 20) continue;
              coveredPixels += 1;
              coveredX += sampleX;
              coveredY += sampleY;
            }
          }

          if (!coveredPixels) continue;
          const homeX = coveredX / coveredPixels;
          const homeY = coveredY / coveredPixels;

          const startX = Math.random() * width;
          const startY = Math.random() * height;
          nextParticles.push({
            homeX,
            homeY,
            startX,
            startY,
            x: wasAssembled ? x : startX,
            y: wasAssembled ? y : startY,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            delay: Math.random() * 30 + (homeX / width) * 45,
          });
        }
      }

      particles = nextParticles;
      assembled = wasAssembled;
      if (entered && !assembled && !reducedMotion) {
        assemblyStartedAt = performance.now();
      }
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        return;
      }

      pointer.active = false;
      start();
    };

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        const intersectionRatio = entry?.intersectionRatio ?? 0;

        if (visible && !entered && intersectionRatio >= 0.5) {
          entered = true;
          assembled = reducedMotion;
          assemblyStartedAt = performance.now();
          if (reducedMotion) {
            for (const particle of particles) {
              particle.x = particle.homeX;
              particle.y = particle.homeY;
            }
          }
        } else if (
          entered &&
          intersectionRatio < 0.5 &&
          !reducedMotion
        ) {
          entered = false;
          assembled = false;
          assemblyStartedAt = Number.POSITIVE_INFINITY;
          for (const particle of particles) {
            particle.vx = (Math.random() - 0.5) * 3.2;
            particle.vy = (Math.random() - 0.5) * 3.2;
            particle.startX = particle.x;
            particle.startY = particle.y;
          }
        }
        if (!visible) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        } else {
          start();
        }
      },
      { threshold: [0, 0.5] },
    );
    intersectionObserver.observe(host);

    footer.addEventListener("pointermove", onPointerMove, { passive: true });
    footer.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    document.fonts?.ready.then(build).catch(() => undefined);
    build();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      footer.removeEventListener("pointermove", onPointerMove);
      footer.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden font-sans"
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
      <span className="sr-only">
        Spawn Agents. Step Away. Ship Faster.
      </span>
    </div>
  );
}
