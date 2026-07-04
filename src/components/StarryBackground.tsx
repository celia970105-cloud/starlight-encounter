import React, { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star Class
    class Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      twinkleSpeed: number;
      phase: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.05 + 0.01;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.phase = Math.random() * Math.PI * 2;

        // Give a portion of stars a warm pinkish/dreamy tint
        const colorRand = Math.random();
        if (colorRand > 0.85) {
          this.color = 'rgba(255, 121, 156, '; // Pink tint
        } else if (colorRand > 0.7) {
          this.color = 'rgba(255, 204, 221, '; // Warm white/pink tint
        } else {
          this.color = 'rgba(255, 255, 255, '; // Pure white
        }
      }

      update() {
        this.phase += this.twinkleSpeed;
        this.y -= this.speed;
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        const alpha = 0.3 + Math.abs(Math.sin(this.phase)) * 0.7;
        c.fillStyle = `${this.color}${alpha})`;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    // Shooting Star Class
    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      active: boolean;
      angle: number;

      constructor() {
        this.reset();
        this.active = Math.random() > 0.9; // Only start active occasionally
      }

      reset() {
        this.x = Math.random() * width * 0.8;
        this.y = Math.random() * height * 0.4;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 12 + 6;
        this.angle = (Math.PI / 6) + Math.random() * (Math.PI / 12); // around 30-45 degrees
        this.active = false;
      }

      update() {
        if (!this.active) {
          if (Math.random() < 0.0004) {
            this.active = true;
          }
          return;
        }

        const cosVal = Math.cos(this.angle);
        const sinVal = Math.sin(this.angle);

        this.x += this.speed * cosVal;
        this.y += this.speed * sinVal;

        if (this.x > width || this.y > height) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (!this.active) return;

        const cosVal = Math.cos(this.angle);
        const sinVal = Math.sin(this.angle);

        const grad = c.createLinearGradient(
          this.x,
          this.y,
          this.x - this.length * cosVal,
          this.y - this.length * sinVal
        );
        grad.addColorStop(0, 'rgba(255, 204, 221, 0.9)');
        grad.addColorStop(0.2, 'rgba(255, 121, 156, 0.5)');
        grad.addColorStop(1, 'rgba(255, 121, 156, 0)');

        c.strokeStyle = grad;
        c.lineWidth = 1.8;
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x - this.length * cosVal, this.y - this.length * sinVal);
        c.stroke();
      }
    }

    // Create stars
    const starCount = Math.floor((width * height) / 8000) + 60;
    const stars: Star[] = Array.from({ length: starCount }, () => new Star());
    const shootingStars: ShootingStar[] = Array.from({ length: 2 }, () => new ShootingStar());

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      // Gentle dark space color background
      ctx.fillStyle = '#0a060d';
      ctx.fillRect(0, 0, width, height);

      // Create gentle glowing ambient nebulae with radial gradients
      const centerGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.6
      );
      centerGrad.addColorStop(0, 'rgba(26, 13, 31, 0.65)');
      centerGrad.addColorStop(0.5, 'rgba(15, 8, 20, 0.3)');
      centerGrad.addColorStop(1, 'rgba(10, 6, 13, 1)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      // Left nebula accent (pinkish glow)
      const leftGrad = ctx.createRadialGradient(
        width * 0.2,
        height * 0.7,
        0,
        width * 0.2,
        height * 0.7,
        width * 0.4
      );
      leftGrad.addColorStop(0, 'rgba(255, 121, 156, 0.05)');
      leftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftGrad;
      ctx.beginPath();
      ctx.arc(width * 0.2, height * 0.7, width * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Right nebula accent (soft peach/pink glow)
      const rightGrad = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        0,
        width * 0.8,
        height * 0.2,
        width * 0.35
      );
      rightGrad.addColorStop(0, 'rgba(255, 204, 221, 0.04)');
      rightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rightGrad;
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.2, width * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw stars
      for (const star of stars) {
        star.update();
        star.draw(ctx);
      }

      // Update and draw shooting stars
      for (const sStar of shootingStars) {
        sStar.update();
        sStar.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
    />
  );
}
