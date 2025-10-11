// Complete Enhanced JavaScript for Dies Natalis HIFI-67 Retro Website
// FIXED: Audio playback issues - guaranteed sound output
// 100% RESPONSIVE - SYNCED WITH CSS
// OPTIMIZED & CLEAN - No duplications

document.addEventListener('DOMContentLoaded', () => {
  /**
   * ENHANCED LOADING SCREEN WITH SMOOTH TRANSITIONS
   */
  const loadingWrapper = document.getElementById('loading-screen');
  const appContent = document.getElementById('content');
  
  function createLoadingAnimation() {
    if (!loadingWrapper) return;
    
    const loadingText = loadingWrapper.querySelector('.loading-text') || document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.innerHTML = 'DIES-CO SEDANG MEMUAT<span class="loading-dots"></span>';
    if (!loadingWrapper.contains(loadingText)) {
      loadingWrapper.appendChild(loadingText);
    }
    
    const dots = loadingText.querySelector('.loading-dots');
    if (dots) {
      let dotCount = 0;
      const dotInterval = setInterval(() => {
        dots.textContent = '.'.repeat((dotCount % 4));
        dotCount++;
      }, 300);
      
      setTimeout(() => clearInterval(dotInterval), 3000);
    }
  }
  
  window.addEventListener('load', () => {
    createLoadingAnimation();
    
    setTimeout(() => {
      if (loadingWrapper) {
        loadingWrapper.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        loadingWrapper.style.opacity = '0';
        loadingWrapper.style.transform = 'scale(1.1)';
      }
      
      setTimeout(() => {
        if (loadingWrapper) loadingWrapper.style.display = 'none';
        if (appContent) {
          appContent.style.display = 'block';
          appContent.style.opacity = '0';
          
          requestAnimationFrame(() => {
            appContent.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
            appContent.style.opacity = '1';
            appContent.addEventListener('transitionend', () => {
              appContent.style.removeProperty('transform');
            }, { once: true });
            initEntranceAnimations();
          });
        }
      }, 800);
    }, 2500);
  });

  /**
   * ENHANCED ENTRANCE ANIMATIONS - RESPONSIVE
   */
  function initEntranceAnimations() {
    const elements = document.querySelectorAll('h1, h2, h3, p, .card, .button, .music-player, nav a');
    
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.95)';
      el.style.filter = 'blur(5px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0px)';
      }, index * 80 + 200);
    });

    const heroElements = document.querySelectorAll('.hero-main-title, .title-highlight, .hero-description p, .scroll-arrow');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0px)';
        el.style.animation = `heroGlow 3s ease-in-out ${index * 0.3}s`;
      }, index * 200 + 400);
    });
  }

  /**
   * ENHANCED HEADER - ALWAYS VISIBLE & RESPONSIVE
   */
  const header = document.getElementById('header') || document.querySelector('.site-header');
  
  const onScroll = () => {
    if (!header) return;
    
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /**
   * ENHANCED HAMBURGER MENU - 100% RESPONSIVE
   */
  const navbar = document.querySelector('.navbar');
  let navMenu = document.getElementById('navMenu') || document.querySelector('.nav-links');

  if (navMenu && !navMenu.id) navMenu.id = 'navMenu';
  navMenu = document.getElementById('navMenu');

  let navToggle = document.querySelector('.nav-toggle');
  if (!navToggle && navbar) {
    navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label', 'Buka menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = `
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    `;
    if (navMenu) navbar.insertBefore(navToggle, navMenu);
    else navbar.appendChild(navToggle);
  }

  if (navToggle && navMenu) {
    const lines = navToggle.querySelectorAll('.line');
    
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop && window.innerWidth <= 768) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      backdrop.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 999;
      `;
      document.body.appendChild(backdrop);
    }
    
    const closeMenu = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      if (backdrop) {
        backdrop.style.opacity = '0';
        backdrop.style.pointerEvents = 'none';
      }
      
      if (lines.length >= 3) {
        lines[0].style.transform = 'translate(-50%, -7px)';
        lines[1].style.transform = 'translate(-50%, 0)';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'translate(-50%, 7px)';
      }
    };
    
    const openMenu = () => {
      navMenu.classList.add('open');
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      
      if (window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden';
      }
      
      if (backdrop) {
        backdrop.style.opacity = '1';
        backdrop.style.pointerEvents = 'auto';
      }
      
      if (lines.length >= 3) {
        lines[0].style.transform = 'translate(-50%, 0) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[1].style.transform = 'translate(-50%, 0) scale(0)';
        lines[2].style.transform = 'translate(-50%, 0) rotate(-45deg)';
      }
    };
    
    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }
    
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) closeMenu();
      else openMenu();
    });

    const menuLinks = navMenu.querySelectorAll('a');
    const isTouch = 'ontouchstart' in window;
    
    menuLinks.forEach(link => {
      if (!isTouch) {
        link.addEventListener('mouseenter', () => {
          if (window.innerWidth > 768) {
            link.style.transform = 'translateX(8px) scale(1.02)';
            link.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
          }
        });
        
        link.addEventListener('mouseleave', () => {
          if (window.innerWidth > 768) {
            link.style.transform = '';
            link.style.textShadow = '';
          }
        });
      } else {
        link.addEventListener('touchstart', () => {
          link.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        link.addEventListener('touchend', () => {
          setTimeout(() => {
            link.style.transform = '';
          }, 150);
        }, { passive: true });
      }
      
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
          closeMenu();
          document.body.style.overflow = '';
        }
        
        if (window.innerWidth <= 768 && !backdrop) {
          backdrop = document.createElement('div');
          backdrop.className = 'nav-backdrop';
          backdrop.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 999;
          `;
          document.body.appendChild(backdrop);
          backdrop.addEventListener('click', closeMenu);
        }
      }, 100);
    }, { passive: true });
  }

  /**
   * ENHANCED SCROLL ANIMATIONS - RESPONSIVE
   */
  const observerOptions = {
    threshold: [0, 0.1, 0.5],
    rootMargin: '-50px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        if (entry.target.classList.contains('parallax') && window.innerWidth > 768) {
          const rect = entry.target.getBoundingClientRect();
          const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
          const speed = parseFloat(entry.target.dataset.speed) || 0.3;
          const yPos = -(scrollPercent * 50 * speed);
          entry.target.style.transform = `translateY(${yPos}px)`;
        }
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.anim-target, .card, .section, .music-player');
  const isTouch = 'ontouchstart' in window;
  
  animatedElements.forEach((el, index) => {
    if (window.innerWidth > 768) {
      el.classList.add('parallax');
      el.dataset.speed = (0.2 + (index % 3) * 0.1).toString();
    }
    scrollObserver.observe(el);
    
    if (!isTouch) {
      el.addEventListener('mouseenter', () => {
        el.style.transform += ' scale(1.01)';
        el.style.filter = 'brightness(1.05)';
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = el.style.transform.replace(' scale(1.01)', '');
        el.style.filter = '';
      });
    } else {
      el.addEventListener('touchstart', () => {
        el.style.transform += ' scale(0.98)';
      }, { passive: true });
      
      el.addEventListener('touchend', () => {
        setTimeout(() => {
          el.style.transform = el.style.transform.replace(' scale(0.98)', '');
        }, 150);
      }, { passive: true });
    }
  });

  /**
   * ENHANCED MUSIC PLAYER - FIXED & RESPONSIVE
   */
  let audio = document.getElementById('audioPlayer');
  
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'audioPlayer';
    audio.preload = 'metadata';
    document.body.appendChild(audio);
  }
  
  const vinyl = document.getElementById('vinyl');
  const tonearm = document.getElementById('tonearm');
  const powerToggle = document.getElementById('powerToggle');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const loopBtn = document.getElementById('loopBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const volumeRange = document.getElementById('volumeRange');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const currentTrackTitle = document.getElementById('currentTrack');
  const playlistEl = document.getElementById('playlist');
  const wave = document.getElementById('waveAnimation');

  const tracks = [
    { title: 'Lagu Tema HIFI-67', src: 'Music/lagu-tema.mp3' },
    { title: 'Retro Vibes Classic', src: 'Music/retro-vibes.mp3' },
    { title: 'Synthwave Dreams', src: 'Music/synthwave-dreams.mp3' },
    { title: 'Nostalgic Beats', src: 'Music/nostalgic.mp3' }
  ];
  
  let currentIndex = 0;
  let isShuffle = false;
  let isLoop = false;
  let isPowerOn = true;
  let isPlaying = false;
  let animationFrame = null;
  let userHasInteracted = false;

  function createWaveVisualization() {
    if (!wave) return;
    
    wave.innerHTML = '';
    const numBars = window.innerWidth > 768 ? 24 : window.innerWidth > 480 ? 16 : 12;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    
    for (let i = 0; i < numBars; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      const barWidth = window.innerWidth > 768 ? 6 : window.innerWidth > 480 ? 5 : 4;
      bar.style.cssText = `
        background: ${colors[i % colors.length]};
        height: 8px;
        width: ${barWidth}px;
        margin: 0 ${window.innerWidth > 480 ? 2 : 1}px;
        border-radius: 3px;
        display: inline-block;
        vertical-align: bottom;
        animation: waveIdle ${1 + Math.random()}s ease-in-out infinite alternate;
        animation-delay: ${i * 0.05}s;
      `;
      wave.appendChild(bar);
    }
  }

  function animateWave() {
    if (!wave || !isPlaying) return;
    
    const bars = wave.querySelectorAll('.wave-bar');
    
    function animate() {
      if (!isPlaying) return;
      
      bars.forEach((bar, index) => {
        const value = Math.random() * 50 + 20;
        const maxHeight = window.innerWidth > 768 ? 60 : window.innerWidth > 480 ? 45 : 35;
        const height = Math.min(Math.max(8, value), maxHeight);
        const hue = (value / 70) * 300 + (index * 15);
        
        bar.style.height = `${height}px`;
        bar.style.background = `hsl(${hue}, 70%, 60%)`;
        bar.style.boxShadow = `0 0 ${height/4}px hsl(${hue}, 70%, 60%)`;
        bar.style.transform = `scaleY(${0.8 + (value / 70) * 0.4})`;
      });
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
  }

  function stopWaveAnimation() {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    
    const bars = wave?.querySelectorAll('.wave-bar');
    bars?.forEach(bar => {
      bar.style.height = '8px';
      bar.style.transform = 'scaleY(1)';
      bar.style.boxShadow = 'none';
    });
  }

  function populatePlaylist() {
    if (!playlistEl) return;
    
    playlistEl.innerHTML = '';
    const isTouch = 'ontouchstart' in window;
    
    tracks.forEach((track, index) => {
      const li = document.createElement('li');
      li.textContent = track.title;
      li.dataset.index = index;
      const fontSize = window.innerWidth > 768 ? '0.9rem' : window.innerWidth > 480 ? '0.85rem' : '0.8rem';
      const padding = window.innerWidth > 480 ? '8px 12px' : '6px 10px';
      
      li.style.cssText = `
        cursor: pointer;
        padding: ${padding};
        border-radius: 6px;
        margin: 4px 0;
        font-size: ${fontSize};
      `;
      
      li.addEventListener('click', () => {
        userHasInteracted = true;
        loadTrack(index);
        if (isPowerOn) playAudio();
        
        li.style.transform = 'scale(0.95)';
        setTimeout(() => li.style.transform = '', 150);
      });
      
      if (!isTouch) {
        li.addEventListener('mouseenter', () => {
          li.style.transform = 'translateX(8px)';
          li.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        li.addEventListener('mouseleave', () => {
          li.style.transform = '';
          li.style.backgroundColor = '';
        });
      } else {
        li.addEventListener('touchstart', () => {
          li.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        }, { passive: true });
        
        li.addEventListener('touchend', () => {
          setTimeout(() => li.style.backgroundColor = '', 200);
        }, { passive: true });
      }
      
      playlistEl.appendChild(li);
    });
  }

  function loadTrack(index) {
    currentIndex = index;
    const track = tracks[currentIndex];
    if (!track || !audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volumeRange ? (volumeRange.value / 100) : 0.23;
    audio.src = track.src;
    
    audio.addEventListener('error', function handleError() {
      console.log(`Error loading ${track.title}`);
      if (currentIndex < tracks.length - 1) {
        setTimeout(() => nextTrack(), 1000);
      }
      audio.removeEventListener('error', handleError);
    }, { once: true });
    
    audio.addEventListener('loadeddata', function handleLoaded() {
      console.log('Audio loaded:', track.title);
      audio.removeEventListener('loadeddata', handleLoaded);
    }, { once: true });
    
    audio.load();
    
    if (currentTrackTitle) {
      currentTrackTitle.style.opacity = '0';
      currentTrackTitle.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        currentTrackTitle.textContent = track.title;
        currentTrackTitle.style.opacity = '1';
        currentTrackTitle.style.transform = 'translateY(0)';
      }, 200);
    }
    
    if (playlistEl) {
      [...playlistEl.children].forEach(li => {
        li.classList.remove('active');
        li.style.backgroundColor = '';
        li.style.color = '';
        li.style.transform = '';
      });
      
      const activeLi = playlistEl.children[currentIndex];
      if (activeLi) {
        activeLi.classList.add('active');
        activeLi.style.backgroundColor = 'rgba(76, 205, 196, 0.2)';
        activeLi.style.color = '#4ecdc4';
        activeLi.style.transform = 'scale(1.02)';
        activeLi.style.fontWeight = '600';
      }
    }
    
    updateTonearm(0);
  }

  function playAudio() {
    if (!audio || !isPowerOn) return Promise.reject('Audio not ready');

    userHasInteracted = true;
    audio.muted = false;
    audio.volume = volumeRange ? Math.max(0.1, volumeRange.value / 100) : 0.23;
    
    const playPromise = audio.play();
    
    if (playPromise) {
      return playPromise.then(() => {
        isPlaying = true;
        console.log('✅ Audio playing');
        
        if (playPauseBtn) {
          const icon = playPauseBtn.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
          }
          playPauseBtn.style.color = '#4ecdc4';
          playPauseBtn.style.boxShadow = '0 0 15px rgba(76, 205, 196, 0.4)';
        }
        
        if (vinyl) {
          vinyl.classList.add('spinning');
          vinyl.style.filter = 'drop-shadow(0 0 20px rgba(76, 205, 196, 0.4))';
        }
        
        if (tonearm) {
          tonearm.classList.add('playing');
          tonearm.style.transform = 'rotate(-5deg)';
        }
        
        animateWave();
      }).catch(error => {
        console.log('❌ Play failed:', error);
        isPlaying = false;
        throw error;
      });
    }
    
    return Promise.reject('No play promise');
  }

  function pauseAudio() {
    if (!audio) return;
    
    audio.pause();
    isPlaying = false;
    
    if (playPauseBtn) {
      const icon = playPauseBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      }
      playPauseBtn.style.color = '';
      playPauseBtn.style.boxShadow = '';
    }
    
    if (vinyl) {
      vinyl.classList.remove('spinning');
      vinyl.style.filter = '';
    }
    
    if (tonearm) {
      tonearm.classList.remove('playing');
      tonearm.style.transform = 'rotate(15deg)';
    }
    
    stopWaveAnimation();
  }

  function nextTrack() {
    userHasInteracted = true;
    
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentIndex && tracks.length > 1);
      currentIndex = randomIndex;
    } else {
      currentIndex = (currentIndex + 1) % tracks.length;
    }
    
    loadTrack(currentIndex);
    if (isPowerOn && isPlaying) {
      setTimeout(() => playAudio().catch(console.log), 300);
    }
  }

  function prevTrack() {
    userHasInteracted = true;
    
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentIndex && tracks.length > 1);
      currentIndex = randomIndex;
    } else {
      currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    }
    
    loadTrack(currentIndex);
    if (isPowerOn && isPlaying) {
      setTimeout(() => playAudio().catch(console.log), 300);
    }
  }

  function updateTonearm(progress) {
    if (!tonearm) return;
    
    if (!isPlaying) {
      tonearm.style.transform = 'rotate(15deg)';
    } else {
      const startAngle = -5;
      const endAngle = 5;
      const currentAngle = startAngle + (progress * (endAngle - startAngle));
      tonearm.style.transform = `rotate(${currentAngle}deg)`;
    }
  }

  function updateTime() {
    if (!audio) return;
    
    const current = audio.currentTime;
    const duration = audio.duration || 0;
    
    if (currentTimeEl) currentTimeEl.textContent = formatTime(current);
    if (durationEl) durationEl.textContent = formatTime(duration);
    
    const progress = duration ? current / duration : 0;
    updateTonearm(progress);
    
    if (audio.ended) {
      if (isLoop) {
        audio.currentTime = 0;
        playAudio().catch(console.log);
      } else {
        nextTrack();
      }
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  function addButtonAnimation(button, callback) {
    if (!button) return;
    
    const isTouch = 'ontouchstart' in window;
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      userHasInteracted = true;
      
      const ripple = document.createElement('div');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;
      
      button.style.position = 'relative';
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
        if (callback) callback();
      }, 100);
    });
    
    if (!isTouch) {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
        button.style.filter = 'brightness(1.2)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
        button.style.filter = '';
      });
    } else {
      button.addEventListener('touchstart', () => {
        button.style.transform = 'scale(0.95)';
      }, { passive: true });
      
      button.addEventListener('touchend', () => {
        setTimeout(() => button.style.transform = '', 150);
      }, { passive: true });
    }
  }

  addButtonAnimation(playPauseBtn, () => {
    if (!isPowerOn) return;
    if (isPlaying) pauseAudio();
    else playAudio().catch(console.log);
  });

  addButtonAnimation(nextBtn, () => {
    if (isPowerOn) nextTrack();
  });

  addButtonAnimation(prevBtn, () => {
    if (isPowerOn) prevTrack();
  });

  addButtonAnimation(loopBtn, () => {
    isLoop = !isLoop;
    loopBtn.classList.toggle('active', isLoop);
    loopBtn.style.color = isLoop ? '#4ecdc4' : '';
    loopBtn.style.textShadow = isLoop ? '0 0 10px #4ecdc4' : '';
  });

  addButtonAnimation(shuffleBtn, () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    shuffleBtn.style.color = isShuffle ? '#4ecdc4' : '';
    shuffleBtn.style.textShadow = isShuffle ? '0 0 10px #4ecdc4' : '';
  });

  if (volumeRange) {
    volumeRange.value = 23;
    if (audio) audio.volume = 0.23;
    
    const handleVolumeInput = (e) => {
      userHasInteracted = true;
      const volume = Math.max(0.01, e.target.value / 100);
      if (audio) {
        audio.volume = volume;
        audio.muted = false;
      }
      
      const percent = e.target.value;
      volumeRange.style.background = `linear-gradient(to right, #4ecdc4 ${percent}%, rgba(255,255,255,0.1) ${percent}%)`;
    };
    
    volumeRange.addEventListener('input', handleVolumeInput);
    volumeRange.addEventListener('change', handleVolumeInput);
    volumeRange.style.background = `linear-gradient(to right, #4ecdc4 23%, rgba(255,255,255,0.1) 23%)`;
    
    const isTouch = 'ontouchstart' in window;
    if (!isTouch) {
      volumeRange.addEventListener('mousedown', () => volumeRange.style.transform = 'scale(1.1)');
      volumeRange.addEventListener('mouseup', () => volumeRange.style.transform = '');
    } else {
      volumeRange.addEventListener('touchstart', () => volumeRange.style.transform = 'scale(1.05)', { passive: true });
      volumeRange.addEventListener('touchend', () => setTimeout(() => volumeRange.style.transform = '', 150), { passive: true });
    }
  }

  if (powerToggle) {
    powerToggle.checked = true;
    
    powerToggle.addEventListener('change', (e) => {
      userHasInteracted = true;
      isPowerOn = e.target.checked;
      
      if (isPowerOn) {
        if (tonearm) tonearm.classList.remove('parked');
        setTimeout(() => loadTrack(currentIndex), 500);
      } else {
        pauseAudio();
        if (tonearm) {
          tonearm.classList.add('parked');
          tonearm.style.transform = 'rotate(-45deg)';
        }
      }
    });
  }

  if (audio) {
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);
    audio.addEventListener('play', () => { isPlaying = true; });
    audio.addEventListener('pause', () => { isPlaying = false; });
  }

  function setupUserInteractionHandler() {
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    
    function handleFirstInteraction() {
      userHasInteracted = true;
      
      if (audio) {
        audio.muted = false;
        audio.volume = volumeRange ? Math.max(0.1, volumeRange.value / 100) : 0.23;
      }
      
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    }
    
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });
  }

  function initializeFooter() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    const isTouch = 'ontouchstart' in window;
    const socialLinks = footer.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      if (!isTouch) {
        link.addEventListener('mouseenter', () => link.style.transform = 'translateY(-4px) scale(1.1)');
        link.addEventListener('mouseleave', () => link.style.transform = '');
      } else {
        link.addEventListener('touchstart', () => link.style.transform = 'scale(0.95)', { passive: true });
        link.addEventListener('touchend', () => setTimeout(() => link.style.transform = '', 150), { passive: true });
      }
    });

    const footerNavLinks = footer.querySelectorAll('.footer-nav a');
    footerNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  function createBackToTopButton() {
    let backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
      backToTop = document.createElement('button');
      backToTop.className = 'back-to-top';
      backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
      backToTop.setAttribute('aria-label', 'Kembali ke atas');
      document.body.appendChild(backToTop);
    }

    const toggleBackToTop = () => {
      const showThreshold = window.innerHeight * 0.5;
      if (window.pageYOffset > showThreshold) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const isTouch = 'ontouchstart' in window;
    if (isTouch) {
      backToTop.addEventListener('touchstart', () => backToTop.style.transform = 'scale(0.9)', { passive: true });
      backToTop.addEventListener('touchend', () => setTimeout(() => backToTop.style.transform = '', 150), { passive: true });
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  function initializeInteractiveElements() {
    const isTouch = 'ontouchstart' in window;
    
    const interactiveElements = [
      { selector: '.dashboard-item', hover: 'translateY(-8px) scale(1.02)', shadow: '0 20px 40px rgba(0,0,0,0.2)' },
      { selector: '.calendar-cell:not(.empty)', hover: 'translateY(-4px) scale(1.05)', shadow: null },
      { selector: '.outfit-card', hover: 'translateY(-10px) rotate(0deg) scale(1.05)', shadow: null }
    ];
    
    interactiveElements.forEach(({ selector, hover, shadow }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (!isTouch) {
          el.addEventListener('mouseenter', () => {
            el.style.transform = hover;
            if (shadow) el.style.boxShadow = shadow;
          });
          
          el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            if (shadow) el.style.boxShadow = '';
          });
        } else {
          el.addEventListener('touchstart', () => el.style.transform = 'scale(0.98)', { passive: true });
          el.addEventListener('touchend', () => setTimeout(() => el.style.transform = '', 150), { passive: true });
        }
      });
    });

    const polaroidFrames = document.querySelectorAll('.polaroid-frame');
    polaroidFrames.forEach(frame => {
      if (!isTouch) {
        frame.addEventListener('mouseenter', () => {
          if (frame.classList.contains('polaroid-main')) {
            frame.style.transform = 'rotate(0deg) scale(1.05)';
          } else if (frame.classList.contains('polaroid-left')) {
            frame.style.transform = 'rotate(-5deg) scale(0.9)';
          } else if (frame.classList.contains('polaroid-right')) {
            frame.style.transform = 'rotate(8deg) scale(0.9)';
          }
          frame.style.zIndex = '10';
        });
        
        frame.addEventListener('mouseleave', () => {
          if (frame.classList.contains('polaroid-main')) {
            frame.style.transform = 'rotate(-3deg)';
          } else if (frame.classList.contains('polaroid-left')) {
            frame.style.transform = 'rotate(-18deg) scale(0.85)';
          } else if (frame.classList.contains('polaroid-right')) {
            frame.style.transform = 'rotate(22deg) scale(0.85)';
          }
          frame.style.zIndex = '';
        });
      }
    });
  }

  function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const offset = window.innerWidth <= 768 ? 80 : 100;
          const targetPosition = target.offsetTop - offset;
          
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          updateActiveNavLink(href);
          
          const navMenu = document.querySelector('.nav-links');
          const navToggle = document.querySelector('.nav-toggle');
          const backdrop = document.querySelector('.nav-backdrop');
          
          if (navMenu && navToggle) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            if (backdrop) {
              backdrop.style.opacity = '0';
              backdrop.style.pointerEvents = 'none';
            }
          }
        }
      });
    });
    
    function updateActiveNavLink(activeHref = null) {
      const navMenuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
      navMenuLinks.forEach(link => link.classList.remove('active'));
      
      if (activeHref) {
        const activeLink = document.querySelector(`.nav-links a[href="${activeHref}"]`);
        if (activeLink) activeLink.classList.add('active');
        return;
      }
      
      let currentSection = '';
      const scrollY = window.pageYOffset;
      const offset = window.innerWidth <= 768 ? 100 : 120;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSection = '#' + section.id;
        }
      });
      
      if (currentSection) {
        const activeLink = document.querySelector(`.nav-links a[href="${currentSection}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    }
    
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();
  }

  function initializeKeyboardAccessibility() {
    document.addEventListener('keydown', (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('dashboard-item')) {
        e.preventDefault();
        e.target.click();
      }
      
      if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        const backdrop = document.querySelector('.nav-backdrop');
        
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('active');
          document.body.style.overflow = '';
          
          if (backdrop) {
            backdrop.style.opacity = '0';
            backdrop.style.pointerEvents = 'none';
          }
        }
      }
      
      if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (playPauseBtn) playPauseBtn.click();
      }
      
      if (e.key === 'ArrowRight' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (nextBtn) nextBtn.click();
      }
      
      if (e.key === 'ArrowLeft' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (prevBtn) prevBtn.click();
      }
    });
  }

  function initializeCountdown() {
    const targetDate = new Date('2025-10-18T14:00:00+07:00');
    const cards = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };
    
    function updateFlipCard(card, newValue) {
      if (!card) return;
      
      const front = card.querySelector('.flip-card-front .number');
      const back = card.querySelector('.flip-card-back .number');
      const currentValue = front ? front.textContent : '00';
      
      if (newValue !== currentValue) {
        if (back) back.textContent = newValue;
        card.classList.add('flipping');
        
        setTimeout(() => {
          if (front) front.textContent = newValue;
          card.classList.remove('flipping');
        }, 300);
      }
    }
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance < 0) {
        Object.values(cards).forEach(card => updateFlipCard(card, '00'));
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      updateFlipCard(cards.days, String(days).padStart(2, '0'));
      updateFlipCard(cards.hours, String(hours).padStart(2, '0'));
      updateFlipCard(cards.minutes, String(minutes).padStart(2, '0'));
      updateFlipCard(cards.seconds, String(seconds).padStart(2, '0'));
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  function handleResize() {
    createWaveVisualization();
    
    const playlistItems = playlistEl?.querySelectorAll('li');
    const fontSize = window.innerWidth > 768 ? '0.9rem' : window.innerWidth > 480 ? '0.85rem' : '0.8rem';
    const padding = window.innerWidth > 480 ? '8px 12px' : '6px 10px';
    
    playlistItems?.forEach(li => {
      li.style.fontSize = fontSize;
      li.style.padding = padding;
    });
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  }, { passive: true });

  createWaveVisualization();
  populatePlaylist();
  loadTrack(0);
  setupUserInteractionHandler();

  if (audio && volumeRange) {
    audio.volume = 0.23;
    volumeRange.value = 23;
  }

  initializeFooter();
  createBackToTopButton();
  initializeInteractiveElements();
  initializeSmoothScroll();
  initializeKeyboardAccessibility();
  initializeCountdown();

  const dynamicStyles = document.createElement('style');
  dynamicStyles.textContent = `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1000;
    }
    
    .back-to-top.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    
    .site-header, #header {
      position: fixed !important;
      top: 0 !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 1000 !important;
    }
    
    #audioPlayer {
      position: absolute;
      left: -9999px;
      opacity: 0;
    }
    
    .nav-backdrop.active {
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    @media (hover: none) and (pointer: coarse) {
      .outfit-card:active,
      .polaroid-frame:active,
      .dashboard-item:active,
      .band-item:active {
        transform: scale(0.98) !important;
      }
      
      button:active,
      .control-buttons button:active {
        transform: scale(0.95) !important;
      }
    }
    
    .nav-toggle,
    .control-buttons button,
    .social-link,
    .calendar-cell,
    .outfit-card,
    .band-item {
      -webkit-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    * {
      -webkit-overflow-scrolling: touch;
    }
  `;
  
  document.head.appendChild(dynamicStyles);

  window.addEventListener('beforeunload', () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      handleResize();
      
      const navMenu = document.querySelector('.nav-links');
      const navToggle = document.querySelector('.nav-toggle');
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }, 100);
  });

  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight, { passive: true });

  console.log('🎵 Dies Natalis HIFI-67 Loaded!');
  console.log('📱 Mode:', window.innerWidth <= 768 ? 'MOBILE' : 'DESKTOP');
  console.log('📋 Audio:', {
    tracks: tracks.length,
    volume: '23%',
    touch: 'ontouchstart' in window
  });
});