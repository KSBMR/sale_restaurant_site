import { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState({
    score: 0,
    time: 0,
    level: 1,
    isGameOver: false,
  });
  const [showInstructions, setShowInstructions] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const welcomeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    const createSound = (frequencies: number[], duration: number, type: OscillatorType) => {
      return () => {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.type = type;
          gainNode.gain.value = 0.1;

          const now = audioContext.currentTime;
          const stepDuration = duration / frequencies.length;

          frequencies.forEach((freq, i) => {
            oscillator.frequency.setValueAtTime(freq, now + i * stepDuration);
          });

          gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
          oscillator.start(now);
          oscillator.stop(now + duration);
        } catch (e) {
          console.log('Audio not supported');
        }
      };
    };

    const sounds = {
      collision: createSound([100, 50, 25], 0.5, 'sawtooth'),
      powerup: createSound([400, 600, 800, 1000], 0.3, 'sine'),
      squeak: createSound([800, 1000, 800], 0.2, 'sine'),
      dash: createSound([600, 400], 0.2, 'square')
    };

    let localGameState = {
      score: 0,
      time: 0,
      level: 1,
      isGameOver: false,
      startTime: Date.now(),
      lastLevelUp: Date.now()
    };

    const jerry = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      targetX: canvas.width / 2,
      targetY: canvas.height / 2,
      size: 25,
      speed: 0.15,
      isDashing: false,
      dashCooldown: 0,
      slowEffect: 0
    };

    const tom = {
      x: 100,
      y: 100,
      size: 35,
      baseSpeed: 0.02,
      speed: 0.02,
      speedIncrease: 0.0005,
      slowEffect: 0
    };

    let items: any[] = [];
    const itemSpawnInterval = 3000;
    let lastItemSpawn = Date.now();
    let particles: any[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      jerry.targetX = e.clientX;
      jerry.targetY = e.clientY;
      setShowInstructions(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      jerry.targetX = touch.clientX;
      jerry.targetY = touch.clientY;
      setShowInstructions(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      jerry.targetX = touch.clientX;
      jerry.targetY = touch.clientY;
      setShowInstructions(false);
    };

    const dash = () => {
      if (jerry.dashCooldown > 0 || localGameState.isGameOver) return;

      jerry.isDashing = true;
      jerry.dashCooldown = 2000;
      sounds.dash();

      const dx = jerry.x - tom.x;
      const dy = jerry.y - tom.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0) {
        jerry.x += (dx / dist) * 150;
        jerry.y += (dy / dist) * 150;

        jerry.x = Math.max(jerry.size, Math.min(canvas.width - jerry.size, jerry.x));
        jerry.y = Math.max(jerry.size, Math.min(canvas.height - jerry.size, jerry.y));
      }

      setTimeout(() => {
        jerry.isDashing = false;
      }, 300);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !jerry.isDashing && jerry.dashCooldown <= 0 && !localGameState.isGameOver) {
        e.preventDefault();
        dash();
        setShowInstructions(false);
      }
    };

    let lastTap = 0;
    const handleTouchEnd = () => {
      const currentTime = Date.now();
      if (currentTime - lastTap < 300) {
        dash();
      }
      lastTap = currentTime;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('keydown', handleKeyDown);

    const spawnItem = () => {
      const isCheese = Math.random() > 0.4;
      const item = {
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        size: 20,
        type: isCheese ? 'cheese' : 'trap',
        rotation: 0,
        scale: 0
      };
      items.push(item);
    };

    const createParticles = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8 - 2,
          life: 60,
          color: color,
          size: Math.random() * 5 + 2
        });
      }
    };

    const gameOver = () => {
      if (localGameState.isGameOver) return;

      localGameState.isGameOver = true;
      sounds.collision();

      createParticles(jerry.x, jerry.y, '#ff6b6b', 50);
      createParticles(jerry.x, jerry.y, '#ffd700', 30);

      setGameState({
        score: localGameState.score,
        time: localGameState.time,
        level: localGameState.level,
        isGameOver: true
      });
    };

    const update = () => {
      if (localGameState.isGameOver) return;

      const elapsed = (Date.now() - localGameState.startTime) / 1000;
      localGameState.time = Math.floor(elapsed);
      localGameState.score = Math.floor(elapsed * 10);

      if (Date.now() - localGameState.lastLevelUp > 20000) {
        localGameState.level++;
        localGameState.lastLevelUp = Date.now();
        sounds.powerup();
      }

      const jerrySpeed = jerry.slowEffect > 0 ? jerry.speed * 0.5 : jerry.speed;
      jerry.x += (jerry.targetX - jerry.x) * jerrySpeed;
      jerry.y += (jerry.targetY - jerry.y) * jerrySpeed;

      if (jerry.slowEffect > 0) jerry.slowEffect--;
      if (tom.slowEffect > 0) tom.slowEffect--;
      if (jerry.dashCooldown > 0) jerry.dashCooldown -= 16;

      const tomSpeed = tom.slowEffect > 0 ? tom.speed * 0.3 : tom.speed;
      tom.x += (jerry.x - tom.x) * tomSpeed;
      tom.y += (jerry.y - tom.y) * tomSpeed;

      tom.speed = tom.baseSpeed + (localGameState.level - 1) * tom.speedIncrease;

      if (Date.now() - lastItemSpawn > itemSpawnInterval) {
        spawnItem();
        lastItemSpawn = Date.now();
      }

      items.forEach((item, index) => {
        item.rotation += 0.05;
        if (item.scale < 1) item.scale += 0.05;

        const dx = jerry.x - item.x;
        const dy = jerry.y - item.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < jerry.size + item.size) {
          if (item.type === 'cheese') {
            tom.slowEffect = 180;
            sounds.powerup();
            createParticles(item.x, item.y, '#FFD700', 20);
            localGameState.score += 50;
          } else {
            jerry.slowEffect = 120;
            sounds.squeak();
            createParticles(item.x, item.y, '#8B4513', 15);
          }
          items.splice(index, 1);
        }
      });

      const dx = tom.x - jerry.x;
      const dy = tom.y - jerry.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < tom.size + jerry.size - 10) {
        gameOver();
      }

      particles = particles.filter(p => {
        p.life--;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        return p.life > 0;
      });

      setGameState({
        score: localGameState.score,
        time: localGameState.time,
        level: localGameState.level,
        isGameOver: localGameState.isGameOver
      });
    };

    const drawCloud = (x: number, y: number, size: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.arc(x + size * 0.4, y, size * 0.4, 0, Math.PI * 2);
      ctx.arc(x - size * 0.4, y, size * 0.4, 0, Math.PI * 2);
      ctx.arc(x, y - size * 0.3, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTom = (x: number, y: number, size: number, isSlowed: boolean) => {
      ctx.save();
      ctx.translate(x, y);

      if (isSlowed) {
        ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, size + 10, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      ctx.ellipse(0, 5, size * 0.8, size, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.arc(0, -5, size * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#A0522D';
      ctx.beginPath();
      ctx.moveTo(-size * 0.5, -size * 0.5);
      ctx.lineTo(-size * 0.7, -size * 0.9);
      ctx.lineTo(-size * 0.3, -size * 0.6);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(size * 0.5, -size * 0.5);
      ctx.lineTo(size * 0.7, -size * 0.9);
      ctx.lineTo(size * 0.3, -size * 0.6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(-size * 0.25, -size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.arc(size * 0.25, -size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-size * 0.25, -size * 0.2, size * 0.1, 0, Math.PI * 2);
      ctx.arc(size * 0.25, -size * 0.2, size * 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FF69B4';
      ctx.beginPath();
      ctx.arc(0, size * 0.05, size * 0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size * 0.4, 0);
      ctx.lineTo(-size * 0.9, -size * 0.1);
      ctx.moveTo(-size * 0.4, size * 0.1);
      ctx.lineTo(-size * 0.9, size * 0.1);
      ctx.moveTo(size * 0.4, 0);
      ctx.lineTo(size * 0.9, -size * 0.1);
      ctx.moveTo(size * 0.4, size * 0.1);
      ctx.lineTo(size * 0.9, size * 0.1);
      ctx.stroke();

      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.8);
      ctx.quadraticCurveTo(-size * 0.5, size * 1.2, -size * 0.8, size * 0.9);
      ctx.stroke();

      ctx.restore();
    };

    const drawJerry = (x: number, y: number, size: number, isDashing: boolean, isSlowed: boolean) => {
      ctx.save();
      ctx.translate(x, y);

      if (isDashing) {
        ctx.fillStyle = 'rgba(255, 255, 100, 0.5)';
        ctx.beginPath();
        ctx.arc(0, 0, size + 15, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isSlowed) {
        ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, size + 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#A9A9A9';
      ctx.beginPath();
      ctx.ellipse(0, 3, size * 0.6, size * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#C0C0C0';
      ctx.beginPath();
      ctx.arc(0, -3, size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFB6C1';
      ctx.beginPath();
      ctx.arc(-size * 0.45, -size * 0.45, size * 0.3, 0, Math.PI * 2);
      ctx.arc(size * 0.45, -size * 0.45, size * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#C0C0C0';
      ctx.beginPath();
      ctx.arc(-size * 0.45, -size * 0.45, size * 0.35, 0, Math.PI * 2);
      ctx.arc(size * 0.45, -size * 0.45, size * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-size * 0.2, -size * 0.15, size * 0.12, 0, Math.PI * 2);
      ctx.arc(size * 0.2, -size * 0.15, size * 0.12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFB6C1';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-size * 0.3, size * 0.05);
      ctx.lineTo(-size * 0.7, 0);
      ctx.moveTo(-size * 0.3, size * 0.15);
      ctx.lineTo(-size * 0.7, size * 0.15);
      ctx.moveTo(size * 0.3, size * 0.05);
      ctx.lineTo(size * 0.7, 0);
      ctx.moveTo(size * 0.3, size * 0.15);
      ctx.lineTo(size * 0.7, size * 0.15);
      ctx.stroke();

      ctx.strokeStyle = '#A9A9A9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.6);
      ctx.quadraticCurveTo(size * 0.3, size * 1, size * 0.5, size * 1.2);
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(0.5, '#98d8e8');
      gradient.addColorStop(1, '#b0e0e6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#90EE90';
      ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

      drawCloud(100, 80, 60);
      drawCloud(canvas.width - 150, 120, 50);
      drawCloud(canvas.width / 2, 60, 70);

      items.forEach(item => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.scale(item.scale, item.scale);

        if (item.type === 'cheese') {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.moveTo(-15, -10);
          ctx.lineTo(15, -10);
          ctx.lineTo(12, 10);
          ctx.lineTo(-12, 10);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#FFA500';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#FFA500';
          ctx.beginPath();
          ctx.arc(-5, 0, 3, 0, Math.PI * 2);
          ctx.arc(5, -3, 2, 0, Math.PI * 2);
          ctx.arc(3, 5, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(-15, -5, 30, 10);
          ctx.fillStyle = '#654321';
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();
      });

      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 60;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      drawTom(tom.x, tom.y, tom.size, tom.slowEffect > 0);
      drawJerry(jerry.x, jerry.y, jerry.size, jerry.isDashing, jerry.slowEffect > 0);

      if (jerry.dashCooldown > 0) {
        const cooldownPercent = jerry.dashCooldown / 2000;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(jerry.x - 20, jerry.y + 35, 40, 5);
        ctx.fillStyle = '#4caf50';
        ctx.fillRect(jerry.x - 20, jerry.y + 35, 40 * (1 - cooldownPercent), 5);
      }
    };

    const gameLoop = () => {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted]);

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const handleStartGame = () => {
    setShowWelcome(false);
    setTimeout(() => {
      setGameStarted(true);
    }, 300);
  };

  useEffect(() => {
    if (!showWelcome) return;

    const checkScroll = () => {
      const container = welcomeContainerRef.current;
      if (container) {
        const hasScroll = container.scrollHeight > container.clientHeight;
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
        setShowScrollIndicator(hasScroll && !isAtBottom);
      }
    };

    checkScroll();
    const container = welcomeContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [showWelcome]);

  return (
    <div style={{ cursor: gameStarted ? 'none' : 'default', overflow: 'hidden', position: 'relative' }}>
      {showWelcome && (
        <div
          ref={welcomeContainerRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            zIndex: 1000,
            opacity: showWelcome ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
            fontFamily: 'Comic Sans MS, Chalkboard SE, Comic Neue, cursive',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '20px 0',
            WebkitOverflowScrolling: 'touch'
          }}>
          <style>
            {`
              @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
              }
              @keyframes arrowBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(10px); }
              }
            `}
          </style>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '30px',
            padding: '40px 30px',
            maxWidth: '800px',
            width: '90%',
            margin: 'auto',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            position: 'relative'
          }}>
              <div style={{
                fontSize: '32px',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                ↓
              </div>
            }}>
              Tom & Jerry Cursor Chase 🐭🐱
            </h1>

            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: '#555',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Catch Jerry or escape Tom in this fun cursor chase game!
            </p>

            <div style={{
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '20px',
              padding: '30px',
              marginBottom: '40px'
            }}>
              <h2 style={{
                fontSize: 'clamp(20px, 4vw, 28px)',
                color: '#333',
                marginBottom: '25px',
                fontWeight: 'bold'
              }}>
                How to Play
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '25px',
                textAlign: 'left'
              }}>
                <div style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(18px, 3.5vw, 22px)',
                    color: '#667eea',
                    marginBottom: '15px',
                    fontWeight: 'bold'
                  }}>
                    🖥️ On PC
                  </h3>
                  <ul style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    color: '#555',
                    lineHeight: '1.8',
                    paddingLeft: '20px',
                    margin: 0
                  }}>
                    <li>Move the mouse to control your character</li>
                    <li>Press SPACEBAR to dash away</li>
                    <li>Collect cheese to slow Tom down</li>
                    <li>Avoid traps that slow Jerry</li>
                  </ul>
                </div>

                <div style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(18px, 3.5vw, 22px)',
                    color: '#764ba2',
                    marginBottom: '15px',
                    fontWeight: 'bold'
                  }}>
                    📱 On Mobile
                  </h3>
                  <ul style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    color: '#555',
                    lineHeight: '1.8',
                    paddingLeft: '20px',
                    margin: 0
                  }}>
                    <li>Tap and drag to move</li>
                    <li>Double-tap to dash away</li>
                    <li>Swipe quickly to dodge</li>
                    <li>Survive as long as possible!</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartGame}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '20px 60px',
                fontSize: 'clamp(20px, 4vw, 28px)',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                fontFamily: 'Comic Sans MS, Chalkboard SE, Comic Neue, cursive'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
              }}
            >
              Start Game 🎮
            </button>
          </div>

          {showScrollIndicator && (
            <div style={{
              position: 'fixed',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'arrowBounce 2s ease-in-out infinite',
              zIndex: 1001,
              pointerEvents: 'none'
            }}>
              <div style={{
                fontSize: '14px',
                color: 'white',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                marginBottom: '5px'
              }}>
                Scroll Down
              </div>
              <div style={{
                fontSize: '32px',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                ↓
              </div>
            </div>
          )}
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: gameStarted ? 'block' : 'none' }} />

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        zIndex: 10
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
          border: '3px solid white'
        }}>
          Score: {gameState.score}
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
          border: '3px solid white'
        }}>
          Time: {gameState.time}s
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
          border: '3px solid white'
        }}>
          Level: {gameState.level}
        </div>
      </div>

      {showInstructions && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '15px 30px',
          borderRadius: '20px',
          fontSize: '16px',
          textAlign: 'center',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          zIndex: 10,
          border: '2px solid #667eea',
          fontFamily: 'Comic Sans MS, Chalkboard SE, Comic Neue, cursive'
        }}>
          Move your mouse/finger to control Jerry! Press SPACEBAR to dash away from Tom!
        </div>
      )}

      {gameState.isGameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%)',
          padding: '40px 60px',
          borderRadius: '30px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          border: '5px solid white',
          zIndex: 100,
          fontFamily: 'Comic Sans MS, Chalkboard SE, Comic Neue, cursive'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '48px',
            marginBottom: '20px',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)'
          }}>
            Game Over!
          </h1>
          <p style={{
            color: 'white',
            fontSize: '24px',
            margin: '10px 0',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'
          }}>
            Score: {gameState.score}
          </p>
          <p style={{
            color: 'white',
            fontSize: '24px',
            margin: '10px 0',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'
          }}>
            Survived: {gameState.time}s
          </p>
          <p style={{
            color: 'white',
            fontSize: '24px',
            margin: '10px 0',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'
          }}>
            Level Reached: {gameState.level}
          </p>
          <button
            onClick={handlePlayAgain}
            style={{
              background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              fontSize: '24px',
              borderRadius: '50px',
              cursor: 'pointer',
              marginTop: '20px',
              fontWeight: 'bold',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              fontFamily: 'Comic Sans MS, Chalkboard SE, Comic Neue, cursive'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
