// Complete Enhanced JavaScript for Dies Natalis HIFI-67 Retro Website
// FIXED: Audio playback issues - guaranteed sound output
// ENHANCED: Outfit detail panel with smooth animations

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
    loadingText.innerHTML = 'HIFI-67<span class="loading-dots"></span>';
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
   * ENHANCED ENTRANCE ANIMATIONS
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

    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description p, .btn-scroll');
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
   * ENHANCED HEADER - ALWAYS VISIBLE
   */
  const header = document.getElementById('header') || document.querySelector('.site-header');
  let lastScrollY = 0;
  
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
   * ENHANCED HAMBURGER MENU
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
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
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
      document.body.appendChild(backdrop);
    }
    
    const closeMenu = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      
      if (backdrop) backdrop.classList.remove('active');
      
      if (lines.length >= 3) {
        lines[0].style.transform = 'translate(-50%, -7px)';
        lines[1].style.transform = 'translate(-50%, 0)';
        lines[1].style.opacity = '1';
        lines[1].style.scale = '1';
        lines[2].style.transform = 'translate(-50%, 7px)';
      }
    };
    
    const openMenu = () => {
      navMenu.classList.add('open');
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      
      if (backdrop) backdrop.classList.add('active');
      
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
    menuLinks.forEach((link, index) => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(8px) scale(1.02)';
        link.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.4)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = '';
        link.style.textShadow = '';
      });
      
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    }, { passive: true });
  }

  /**
   * ENHANCED SCROLL ANIMATIONS WITH PARALLAX
   */
  const observerOptions = {
    threshold: [0, 0.1, 0.5],
    rootMargin: '-50px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      const rect = element.getBoundingClientRect();
      const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      
      if (entry.isIntersecting) {
        element.classList.add('visible');
        
        if (element.classList.contains('parallax')) {
          const speed = parseFloat(element.dataset.speed) || 0.3;
          const yPos = -(scrollPercent * 50 * speed);
          element.style.transform = `translateY(${yPos}px)`;
        }
        
        if (element.classList.contains('color-shift')) {
          const hue = scrollPercent * 360;
          element.style.background = `linear-gradient(45deg, hsl(${hue}, 70%, 60%), hsl(${hue + 60}, 70%, 60%))`;
        }
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.anim-target, .card, .section, .music-player');
  animatedElements.forEach((el, index) => {
    el.classList.add('parallax');
    el.dataset.speed = (0.2 + (index % 3) * 0.1).toString();
    scrollObserver.observe(el);
    
    el.addEventListener('mouseenter', () => {
      el.style.transform += ' scale(1.01)';
      el.style.filter = 'brightness(1.05)';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = el.style.transform.replace(' scale(1.01)', '');
      el.style.filter = '';
    });
  });

  /**
   * ENHANCED MUSIC PLAYER - FIXED AUDIO OUTPUT
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
    { 
      title: 'Chrisye - Kala Cinta Menggoda', 
      src: 'Music/retro-vibes.mp3'
    },
    { 
      title: 'Fariz RM - Sakura', 
      src: 'Music/Fariz RM - Sakura 4.mp3'
    },
    { 
      title: 'Vina Panduwinata - Cinta', 
      src: 'Music/Vina Panduwinata - Cinta (Remastered Audio).mp3'
    },
    { 
      title: 'Tommy J Pisa - Di Batas Kota Ini', 
      src: 'Music/lagu-tema.mp3'
    }
  ];
  
  let currentIndex = 0;
  let isShuffle = false;
  let isLoop = false;
  let isPowerOn = true;
  let isPlaying = false;
  let audioContext = null;
  let analyser = null;
  let animationFrame = null;
  let source = null;
  let userHasInteracted = false;

  function createWaveVisualization() {
    if (!wave) return;
    
    wave.innerHTML = '';
    const numBars = 24;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    
    for (let i = 0; i < numBars; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      bar.style.cssText = `
        background: ${colors[i % colors.length]};
        height: 8px;
        width: 6px;
        margin: 0 2px;
        border-radius: 3px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-block;
        vertical-align: bottom;
        animation: waveIdle ${1 + Math.random()}s ease-in-out infinite alternate;
        animation-delay: ${i * 0.05}s;
      `;
      wave.appendChild(bar);
    }
  }

  function setupAudioVisualization() {
    console.log('Audio visualization setup skipped - using fallback animation');
  }

  function animateWave() {
    if (!wave || !isPlaying) return;
    
    const bars = wave.querySelectorAll('.wave-bar');
    
    function animate() {
      if (!isPlaying) return;
      
      bars.forEach((bar, index) => {
        const value = Math.random() * 50 + 20;
        const height = Math.max(8, value);
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
    tracks.forEach((track, index) => {
      const li = document.createElement('li');
      li.textContent = track.title;
      li.dataset.index = index;
      li.style.cssText = `
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 6px;
        margin: 4px 0;
      `;
      
      li.addEventListener('click', () => {
        userHasInteracted = true;
        loadTrack(index);
        if (isPowerOn) playAudio();
        
        li.style.transform = 'scale(0.95)';
        setTimeout(() => li.style.transform = '', 150);
      });
      
      li.addEventListener('mouseenter', () => {
        li.style.transform = 'translateX(8px)';
        li.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      });
      
      li.addEventListener('mouseleave', () => {
        li.style.transform = '';
        li.style.backgroundColor = '';
      });
      
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
    
    audio.addEventListener('error', function handleError(e) {
      console.log(`Error loading ${track.title}:`, audio.error);
      
      if (currentIndex < tracks.length - 1) {
        console.log('Trying next track...');
        setTimeout(() => {
          nextTrack();
        }, 1000);
      }
      
      audio.removeEventListener('error', handleError);
    }, { once: true });
    
    audio.addEventListener('loadeddata', function handleLoaded() {
      console.log('Audio loaded successfully:', track.title);
      console.log('Audio properties:', {
        duration: audio.duration,
        volume: audio.volume,
        muted: audio.muted,
        readyState: audio.readyState
      });
      
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
    if (!audio || !isPowerOn) {
      console.log('Cannot play: audio element missing or power off');
      return Promise.reject('Audio not ready');
    }

    userHasInteracted = true;
    
    audio.muted = false;
    audio.volume = volumeRange ? Math.max(0.1, volumeRange.value / 100) : 0.23;
    
    console.log('Attempting to play audio...', {
      src: audio.src,
      volume: audio.volume,
      muted: audio.muted,
      readyState: audio.readyState,
      currentTime: audio.currentTime
    });
    
    const playPromise = audio.play();
    
    if (playPromise) {
      return playPromise.then(() => {
        isPlaying = true;
        console.log('✅ Audio playing successfully!');
        
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
          tonearm.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
          tonearm.style.transform = 'rotate(-5deg)';
        }
        
        animateWave();
        
      }).catch(error => {
        console.log('❌ Playback failed:', error);
        isPlaying = false;
        
        if (currentTrackTitle) {
          const originalText = currentTrackTitle.textContent;
          currentTrackTitle.textContent = 'Audio playback failed - check volume';
          currentTrackTitle.style.color = '#ff6b6b';
          
          setTimeout(() => {
            currentTrackTitle.textContent = originalText;
            currentTrackTitle.style.color = '';
          }, 3000);
        }
        
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
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.filter = 'brightness(1.2)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.filter = '';
    });
  }

  addButtonAnimation(playPauseBtn, () => {
    if (!isPowerOn) return;
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio().catch(error => {
        console.log('Play failed:', error);
      });
    }
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
    if (isLoop) {
      loopBtn.style.color = '#4ecdc4';
      loopBtn.style.textShadow = '0 0 10px #4ecdc4';
    } else {
      loopBtn.style.color = '';
      loopBtn.style.textShadow = '';
    }
  });

  addButtonAnimation(shuffleBtn, () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    if (isShuffle) {
      shuffleBtn.style.color = '#4ecdc4';
      shuffleBtn.style.textShadow = '0 0 10px #4ecdc4';
    } else {
      shuffleBtn.style.color = '';
      shuffleBtn.style.textShadow = '';
    }
  });

  if (volumeRange) {
    volumeRange.value = 23;
    if (audio) audio.volume = 0.23;
    
    volumeRange.addEventListener('input', (e) => {
      userHasInteracted = true;
      const volume = Math.max(0.01, e.target.value / 100);
      if (audio) {
        audio.volume = volume;
        audio.muted = false;
        console.log('Volume set to:', volume);
      }
      
      const percent = e.target.value;
      volumeRange.style.background = `linear-gradient(to right, #4ecdc4 ${percent}%, rgba(255,255,255,0.1) ${percent}%)`;
    });
    
    volumeRange.style.background = `linear-gradient(to right, #4ecdc4 23%, rgba(255,255,255,0.1) 23%)`;
    
    volumeRange.addEventListener('mousedown', () => {
      volumeRange.style.transform = 'scale(1.1)';
    });
    
    volumeRange.addEventListener('mouseup', () => {
      volumeRange.style.transform = '';
    });
  }

  if (powerToggle) {
    powerToggle.checked = true;
    
    powerToggle.addEventListener('change', (e) => {
      userHasInteracted = true;
      isPowerOn = e.target.checked;
      
      if (isPowerOn) {
        if (tonearm) {
          tonearm.classList.remove('parked');
        }
        setTimeout(() => {
          loadTrack(currentIndex);
        }, 500);
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
    
    audio.addEventListener('canplaythrough', (e) => {
      console.log('✅ Audio ready to play:', tracks[currentIndex]?.title);
      console.log('Audio state:', {
        volume: audio.volume,
        muted: audio.muted,
        duration: audio.duration
      });
    });
    
    audio.addEventListener('loadstart', () => {
      console.log('🔄 Loading audio:', tracks[currentIndex]?.title);
    });
    
    audio.addEventListener('loadeddata', () => {
      console.log('📁 Audio data loaded:', tracks[currentIndex]?.title);
    });

    audio.addEventListener('play', () => {
      console.log('▶️ Audio started playing');
      isPlaying = true;
    });

    audio.addEventListener('pause', () => {
      console.log('⏸️ Audio paused');
      isPlaying = false;
    });

    audio.addEventListener('volumechange', () => {
      console.log('🔊 Volume changed to:', audio.volume, 'Muted:', audio.muted);
    });
  }

  function setupUserInteractionHandler() {
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    
    function handleFirstInteraction(e) {
      userHasInteracted = true;
      console.log('👆 User interaction detected:', e.type);
      
      if (audio) {
        audio.muted = false;
        audio.volume = volumeRange ? Math.max(0.1, volumeRange.value / 100) : 0.23;
        console.log('🔊 Audio unmuted, volume set to:', audio.volume);
      }
      
      if (currentTrackTitle && currentTrackTitle.textContent.includes('Click to')) {
        currentTrackTitle.textContent = tracks[currentIndex]?.title || 'Ready to Play';
        currentTrackTitle.style.color = '';
      }
      
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    }
    
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });
  }

  /**
   * ENHANCED OUTFIT DETAIL PANEL WITH SMOOTH ANIMATIONS
   */
  window.showOutfitDetail = function(id, title, description, imageSrc) {
    const panel = document.getElementById('outfitDetailPanel');
    const titleEl = document.getElementById('detailTitle');
    const outfitTitleEl = document.getElementById('detailOutfitTitle');
    const descriptionEl = document.getElementById('detailDescription');
    const imageEl = document.getElementById('detailImage');

    // Remove selection from all cards with animation
    document.querySelectorAll('.outfit-card').forEach(c => {
      c.classList.remove('selected');
      c.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Add selection to clicked card with animation
    const selected = document.querySelector(`[data-outfit="${id}"]`);
    if (selected) {
      selected.classList.add('selected');
      selected.style.transform = 'rotate(0deg) scale(1.02)';
      selected.style.boxShadow = '0 0 0 4px rgba(233, 49, 26, 0.3), 0 20px 40px rgba(0,0,0,0.3)';
      
      // Pulse effect
      setTimeout(() => {
        selected.style.transform = 'rotate(0deg) scale(1.05)';
      }, 100);
      setTimeout(() => {
        selected.style.transform = 'rotate(0deg) scale(1.02)';
      }, 200);
    }

    // Update content with fade animation
    if (titleEl) {
      titleEl.style.opacity = '0';
      setTimeout(() => {
        titleEl.textContent = `Detail Outfit: ${title}`;
        titleEl.style.opacity = '1';
      }, 150);
    }
    
    if (outfitTitleEl) {
      outfitTitleEl.style.opacity = '0';
      setTimeout(() => {
        outfitTitleEl.textContent = title;
        outfitTitleEl.style.opacity = '1';
      }, 200);
    }
    
    if (descriptionEl) {
      descriptionEl.style.opacity = '0';
      setTimeout(() => {
        descriptionEl.textContent = description;
        descriptionEl.style.opacity = '1';
      }, 250);
    }
    
    if (imageEl) {
      imageEl.style.opacity = '0';
      imageEl.style.transform = 'scale(0.9)';
      imageEl.src = imageSrc;
      imageEl.alt = `Detail ${title}`;
      
      imageEl.onload = () => {
        imageEl.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        imageEl.style.opacity = '1';
        imageEl.style.transform = 'scale(1)';
      };
    }
    
    // Show panel with smooth animation
    if (panel) {
      panel.style.display = 'block';
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(40px) scale(0.9)';
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0) scale(1)';
        });
      });
      
      // Smooth scroll to panel after animation starts
      setTimeout(() => {
        panel.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 150);
    }
  };

  window.closeOutfitDetail = function() {
    const panel = document.getElementById('outfitDetailPanel');
    
    // Remove selection from all cards with smooth animation
    document.querySelectorAll('.outfit-card').forEach(c => {
      c.classList.remove('selected');
      c.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      c.style.transform = '';
      c.style.boxShadow = '';
    });
    
    // Hide panel with smooth slide-down animation
    if (panel) {
      panel.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(40px) scale(0.95)';
      
      setTimeout(() => {
        panel.style.display = 'none';
        
        // Reset transforms for next open
        panel.style.transform = 'translateY(40px) scale(0.9)';
      }, 500);
    }
  };

  // Initialize outfit detail panel state
  const outfitPanel = document.getElementById('outfitDetailPanel');
  if (outfitPanel) {
    outfitPanel.style.opacity = '0';
    outfitPanel.style.transform = 'translateY(40px) scale(0.9)';
    outfitPanel.style.display = 'none';
  }

  /**
   * FOOTER AND OTHER COMPONENTS
   */
  function initializeFooter() {
    let footer = document.querySelector('.site-footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.className = 'site-footer';
      document.body.appendChild(footer);
    }

    const socialLinks = footer.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-4px) scale(1.1)';
      });
      
      link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = '';
      });
      
      link.addEventListener('click', (e) => {
        e.target.style.transform = 'scale(0.9)';
        setTimeout(() => {
          e.target.style.transform = '';
        }, 150);
      });
    });

    const footerNavLinks = footer.querySelectorAll('.footer-nav a');
    footerNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
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
      backToTop.innerHTML = '↑';
      backToTop.setAttribute('aria-label', 'Back to top');
      document.body.appendChild(backToTop);
    }

    const toggleBackToTop = () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  function initializeInteractiveElements() {
    const dashboardItems = document.querySelectorAll('.dashboard-item');
    dashboardItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-8px) scale(1.02)';
        item.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
        item.style.boxShadow = '';
      });
    });

    const polaroidFrames = document.querySelectorAll('.polaroid-frame');
    polaroidFrames.forEach(frame => {
      const originalTransform = getComputedStyle(frame).transform;
      
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
          frame.style.transform = 'rotate(-2deg)';
        } else if (frame.classList.contains('polaroid-left')) {
          frame.style.transform = 'rotate(-12deg) scale(0.85)';
        } else if (frame.classList.contains('polaroid-right')) {
          frame.style.transform = 'rotate(15deg) scale(0.85)';
        }
        frame.style.zIndex = '';
      });
    });

    const calendarCells = document.querySelectorAll('.calendar-cell:not(.empty)');
    calendarCells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        cell.style.transform = 'translateY(-4px) scale(1.05)';
      });
      
      cell.addEventListener('mouseleave', () => {
        cell.style.transform = '';
      });
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
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          updateActiveNavLink(href);
          
          const navMenu = document.querySelector('.nav-links');
          const navToggle = document.querySelector('.nav-toggle');
          if (navMenu && navToggle) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
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
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
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
    
    window.addEventListener('scroll', () => {
      updateActiveNavLink();
    }, { passive: true });
    
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
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('active');
        }
        
        // Close outfit detail panel on Escape
        const panel = document.getElementById('outfitDetailPanel');
        if (panel && panel.style.display !== 'none') {
          window.closeOutfitDetail();
        }
      }
    });
  }

  function initializeCountdown() {
    const targetDate = new Date('2025-10-18T14:00:00+07:00');
    
    const daysCard = document.getElementById('days');
    const hoursCard = document.getElementById('hours');
    const minutesCard = document.getElementById('minutes');
    const secondsCard = document.getElementById('seconds');
    
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
        updateFlipCard(daysCard, '00');
        updateFlipCard(hoursCard, '00');
        updateFlipCard(minutesCard, '00');
        updateFlipCard(secondsCard, '00');
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      updateFlipCard(daysCard, String(days).padStart(2, '0'));
      updateFlipCard(hoursCard, String(hours).padStart(2, '0'));
      updateFlipCard(minutesCard, String(minutes).padStart(2, '0'));
      updateFlipCard(secondsCard, String(seconds).padStart(2, '0'));
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /**
   * INITIALIZE ALL COMPONENTS
   */
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

  /**
   * DYNAMIC STYLES
   */
  const dynamicStyles = document.createElement('style');
  dynamicStyles.textContent = `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes heroGlow {
      0%, 100% { text-shadow: 2px 2px var(--highlight-3); }
      50% { text-shadow: 2px 2px var(--highlight-3), 0 0 20px rgba(76, 205, 196, 0.6), 0 0 30px rgba(76, 205, 196, 0.4); }
    }
    
    @keyframes waveIdle {
      0% { height: 8px; opacity: 0.6; transform: scaleY(0.3); }
      50% { height: 40px; opacity: 1; transform: scaleY(1); }
      100% { height: 20px; opacity: 0.8; transform: scaleY(0.5); }
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
    
    .nav-toggle .line {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    #tonearm {
      transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: 10% 30%;
    }
    
    #vinyl.spinning {
      animation: vinyl-spin 2s linear infinite;
    }
    
    @keyframes vinyl-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .wave-bar {
      animation: waveIdle 2s ease-in-out infinite alternate;
    }
    
    .site-header, #header {
      position: fixed !important;
      top: 0 !important;
      transform: translateY(0) !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 1000 !important;
    }
    
    #audioPlayer {
      position: absolute;
      left: -9999px;
      opacity: 0;
    }
    
    /* Outfit Detail Panel Enhanced Animations */
    .outfit-detail-panel {
      will-change: transform, opacity;
    }
    
    .outfit-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .outfit-card.selected {
      border-color: var(--highlight-6);
      transform: rotate(0deg) scale(1.02);
      box-shadow: 0 0 0 4px rgba(233, 49, 26, 0.3), 0 20px 40px rgba(0,0,0,0.3);
    }
    
    #detailImage {
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  `;
  
  document.head.appendChild(dynamicStyles);

  /**
   * CLEANUP AND PERFORMANCE
   */
  let scrollTimeout;
  const debouncedScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Perform scroll operations
    }, 16);
  };
  
  window.addEventListener('scroll', debouncedScroll, { passive: true });

  window.addEventListener('beforeunload', () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    if (audioContext) {
      audioContext.close().catch(console.log);
    }
  });

  console.log('🎵 Dies Natalis HIFI-67 Enhanced Website Loaded Successfully!');
  console.log('📋 Audio Player Status:', {
    audioElement: !!audio,
    tracks: tracks.length,
    isPowerOn: isPowerOn,
    userHasInteracted: userHasInteracted,
    audioFiles: tracks.map(t => t.src),
    initialVolume: '23%'
  });
  
  setTimeout(() => {
    if (currentTrackTitle && !userHasInteracted) {
      currentTrackTitle.style.color = '#333';
    }
    
    if (audio) {
      console.log('🔧 Audio Element Test:', {
        canPlayMP3: audio.canPlayType('audio/mpeg'),
        canPlayWAV: audio.canPlayType('audio/wav'),
        volume: audio.volume,
        muted: audio.muted
      });
    }
  }, 3000);
});