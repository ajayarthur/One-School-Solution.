/* ==========================================================================
   ONE SCHOOL SOLUTION (OS²) — MAIN JAVASCRIPT ENGINE
   Realistic 3D Cloud Simulation, Scroll-Linked Cinematic Fly-Through, Interactive Simulators & TTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  try { initNavbarScroll(); } catch (e) { console.error('initNavbarScroll error:', e); }
  try { initCircularCarousel(); } catch (e) { console.error('initCircularCarousel error:', e); }
  try { initCloudSimulation(); } catch (e) { console.error('initCloudSimulation error:', e); }
  try { initScrollTransitions(); } catch (e) { console.error('initScrollTransitions error:', e); }
  try { initRoleTabs(); } catch (e) { console.error('initRoleTabs error:', e); }
  try { initExperienceSimulators(); } catch (e) { console.error('initExperienceSimulators error:', e); }
  try { initInteractiveCounters(); } catch (e) { console.error('initInteractiveCounters error:', e); }
  try { initDemoModal(); } catch (e) { console.error('initDemoModal error:', e); }
});

/* ==========================================================================
   1. NAVBAR SCROLL INTERACTION
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. CIRCULAR ROTATING CARD CAROUSEL (4 Atmospheric Cards in 3D Orbit & Expandable Details)
   ========================================================================== */
const ATMOSPHERE_CARDS_DATA = [
  {
    atmosphere: 'morning',
    timeLabel: 'Morning • 06:00 AM',
    roleBadge: 'Complete Student Information',
    title: 'Student Profile',
    highlightBadge: 'Unified Student Dossier • Instant Academic & Personal Records',
    bannerImg: 'img/time-morning.jpg',
    iconClass: 'fas fa-user-graduate',
    desc: 'Access student details, personal information, class, section, parent details and academic records in one place.',
    specs: [
      {
        title: 'Personal & Family Dossier',
        desc: 'Comprehensive student profile with blood group, emergency contacts, parent/guardian details, and home address.'
      },
      {
        title: 'Class, Section & Roll Register',
        desc: 'Dynamic enrollment records with academic year tracking, class teacher assignment, and House division.'
      },
      {
        title: 'Academic History & Growth',
        desc: 'Consolidated report cards, term test transcripts, past grade progression, and cumulative GPA records.'
      },
      {
        title: 'Document & KYC Vault',
        desc: 'Encrypted storage for birth certificates, transfer certificates (TC), immunization records, and admission files.'
      },
      {
        title: 'Medical & Dietary Notes',
        desc: 'Vital health records, known allergies, chronic conditions, and emergency medical protocols accessible to school nurses.'
      },
      {
        title: 'Achievements & Extracurriculars',
        desc: 'Badges, sports representations, inter-school awards, and leadership roles recorded chronologically.'
      }
    ],
    metrics: [
      { num: '360°', lbl: 'Student View' },
      { num: '100%', lbl: 'Digital KYC' },
      { num: 'Instant', lbl: 'Record Search' },
      { num: '<1s', lbl: 'Profile Retrieval' }
    ],
    actionText: 'Explore Student Experience',
    actionHref: '#experience',
    actionIcon: 'fas fa-user-graduate'
  },
  {
    atmosphere: 'afternoon',
    timeLabel: 'Afternoon • 12:30 PM',
    roleBadge: 'Daily Attendance Tracking',
    title: 'Student Attendance',
    highlightBadge: 'Real-Time Attendance Sync • Instant Absentee SMS Alerts',
    bannerImg: 'img/time-afternoon.jpg',
    iconClass: 'fas fa-calendar-check',
    desc: 'Monitor daily attendance, view attendance history and track the student\'s attendance percentage.',
    specs: [
      {
        title: '30-Second Classroom Marking',
        desc: 'One-tap roll call for teachers with instant present, absent, late, and half-day status toggles.'
      },
      {
        title: 'Live Parent Notifications',
        desc: 'Automated WhatsApp and SMS alerts dispatched instantly to parents the moment a student is marked absent.'
      },
      {
        title: 'Monthly & Term Percentage Analytics',
        desc: 'Continuous attendance percentage monitoring with visual warnings when falling below statutory thresholds.'
      },
      {
        title: 'Leave Application & Approvals',
        desc: 'Digital leave submission workflow for parents with medical slip uploads and principal sign-off.'
      },
      {
        title: 'Biometric & RFID Bus Integration',
        desc: 'Optional RFID/NFC gate and bus boarding log synchronization with GPS time-stamping.'
      },
      {
        title: 'Subject-Wise & Period Attendance',
        desc: 'Detailed period-by-period tracking for secondary and higher secondary grades.'
      }
    ],
    metrics: [
      { num: '30s', lbl: 'Roll Call Speed' },
      { num: 'Real-Time', lbl: 'Parent SMS Alert' },
      { num: '99.9%', lbl: 'Tracking Accuracy' },
      { num: '0', lbl: 'Paper Registers' }
    ],
    actionText: 'Test Attendance Simulator',
    actionHref: '#experience',
    actionIcon: 'fas fa-calendar-check'
  },
  {
    atmosphere: 'evening',
    timeLabel: 'Evening • 05:00 PM',
    roleBadge: 'Simple & Transparent Payments',
    title: 'Fee Management',
    highlightBadge: 'Transparent Fee Engine • Instant Digital Receipts & Ledgers',
    bannerImg: 'img/time-evening.jpg',
    iconClass: 'fas fa-wallet',
    desc: 'View fee details, pending payments, payment history and fee receipts.',
    specs: [
      {
        title: 'Transparent Fee Breakdown',
        desc: 'Complete itemized fee structure showing tuition, transport, laboratory, examination, and annual facility fees.'
      },
      {
        title: 'Instant Online UPI & Card Payments',
        desc: 'Integrated gateway supporting UPI, NetBanking, debit/credit cards with zero manual reconciliation required.'
      },
      {
        title: 'Instant Downloadable Receipts',
        desc: 'GST-compliant digital receipts generated automatically and permanently accessible in parent portals.'
      },
      {
        title: 'Automated Due Reminders',
        desc: 'Polite scheduled WhatsApp & SMS payment reminders before due dates to minimize defaults and late penalties.'
      },
      {
        title: 'Instalment & Concession Plans',
        desc: 'Configurable multi-instalment payment plans, sibling discounts, and merit-based fee concessions.'
      },
      {
        title: 'Real-Time Admin Reconciliation',
        desc: 'Live ledger balances, outstanding dues tracking, and daily collection reports for accounts departments.'
      }
    ],
    metrics: [
      { num: '100%', lbl: 'Reconciled' },
      { num: 'Instant', lbl: 'Digital Receipt' },
      { num: '0%', lbl: 'Discrepancy' },
      { num: 'Secure', lbl: 'PCI-DSS Gateway' }
    ],
    actionText: 'Review Fee Solutions',
    actionHref: '#features',
    actionIcon: 'fas fa-wallet'
  },
  {
    atmosphere: 'night',
    timeLabel: 'Night • 10:00 PM',
    roleBadge: 'Stay Informed, Stay Connected',
    title: 'School Updates',
    highlightBadge: 'Instant Broadcast Pipeline • Circulars, Events & Exam Alerts',
    bannerImg: 'img/time-night.jpg',
    iconClass: 'fas fa-bell',
    desc: 'Receive school announcements, important notices, event updates, exam notifications and homework information.',
    specs: [
      {
        title: 'Digital Noticeboard & Circulars',
        desc: 'Instant broadcast of signed administrative circulars, holiday announcements, and emergency notices.'
      },
      {
        title: 'Exam Schedules & Date Sheets',
        desc: 'Centralized publishing of midterm, pre-board, and annual exam dates with downloadable syllabus PDFs.'
      },
      {
        title: 'Daily Homework & Classwork Feeds',
        desc: 'Teacher-posted assignments with attachments, voice notes, submission deadlines, and status tracking.'
      },
      {
        title: 'School Event & Activity Calendar',
        desc: 'Interactive calendar for sports day, annual concerts, parent-teacher meetings (PTM), and workshops.'
      },
      {
        title: 'Priority Urgent Broadcasts',
        desc: 'High-priority alert tones and push broadcasts for emergency school closures, bus delays, or severe weather alerts.'
      },
      {
        title: 'Two-Way Teacher-Parent Messaging',
        desc: 'Secure direct communication channels between parents and designated class teachers.'
      }
    ],
    metrics: [
      { num: 'Instant', lbl: 'Notice Broadcast' },
      { num: '100%', lbl: 'Parent Reach' },
      { num: '0', lbl: 'Lost Notices' },
      { num: '24/7', lbl: 'Connected School' }
    ],
    actionText: 'Explore Noticeboard Feeds',
    actionHref: '#experience',
    actionIcon: 'fas fa-bell'
  }
];

function initCircularCarousel() {
  const cards = document.querySelectorAll('.orbit-card');
  const stage = document.getElementById('circular-carousel-stage');
  const prevBtn = document.getElementById('btn-orbit-prev');
  const nextBtn = document.getElementById('btn-orbit-next');
  const dotBtns = document.querySelectorAll('.orbit-dot-btn');
  const autoplayBtn = document.getElementById('btn-orbit-autoplay');
  const coreIcon = document.getElementById('orbit-core-icon');
  const heroWrapper = document.getElementById('hero');

  // Details Panel elements
  const detailsPanel = document.getElementById('orbit-expanded-details-panel');
  const detailsCloseBtn = document.getElementById('btn-close-expanded-panel');
  const detailsCollapseBtn = document.getElementById('btn-expanded-collapse');
  const expTimePill = document.getElementById('exp-time-pill');
  const expRolePill = document.getElementById('exp-role-pill');
  const expTitle = document.getElementById('exp-title');
  const expTagline = document.getElementById('exp-tagline');
  const expDesc = document.getElementById('exp-desc');
  const expSpecsGrid = document.getElementById('exp-specs-grid');
  const expMetricsStrip = document.getElementById('exp-metrics-strip');
  const expActionBtn = document.getElementById('exp-action-btn');
  const expActionIcon = document.getElementById('exp-action-icon');
  const expActionText = document.getElementById('exp-action-text');

  if (!cards.length) return;

  let currentIndex = 0; // 0, 1, 2, 3
  let isDetailsOpen = false;
  let isAutoplayRunning = true;
  let autoplayTimer = null;

  // Adaptive Orbital Radii for Desktop, Tablet & Mobile
  function getRadii() {
    const width = window.innerWidth;
    if (width < 640) {
      return { rx: 135, ry: 35 };
    } else if (width < 1024) {
      return { rx: 220, ry: 50 };
    } else {
      return { rx: 320, ry: 65 };
    }
  }

  function updateOrbitPositions() {
    const { rx, ry } = getRadii();
    const total = cards.length; // 4 cards

    cards.forEach((card, i) => {
      // Relative offset from current front card
      const offset = (i - currentIndex + total) % total;
      // angle in radians: offset 0 = 0 (front, bottom), 1 = pi/2 (right), 2 = pi (back, top), 3 = 3pi/2 (left)
      const angle = (offset * 2 * Math.PI) / total;

      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      // Coordinates
      const x = sin * rx;
      const y = cos * ry;

      // Depth metric: cos goes from -1 (back) to +1 (front)
      const depth = (cos + 1) / 2; // 0 (back) to 1 (front)

      const scale = 0.74 + depth * 0.36; // 0.74 to 1.10
      const opacity = 0.42 + depth * 0.58; // 0.42 to 1.00
      const zIndex = Math.round(5 + depth * 20); // 5 to 25

      card.style.zIndex = zIndex;
      card.style.opacity = opacity.toFixed(2);

      const actionHintText = card.querySelector('.hint-text');

      if (i === currentIndex) {
        card.classList.add('is-front');
        card.setAttribute('aria-expanded', isDetailsOpen ? 'true' : 'false');
        
        if (isDetailsOpen) {
          card.classList.add('is-popped-forward');
          // Scale up, pop forward and elevate
          card.style.transform = `translate3d(${x}px, ${y - 12}px, 0) scale(${(scale * 1.08).toFixed(3)})`;
          card.style.zIndex = 45;
          if (actionHintText) actionHintText.textContent = 'Showing Details Below ↓';
        } else {
          card.classList.remove('is-popped-forward');
          card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale.toFixed(3)})`;
          if (actionHintText) actionHintText.textContent = 'Click to View Details';
        }
      } else {
        card.classList.remove('is-front');
        card.classList.remove('is-popped-forward');
        card.setAttribute('aria-expanded', 'false');
        if (actionHintText) actionHintText.textContent = 'Rotate to Front';

        if (isDetailsOpen) {
          card.style.opacity = (opacity * 0.35).toFixed(2);
          card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${(scale * 0.94).toFixed(3)})`;
        } else {
          card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale.toFixed(3)})`;
        }
      }
    });

    // Update center orbit core icon
    const currentData = ATMOSPHERE_CARDS_DATA[currentIndex];
    if (coreIcon && currentData) {
      const icon = currentData.atmosphere === 'morning' ? 'fa-sun' :
                   currentData.atmosphere === 'afternoon' ? 'fa-cloud-sun' :
                   currentData.atmosphere === 'evening' ? 'fa-mountain-sun' : 'fa-moon';
      coreIcon.className = `fas ${icon}`;
    }

    // Synchronously update background weather atmosphere
    if (heroWrapper && currentData) {
      heroWrapper.setAttribute('data-atmosphere', currentData.atmosphere);
    }

    // Update dot buttons active state
    dotBtns.forEach((dot, idx) => {
      if (idx === currentIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function renderDetailsPanel(index) {
    const data = ATMOSPHERE_CARDS_DATA[index];
    if (!data) return;

    if (expTimePill) {
      const icon = data.atmosphere === 'morning' ? 'fa-sun' :
                   data.atmosphere === 'afternoon' ? 'fa-cloud-sun' :
                   data.atmosphere === 'evening' ? 'fa-mountain-sun' : 'fa-moon';
      expTimePill.innerHTML = `<i class="fas ${icon}"></i> ${data.timeLabel}`;
    }
    if (expRolePill) expRolePill.textContent = data.roleBadge;
    if (expTitle) expTitle.textContent = data.title;
    if (expTagline) {
      const badgeIcon = data.atmosphere === 'morning' ? 'fa-user-graduate' :
                         data.atmosphere === 'afternoon' ? 'fa-calendar-check' :
                         data.atmosphere === 'evening' ? 'fa-wallet' : 'fa-bell';
      expTagline.innerHTML = `<i class="fas ${badgeIcon}"></i> ${data.highlightBadge}`;
    }
    if (expDesc) expDesc.textContent = data.desc;

    if (expSpecsGrid) {
      expSpecsGrid.innerHTML = data.specs.map(spec => `
        <li class="expanded-spec-item">
          <i class="fas fa-circle-check"></i>
          <div>
            <strong>${spec.title}</strong>
            <p>${spec.desc}</p>
          </div>
        </li>
      `).join('');
    }

    if (expMetricsStrip) {
      expMetricsStrip.innerHTML = data.metrics.map(m => `
        <div class="expanded-metric-item">
          <span class="metric-val">${m.num}</span>
          <span class="metric-lbl">${m.lbl}</span>
        </div>
      `).join('');
    }

    if (expActionBtn) {
      expActionBtn.href = data.actionHref;
      if (expActionIcon) expActionIcon.className = data.actionIcon;
      if (expActionText) expActionText.textContent = data.actionText;
    }
  }

  function openDetails() {
    isDetailsOpen = true;
    renderDetailsPanel(currentIndex);
    if (detailsPanel) detailsPanel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    updateOrbitPositions();
  }

  function closeDetails() {
    isDetailsOpen = false;
    if (detailsPanel) detailsPanel.classList.remove('is-open');
    document.body.style.overflow = '';
    updateOrbitPositions();
  }

  function rotateTo(index, andOpenDetails = false) {
    const isDifferent = currentIndex !== index;
    currentIndex = (index + cards.length) % cards.length;
    updateOrbitPositions();

    if (andOpenDetails) {
      if (isDifferent) {
        // Smoothly roll around to the front card first, then bloom open the details popup
        setTimeout(() => {
          openDetails();
        }, 320);
      } else {
        openDetails();
      }
    } else if (isDetailsOpen) {
      renderDetailsPanel(currentIndex);
    }
  }

  function toggleCardDetails(index) {
    if (currentIndex === index && isDetailsOpen) {
      closeDetails();
    } else {
      rotateTo(index, true);
    }
  }

  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isDetailsOpen && isAutoplayRunning) {
        rotateTo(currentIndex + 1);
      }
    }, 4500);
  }

  // Bind Card Click
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCardDetails(idx);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCardDetails(idx);
      }
    });
  });

  // Prev / Next Orbit Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateTo(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateTo(currentIndex + 1);
    });
  }

  // Dot Navigation Buttons
  dotBtns.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateTo(idx);
    });
  });

  // Autoplay Pause / Resume Button
  if (autoplayBtn) {
    autoplayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isAutoplayRunning = !isAutoplayRunning;
      if (isAutoplayRunning) {
        autoplayBtn.innerHTML = '<i class="fas fa-pause"></i> <span id="autoplay-label">Auto-Rotating</span>';
      } else {
        autoplayBtn.innerHTML = '<i class="fas fa-play"></i> <span id="autoplay-label">Paused</span>';
      }
    });
  }

  // Close Details Button
  if (detailsCloseBtn) {
    detailsCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDetails();
    });
  }
  if (detailsCollapseBtn) {
    detailsCollapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDetails();
    });
  }
  if (detailsPanel) {
    detailsPanel.addEventListener('click', (e) => {
      if (e.target === detailsPanel) {
        closeDetails();
      }
    });
  }

  // Touch Swipe Gesture Support for Mobile
  let touchStartX = 0;
  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) rotateTo(currentIndex + 1);
        else rotateTo(currentIndex - 1);
      }
    }, { passive: true });
  }

  // Resize Listener for Adaptive Radii
  window.addEventListener('resize', () => {
    updateOrbitPositions();
  });

  // Escape key closes details
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isDetailsOpen) {
      closeDetails();
    }
  });

  // Initialize
  updateOrbitPositions();
  startAutoplay();
}

/* ==========================================================================
   3. PROCEDURAL 3D CLOUD SIMULATION (CANVAS)
   ========================================================================== */
function initCloudSimulation() {
  const canvas = document.getElementById('cloud-canvas');
  if (!canvas) return;

  const wrapper = document.querySelector('.hero-scroll-wrapper') || document.getElementById('hero');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 32 : 68;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: height * 0.35 + Math.random() * (height * 0.75),
        radius: Math.random() * 200 + 130,
        opacity: Math.random() * 0.5 + 0.35,
        speedX: (Math.random() - 0.45) * 0.35,
        speedY: (Math.random() - 0.5) * 0.1,
        depth: Math.random() * 0.8 + 0.2, // 0.2 (far) to 1.0 (near)
        hueShift: Math.random() * 20
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 40;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  }, { passive: true });

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Get scroll progress smoothly without dead space
    const maxScroll = Math.max(window.innerHeight * 0.7, 400);
    const scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

    // Render soft cloud puffs with volumetric radial gradients
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Idle drift
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around screen boundaries
      if (p.x < -p.radius * 2) p.x = width + p.radius * 2;
      if (p.x > width + p.radius * 2) p.x = -p.radius * 2;

      // Scroll effect: clouds fly towards camera and disperse outward
      const scaleMultiplier = 1 + scrollProgress * (p.depth * 2.8);
      const dispersionX = (p.x > width / 2 ? 1 : -1) * (scrollProgress * 400 * p.depth);
      const drawX = p.x + mouseX * p.depth + dispersionX;
      const drawY = p.y + mouseY * p.depth - (scrollProgress * 150 * p.depth);
      const currentRadius = p.radius * scaleMultiplier;

      // Opacity fades out as clouds fly past the camera
      const currentOpacity = Math.max(0, p.opacity * (1 - scrollProgress * 1.4));

      if (currentOpacity > 0.01 && currentRadius > 0) {
        const grad = ctx.createRadialGradient(
          drawX, drawY, currentRadius * 0.1,
          drawX, drawY, currentRadius
        );

        const currentAtmosphere = (wrapper && wrapper.getAttribute('data-atmosphere')) || 'morning';

        if (currentAtmosphere === 'afternoon') {
          // Radiant white & crisp sky blue tint
          grad.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          grad.addColorStop(0.4, `rgba(224, 242, 254, ${currentOpacity * 0.75})`);
          grad.addColorStop(0.75, `rgba(186, 230, 253, ${currentOpacity * 0.3})`);
        } else if (currentAtmosphere === 'evening') {
          // Rich fiery sunset pink, peach & golden amber
          grad.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          grad.addColorStop(0.4, `rgba(254, 202, 202, ${currentOpacity * 0.8})`);
          grad.addColorStop(0.75, `rgba(251, 146, 60, ${currentOpacity * 0.35})`);
        } else if (currentAtmosphere === 'night') {
          // Nocturnal silver & moonlit edges
          grad.addColorStop(0, `rgba(226, 232, 240, ${currentOpacity * 0.75})`);
          grad.addColorStop(0.4, `rgba(148, 163, 184, ${currentOpacity * 0.5})`);
          grad.addColorStop(0.75, `rgba(71, 85, 105, ${currentOpacity * 0.25})`);
        } else {
          // Fluffy white clouds with soft sky-blue glow (Default)
          grad.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
          grad.addColorStop(0.4, `rgba(240, 249, 255, ${currentOpacity * 0.9})`);
          grad.addColorStop(0.75, `rgba(186, 230, 253, ${currentOpacity * 0.45})`);
        }

        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. SCROLL-LINKED CINEMATIC FLY-THROUGH & INTER-SECTION CLOUD TRANSITIONS
   Soft cloud curtain that covers screen, opens to reveal sections, and closes
   ========================================================================== */
function initScrollTransitions() {
  const curtain = document.getElementById('scroll-cloud-curtain');
  const bankLeft = document.getElementById('curtain-bank-left');
  const bankRight = document.getElementById('curtain-bank-right');
  const mistCenter = document.getElementById('curtain-mist-center');
  const driftTop = document.getElementById('curtain-drift-top');
  const driftBottom = document.getElementById('curtain-drift-bottom');

  const wrapper = document.querySelector('.hero-scroll-wrapper');
  const centerpiece = document.querySelector('.hero-centerpiece');
  const frontLeft = document.querySelector('.billow-front-left');
  const frontRight = document.querySelector('.billow-front-right');
  const midClouds = document.querySelectorAll('.cloud-layer-mid .cloud-billow');
  const floor = document.querySelector('.cloud-horizon-floor');
  const sunRays = document.querySelector('.sun-rays');

  // Sequential content sections
  const sectionIds = ['campus', 'experience', 'partnership', 'classroom', 'features', 'cta'];
  const portalDividers = document.querySelectorAll('.section-cloud-portal');

  let rafId = null;
  let currentClosure = 0;
  let targetClosure = 0;
  let currentDriftY = 0;
  let targetDriftY = 0;

  function update() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const innerHeight = window.innerHeight || 800;
    const heroMaxScroll = Math.max(innerHeight * 0.75, 450);

    // ------------------------------------------------------------------------
    // 1. HERO PARKING & PARTING ANIMATIONS (Initial scroll fly-through)
    // ------------------------------------------------------------------------
    const heroProgress = Math.min(1, Math.max(0, scrollY / heroMaxScroll));

    if (centerpiece) {
      const centerScale = 1 + heroProgress * 0.35;
      const centerOpacity = Math.max(0, 1 - heroProgress * 1.8);
      const translateY = -20 - heroProgress * 120;
      centerpiece.style.transform = `translateY(${translateY}px) scale(${centerScale})`;
      centerpiece.style.opacity = centerOpacity.toFixed(3);
      centerpiece.style.pointerEvents = heroProgress > 0.4 ? 'none' : 'auto';
    }

    if (frontLeft) {
      const leftMoveX = -heroProgress * 700;
      const scale = 1 + heroProgress * 2.5;
      const opacity = Math.max(0, 1 - heroProgress * 1.3);
      frontLeft.style.transform = `translate3d(${leftMoveX}px, ${-heroProgress * 80}px, 0) scale(${scale})`;
      frontLeft.style.opacity = opacity.toFixed(3);
    }

    if (frontRight) {
      const rightMoveX = heroProgress * 700;
      const scale = 1 + heroProgress * 2.5;
      const opacity = Math.max(0, 1 - heroProgress * 1.3);
      frontRight.style.transform = `translate3d(${rightMoveX}px, ${-heroProgress * 80}px, 0) scale(${scale})`;
      frontRight.style.opacity = opacity.toFixed(3);
    }

    if (midClouds && midClouds.length > 0) {
      midClouds.forEach((cloud, idx) => {
        const dir = idx % 2 === 0 ? -1 : 1;
        const moveX = dir * heroProgress * 320;
        const scale = 1 + heroProgress * 1.4;
        const opacity = Math.max(0, 0.9 - heroProgress * 1.2);
        cloud.style.transform = `translate3d(${moveX}px, ${-heroProgress * 50}px, 0) scale(${scale})`;
        cloud.style.opacity = opacity.toFixed(3);
      });
    }

    if (floor) {
      floor.style.opacity = (1 - heroProgress * 0.85).toFixed(3);
    }

    if (sunRays) {
      sunRays.style.opacity = (0.7 + heroProgress * 0.3).toFixed(2);
    }

    // ------------------------------------------------------------------------
    // 2. SCROLL-TRIGGERED CLOUD CURTAIN TRANSITION IN DEDICATED BUFFER SPACE
    // ------------------------------------------------------------------------
    if (curtain && bankLeft && bankRight) {
      let maxPortalClosure = 0;
      let activePortalDrift = 0;
      const screenCenter = innerHeight * 0.5;
      // Active transition window strictly inside the inter-section atmosphere buffer
      const transitionZone = Math.min(innerHeight * 0.38, 300);

      portalDividers.forEach((portal) => {
        const rect = portal.getBoundingClientRect();
        const portalCenter = rect.top + rect.height * 0.5;
        const distFromCenter = Math.abs(portalCenter - screenCenter);

        if (distFromCenter < transitionZone) {
          // Normalized progress: 0 at transition edge, 1 at exact portal center
          const normalized = 1 - (distFromCenter / transitionZone);
          // Bell curve: smooth ease in and ease out
          const closure = Math.sin(normalized * Math.PI * 0.5);
          if (closure > maxPortalClosure) {
            maxPortalClosure = closure;
            activePortalDrift = ((portalCenter - screenCenter) / transitionZone) * 25;
          }
        }
      });

      const rawClosure = maxPortalClosure;
      const relOffset = activePortalDrift;

      // Cosine-squared smoothing for zero-jerk, silky motion
      const easedClosure = (1 - Math.cos(rawClosure * Math.PI)) / 2;
      targetClosure = easedClosure;
      targetDriftY = relOffset;

      // Smooth dampening interpolation (lerp)
      currentClosure += (targetClosure - currentClosure) * 0.24;
      currentDriftY += (targetDriftY - currentDriftY) * 0.24;

      if (currentClosure < 0.008) {
        curtain.style.opacity = '0';
        bankLeft.style.transform = 'translate3d(-125%, 0, 0)';
        bankRight.style.transform = 'translate3d(125%, 0, 0)';
        if (mistCenter) mistCenter.style.opacity = '0';
        if (driftTop) driftTop.style.opacity = '0';
        if (driftBottom) driftBottom.style.opacity = '0';
      } else {
        const openFactor = 1 - currentClosure;
        // When closed (currentClosure = 1): left bank at 0%, right bank at 0%
        // When open (currentClosure = 0): left bank at -125%, right bank at +125%
        const leftX = -(openFactor * 125);
        const rightX = (openFactor * 125);
        const scale = 0.94 + currentClosure * 0.12;
        const opacity = Math.min(1, currentClosure * 1.05);

        curtain.style.opacity = opacity.toFixed(3);
        bankLeft.style.transform = `translate3d(${leftX.toFixed(2)}%, ${currentDriftY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        bankRight.style.transform = `translate3d(${rightX.toFixed(2)}%, ${currentDriftY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;

        if (mistCenter) {
          mistCenter.style.opacity = (currentClosure * 0.95).toFixed(3);
          mistCenter.style.transform = `scale(${(0.85 + currentClosure * 0.25).toFixed(3)})`;
        }
        if (driftTop) {
          driftTop.style.opacity = (currentClosure * 0.85).toFixed(3);
          driftTop.style.transform = `translateX(-50%) translateY(${(-currentDriftY * 0.5).toFixed(1)}px)`;
        }
        if (driftBottom) {
          driftBottom.style.opacity = (currentClosure * 0.85).toFixed(3);
          driftBottom.style.transform = `translateX(-50%) translateY(${(currentDriftY * 0.5).toFixed(1)}px)`;
        }
      }
    }

    // ------------------------------------------------------------------------
    // 3. PARALLAX DRIFT ON SECTION DIVIDER CLOUDS
    // ------------------------------------------------------------------------
    portalDividers.forEach((portal) => {
      const rect = portal.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
        const billowLeft = portal.querySelector('.p-billow-1');
        const billowRight = portal.querySelector('.p-billow-2');
        const billowCenter = portal.querySelector('.p-billow-3');
        if (billowLeft) billowLeft.style.transform = `translate3d(${-(progress - 0.5) * 80}px, 0, 0)`;
        if (billowRight) billowRight.style.transform = `translate3d(${(progress - 0.5) * 80}px, 0, 0)`;
        if (billowCenter) billowCenter.style.transform = `scale(${1 + (progress - 0.5) * 0.2})`;
      }
    });

    rafId = requestAnimationFrame(update);
  }

  // Start continuous RAF loop
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(update);
}


/* ==========================================================================
   4. ROLE-BASED FEATURES TABS
   ========================================================================== */
function initRoleTabs() {
  const tabs = document.querySelectorAll('.role-tab-btn');
  const panels = document.querySelectorAll('.role-feature-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetRole = tab.getAttribute('data-role');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetRole}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE EXPERIENCE SIMULATORS (TEACHER APP & PARENT APP SIMULATOR)
   ========================================================================== */
function initExperienceSimulators() {
  // ==========================================================================
  // ROLE SWITCHER: TEACHER APP VS PARENT APP
  // ==========================================================================
  const btnRoleTeacher = document.getElementById('btn-role-teacher');
  const btnRoleParent = document.getElementById('btn-role-parent');
  const teacherScreen = document.getElementById('teacher-app-screen');
  const parentScreen = document.getElementById('parent-app-phone');

  const triggersTeacher = document.getElementById('triggers-teacher');
  const triggersParent = document.getElementById('triggers-parent');
  const companionRoleBadge = document.getElementById('companion-role-badge');
  const companionRoleTitle = document.getElementById('companion-role-title');
  const companionRoleDesc = document.getElementById('companion-role-desc');

  function setAppRole(role) {
    if (role === 'teacher') {
      if (btnRoleTeacher) btnRoleTeacher.classList.add('active');
      if (btnRoleParent) btnRoleParent.classList.remove('active');
      if (teacherScreen) teacherScreen.classList.add('active');
      if (parentScreen) parentScreen.classList.remove('active');
      if (triggersTeacher) triggersTeacher.style.display = 'flex';
      if (triggersParent) triggersParent.style.display = 'none';

      if (companionRoleBadge) companionRoleBadge.textContent = 'Teacher App Live Simulation';
      if (companionRoleTitle) companionRoleTitle.textContent = 'SunRais Teacher App';
      if (companionRoleDesc) companionRoleDesc.textContent = 'Experience the teacher mobile interface modeled directly from our live school production app. Tap anywhere on the phone or use the quick test triggers below:';
    } else {
      if (btnRoleParent) btnRoleParent.classList.add('active');
      if (btnRoleTeacher) btnRoleTeacher.classList.remove('active');
      if (parentScreen) parentScreen.classList.add('active');
      if (teacherScreen) teacherScreen.classList.remove('active');
      if (triggersParent) triggersParent.style.display = 'flex';
      if (triggersTeacher) triggersTeacher.style.display = 'none';

      if (companionRoleBadge) companionRoleBadge.textContent = 'Parent App Live Simulation';
      if (companionRoleTitle) companionRoleTitle.textContent = 'SunRais Parent App';
      if (companionRoleDesc) companionRoleDesc.textContent = 'Experience the parent mobile screen modeled directly from our live production release. Tap anywhere on the smartphone or click the interactive quick-triggers below:';
    }
  }

  if (btnRoleTeacher) {
    btnRoleTeacher.addEventListener('click', () => setAppRole('teacher'));
  }
  if (btnRoleParent) {
    btnRoleParent.addEventListener('click', () => setAppRole('parent'));
  }

  // ==========================================================================
  // TEACHER APP INTERACTIVE LOGIC
  // ==========================================================================
  if (teacherScreen) {
    const tSubviews = teacherScreen.querySelectorAll('.t-subview');
    const tNavHome = document.getElementById('t-nav-home');
    const tNavClasses = document.getElementById('t-nav-classes');
    const tNavNotifications = document.getElementById('t-nav-notifications');
    const tNavCalendar = document.getElementById('t-nav-calendar');

    const tPhoneToast = document.getElementById('t-phone-toast');
    const tToastMsgEl = document.getElementById('t-toast-msg');
    let tToastTimer = null;

    function showTeacherToast(message, icon = 'fas fa-circle-check') {
      if (!tPhoneToast || !tToastMsgEl) return;
      tToastMsgEl.textContent = message;
      const iconEl = tPhoneToast.querySelector('.toast-icon');
      if (iconEl) iconEl.className = `toast-icon ${icon}`;

      tPhoneToast.classList.add('show');
      clearTimeout(tToastTimer);
      tToastTimer = setTimeout(() => {
        tPhoneToast.classList.remove('show');
      }, 2400);
    }

    function closeTeacherSubviews() {
      tSubviews.forEach(v => v.classList.remove('active'));
      [tNavHome, tNavClasses, tNavNotifications, tNavCalendar].forEach(item => {
        if (item) item.classList.remove('active');
      });
      if (tNavHome) tNavHome.classList.add('active');
    }

    function openTeacherSubview(subviewId, activeNavItem = null) {
      tSubviews.forEach(v => v.classList.remove('active'));
      const target = document.getElementById(subviewId);
      if (target) {
        target.classList.add('active');
        [tNavHome, tNavClasses, tNavNotifications, tNavCalendar].forEach(item => {
          if (item) item.classList.remove('active');
        });
        if (activeNavItem) activeNavItem.classList.add('active');
      }
    }

    // Back buttons inside Teacher subviews
    const tBackBtns = teacherScreen.querySelectorAll('[data-t-back="home"]');
    tBackBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTeacherSubviews();
      });
    });

    // 1. Take Attendance
    const actAttendance = document.getElementById('t-act-attendance');
    if (actAttendance) {
      actAttendance.addEventListener('click', () => {
        openTeacherSubview('t-subview-attendance', tNavClasses);
      });
    }

    // Attendance P/A/L Buttons
    const stRows = teacherScreen.querySelectorAll('.t-student-row');
    const presentCntEl = document.getElementById('t-present-count');
    const absentCntEl = document.getElementById('t-absent-count');
    const lateCntEl = document.getElementById('t-late-count');

    stRows.forEach(row => {
      const attBtns = row.querySelectorAll('.t-att-btn');
      attBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          attBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          let pCount = 0, aCount = 0, lCount = 0;
          stRows.forEach(r => {
            if (r.querySelector('.att-p.active')) pCount++;
            else if (r.querySelector('.att-a.active')) aCount++;
            else if (r.querySelector('.att-l.active')) lCount++;
          });

          if (presentCntEl) presentCntEl.textContent = pCount;
          if (absentCntEl) absentCntEl.textContent = aCount;
          if (lateCntEl) lateCntEl.textContent = lCount;
        });
      });
    });

    const submitAttBtn = document.getElementById('t-btn-submit-attendance');
    if (submitAttBtn) {
      submitAttBtn.addEventListener('click', () => {
        showTeacherToast('Attendance for Grade 8-A submitted to School Portal!', 'fas fa-cloud-arrow-up');
        setTimeout(() => closeTeacherSubviews(), 900);
      });
    }

    // 2. Enter Marks
    const actMarks = document.getElementById('t-act-marks');
    if (actMarks) {
      actMarks.addEventListener('click', () => {
        openTeacherSubview('t-subview-marks');
      });
    }

    const saveMarksBtn = document.getElementById('t-btn-save-marks');
    if (saveMarksBtn) {
      saveMarksBtn.addEventListener('click', () => {
        showTeacherToast('Midterm Mathematics marks saved & synced!', 'fas fa-floppy-disk');
        setTimeout(() => closeTeacherSubviews(), 900);
      });
    }

    // 3. Assignments
    const actAssignments = document.getElementById('t-act-assignments');
    if (actAssignments) {
      actAssignments.addEventListener('click', () => {
        openTeacherSubview('t-subview-assignments');
      });
    }

    const evalHwBtn = document.getElementById('t-btn-eval-hw');
    if (evalHwBtn) {
      evalHwBtn.addEventListener('click', () => {
        showTeacherToast('Opening 24 submitted worksheets for grading', 'fas fa-file-pen');
      });
    }

    const createAssignBtn = document.getElementById('t-btn-create-assignment');
    if (createAssignBtn) {
      createAssignBtn.addEventListener('click', () => {
        showTeacherToast('New Assignment draft created for Grade 8-A', 'fas fa-plus');
      });
    }

    // 4. Parent Messages
    const actMessages = document.getElementById('t-act-messages');
    if (actMessages) {
      actMessages.addEventListener('click', () => {
        openTeacherSubview('t-subview-messages');
      });
    }

    const sendMsgBtn = document.getElementById('t-btn-send-msg');
    const msgInput = document.getElementById('t-msg-reply-input');
    if (sendMsgBtn && msgInput) {
      sendMsgBtn.addEventListener('click', () => {
        const text = msgInput.value.trim();
        if (text) {
          showTeacherToast(`Sent message to parent: "${text.substring(0, 30)}..."`, 'fas fa-paper-plane');
          msgInput.value = '';
        } else {
          showTeacherToast('Reply sent to parent Mr. Manikanta Chandra', 'fas fa-paper-plane');
        }
      });
    }

    // 5. Student Development
    const actDev = document.getElementById('t-act-development');
    if (actDev) {
      actDev.addEventListener('click', () => {
        openTeacherSubview('t-subview-development');
      });
    }

    const logObsBtn = document.getElementById('t-btn-log-observation');
    if (logObsBtn) {
      logObsBtn.addEventListener('click', () => {
        showTeacherToast('New student mentorship observation logged!', 'fas fa-clipboard-check');
      });
    }

    // 6. Timetable & Schedule Card
    const schedCard = document.getElementById('t-card-schedule');
    const schedLink = document.getElementById('t-btn-timetable');
    function openTimetable() {
      openTeacherSubview('t-subview-timetable', tNavCalendar);
    }
    if (schedCard) schedCard.addEventListener('click', openTimetable);
    if (schedLink) schedLink.addEventListener('click', (e) => {
      e.stopPropagation();
      openTimetable();
    });

    const acceptTimetableBtn = document.getElementById('t-btn-accept-timetable');
    if (acceptTimetableBtn) {
      acceptTimetableBtn.addEventListener('click', () => {
        showTeacherToast('Provisional teaching periods synced to dashboard!', 'fas fa-calendar-check');
        setTimeout(() => closeTeacherSubviews(), 900);
      });
    }

    // 7. Marks Draft Waiting Review
    const draftBanner = document.getElementById('t-banner-draft');
    const reviewDraftBtn = document.getElementById('t-btn-review-draft');
    function openDraftReview() {
      openTeacherSubview('t-subview-draft');
    }
    if (draftBanner) draftBanner.addEventListener('click', openDraftReview);
    if (reviewDraftBtn) reviewDraftBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDraftReview();
    });

    const approveDraftBtn = document.getElementById('t-btn-approve-all-draft');
    if (approveDraftBtn) {
      approveDraftBtn.addEventListener('click', () => {
        showTeacherToast('All 6 draft scores approved & submitted to Board cell!', 'fas fa-check-double');
        if (draftBanner) {
          draftBanner.style.background = '#ecfdf5';
          draftBanner.style.borderColor = '#d1fae5';
          const draftText = draftBanner.querySelector('.t-draft-text p');
          if (draftText) draftText.textContent = 'All student scores submitted and approved.';
          const draftIcon = draftBanner.querySelector('.t-draft-icon-circle');
          if (draftIcon) {
            draftIcon.style.background = '#10b981';
            draftIcon.innerHTML = '<i class="fas fa-check"></i>';
          }
        }
        setTimeout(() => closeTeacherSubviews(), 1000);
      });
    }

    // 8. Notifications Bell & View
    const tBellBtn = document.getElementById('t-btn-bell');
    const tNavBadgeCount = document.getElementById('t-nav-badge-count');
    const tBellCount = document.getElementById('t-bell-count');
    const clearTNotifBtn = document.getElementById('t-btn-clear-notifications');

    function openTeacherNotifications() {
      openTeacherSubview('t-subview-notifications', tNavNotifications);
    }

    if (tBellBtn) tBellBtn.addEventListener('click', openTeacherNotifications);
    if (clearTNotifBtn) {
      clearTNotifBtn.addEventListener('click', () => {
        const unreadItems = teacherScreen.querySelectorAll('.notif-item.unread');
        unreadItems.forEach(item => {
          item.classList.remove('unread');
          const dot = item.querySelector('.notif-unread-dot');
          if (dot) dot.style.display = 'none';
        });
        if (tNavBadgeCount) tNavBadgeCount.style.display = 'none';
        if (tBellCount) tBellCount.style.display = 'none';
        showTeacherToast('All teacher notifications marked as read', 'fas fa-check-double');
      });
    }

    // 9. Teacher Profile Card Tap
    const tProfileCard = document.getElementById('t-profile-card');
    if (tProfileCard) {
      tProfileCard.addEventListener('click', () => {
        showTeacherToast('Teacher Profile: Aditi Hegde (Maths & Sciences)', 'fas fa-chalkboard-user');
      });
    }

    // 10. Teacher Welcome Card Tap
    const tWelcomeCard = document.getElementById('t-welcome-card');
    if (tWelcomeCard) {
      tWelcomeCard.addEventListener('click', () => {
        showTeacherToast('Good morning Teacher Aditi! Term 1 session active.', 'fas fa-sun');
      });
    }

    // 11. Teacher Metrics Tiles Tap
    const tileClassesToday = document.getElementById('t-tile-classes-today');
    if (tileClassesToday) {
      tileClassesToday.addEventListener('click', () => {
        openTimetable();
      });
    }

    const tileTodoTasks = document.getElementById('t-tile-todo-tasks');
    if (tileTodoTasks) {
      tileTodoTasks.addEventListener('click', () => {
        openDraftReview();
      });
    }

    // 12. Teacher Bottom Nav Items
    if (tNavHome) tNavHome.addEventListener('click', (e) => { e.preventDefault(); closeTeacherSubviews(); });
    if (tNavClasses) tNavClasses.addEventListener('click', (e) => { e.preventDefault(); openTeacherSubview('t-subview-attendance', tNavClasses); });
    if (tNavNotifications) tNavNotifications.addEventListener('click', (e) => { e.preventDefault(); openTeacherNotifications(); });
    if (tNavCalendar) tNavCalendar.addEventListener('click', (e) => { e.preventDefault(); openTimetable(); });

    // 13. Desktop Sidebar Triggers for Teacher App
    const teacherTriggers = document.querySelectorAll('[data-t-trigger]');
    teacherTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const trigger = btn.getAttribute('data-t-trigger');
        if (trigger === 'attendance') openTeacherSubview('t-subview-attendance', tNavClasses);
        else if (trigger === 'marks') openTeacherSubview('t-subview-marks');
        else if (trigger === 'assignments') openTeacherSubview('t-subview-assignments');
        else if (trigger === 'messages') openTeacherSubview('t-subview-messages');
        else if (trigger === 'development') openTeacherSubview('t-subview-development');
        else if (trigger === 'draft') openDraftReview();
        else if (trigger === 'timetable') openTimetable();
      });
    });
  }

  // ==========================================================================
  // PARENT APP INTERACTIVE LOGIC (Preserved & Fully Functional)
  // ==========================================================================
  if (parentScreen) {
    const allSubviews = parentScreen.querySelectorAll('.p-subview');
    const allSheets = parentScreen.querySelectorAll('.p-sheet-backdrop');
    const navHomeBtn = document.getElementById('p-nav-home');
    const navMoreBtn = document.getElementById('p-nav-more');

    const phoneToast = document.getElementById('p-phone-toast');
    const toastMsgEl = document.getElementById('p-toast-msg');
    let toastTimer = null;

    function showPhoneToast(message, icon = 'fas fa-circle-check') {
      if (!phoneToast || !toastMsgEl) return;
      toastMsgEl.textContent = message;
      const iconEl = phoneToast.querySelector('.toast-icon');
      if (iconEl) iconEl.className = `toast-icon ${icon}`;

      phoneToast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        phoneToast.classList.remove('show');
      }, 2400);
    }

    function closeAllViews() {
      allSubviews.forEach(view => view.classList.remove('active'));
      allSheets.forEach(sheet => sheet.classList.remove('active'));
      if (navHomeBtn) navHomeBtn.classList.add('active');
      if (navMoreBtn) navMoreBtn.classList.remove('active');
    }

    function openSubview(subviewId) {
      allSubviews.forEach(view => view.classList.remove('active'));
      allSheets.forEach(sheet => sheet.classList.remove('active'));

      const target = document.getElementById(subviewId);
      if (target) {
        target.classList.add('active');
        if (navHomeBtn) navHomeBtn.classList.remove('active');
        if (subviewId === 'subview-more') {
          if (navMoreBtn) navMoreBtn.classList.add('active');
        } else {
          if (navMoreBtn) navMoreBtn.classList.remove('active');
        }
      }
    }

    const backButtons = parentScreen.querySelectorAll('[data-back-to="home"]');
    backButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllViews();
      });
    });

    if (navHomeBtn) {
      navHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllViews();
      });
    }

    if (navMoreBtn) {
      navMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSubview('subview-more');
      });
    }

    const tileAttendance = document.getElementById('p-tile-attendance');
    const tileHomework = document.getElementById('p-tile-homework');
    const tileNotifications = document.getElementById('p-tile-notifications');
    const tileCalendar = document.getElementById('p-tile-calendar');

    if (tileAttendance) tileAttendance.addEventListener('click', () => openSubview('subview-attendance'));
    if (tileHomework) tileHomework.addEventListener('click', () => openSubview('subview-homework'));
    if (tileNotifications) tileNotifications.addEventListener('click', () => openSubview('subview-notifications'));
    if (tileCalendar) tileCalendar.addEventListener('click', () => openSubview('subview-calendar'));

    const welcomeCard = document.getElementById('p-welcome-card');
    if (welcomeCard) {
      welcomeCard.addEventListener('click', () => {
        showPhoneToast('Welcome Manikanta! All Term 1 classes in session.', 'fas fa-graduation-cap');
      });
    }

    const studentCard = document.getElementById('p-student-card');
    const siblingSheet = document.getElementById('p-sibling-sheet');
    const closeSiblingBtn = document.getElementById('btn-close-sibling-sheet');
    const siblingChoices = parentScreen.querySelectorAll('.sibling-choice-item');
    const displayNameEl = document.getElementById('p-display-name');
    const displayGradeEl = document.getElementById('p-display-grade');
    const displayAvatarEl = document.getElementById('p-active-avatar');
    const attStatPctEl = document.getElementById('p-att-stat-pct');
    const hwSummarySubtitle = document.getElementById('p-hw-summary-subtitle');
    const hwActiveCountBadge = document.getElementById('hw-active-count-badge');

    const studentProfiles = {
      aadhya: {
        name: 'Aadhya Chandra',
        grade: 'Grade 9 • Section B',
        att: '96.8%',
        tasks: '3 active tasks',
        taskBadge: '3 Tasks'
      },
      aarav: {
        name: 'Aarav Chandra',
        grade: 'Grade 5 • Section A',
        att: '98.4%',
        tasks: '1 active task',
        taskBadge: '1 Task'
      }
    };

    if (studentCard && siblingSheet) {
      studentCard.addEventListener('click', () => {
        siblingSheet.classList.add('active');
      });
    }

    if (closeSiblingBtn && siblingSheet) {
      closeSiblingBtn.addEventListener('click', () => {
        siblingSheet.classList.remove('active');
      });
    }

    siblingChoices.forEach(choice => {
      choice.addEventListener('click', () => {
        const sibKey = choice.getAttribute('data-sibling');
        siblingChoices.forEach(c => c.classList.remove('active'));
        choice.classList.add('active');

        const data = studentProfiles[sibKey];
        if (data) {
          if (displayNameEl) displayNameEl.textContent = data.name;
          if (displayGradeEl) displayGradeEl.textContent = data.grade;
          if (attStatPctEl) attStatPctEl.textContent = data.att;
          if (hwSummarySubtitle) hwSummarySubtitle.textContent = data.tasks;
          if (hwActiveCountBadge) hwActiveCountBadge.textContent = data.taskBadge;

          if (displayAvatarEl) {
            if (sibKey === 'aadhya') {
              displayAvatarEl.style.background = "url('img/aadhya-avatar.jpg') center 20% / cover no-repeat";
            } else {
              displayAvatarEl.style.background = "url('img/parent-principal.jpg') center 20% / cover no-repeat";
            }
          }

          showPhoneToast(`Switched to ${data.name} profile`, 'fas fa-user-check');
        }

        setTimeout(() => {
          if (siblingSheet) siblingSheet.classList.remove('active');
        }, 350);
      });
    });

    const langBtn = document.getElementById('p-btn-lang');
    const langSheet = document.getElementById('p-lang-sheet');
    const closeLangBtn = document.getElementById('btn-close-lang-sheet');
    const langOptions = parentScreen.querySelectorAll('.lang-opt-btn');
    const activeLangText = document.getElementById('p-active-lang-text');

    if (langBtn && langSheet) {
      langBtn.addEventListener('click', () => langSheet.classList.add('active'));
    }
    if (closeLangBtn && langSheet) {
      closeLangBtn.addEventListener('click', () => langSheet.classList.remove('active'));
    }

    langOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        langOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        const lang = opt.getAttribute('data-lang');
        if (activeLangText) activeLangText.textContent = lang;

        showPhoneToast(`Language set to ${lang}`, 'fas fa-globe');

        setTimeout(() => {
          if (langSheet) langSheet.classList.remove('active');
        }, 350);
      });
    });

    const bellBtn = document.getElementById('p-btn-bell');
    if (bellBtn) {
      bellBtn.addEventListener('click', () => openSubview('subview-notifications'));
    }

    const notifPills = parentScreen.querySelectorAll('.notif-pill');
    const notifItems = parentScreen.querySelectorAll('.notif-item');
    const clearNotifBtn = document.getElementById('p-btn-clear-notifications');
    const bellBadge = document.getElementById('p-bell-count');

    notifPills.forEach(pill => {
      pill.addEventListener('click', () => {
        notifPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-notif-filter');
        notifItems.forEach(item => {
          const cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) item.style.display = 'flex';
          else item.style.display = 'none';
        });
      });
    });

    if (clearNotifBtn) {
      clearNotifBtn.addEventListener('click', () => {
        notifItems.forEach(item => {
          item.classList.remove('unread');
          const dot = item.querySelector('.notif-unread-dot');
          if (dot) dot.style.display = 'none';
        });
        if (bellBadge) bellBadge.style.display = 'none';
        showPhoneToast('All notifications marked as read', 'fas fa-check-double');
      });
    }

    const hwCheckboxes = parentScreen.querySelectorAll('.hw-checkbox');
    const hwProgressFill = document.getElementById('hw-progress-fill');
    const hwProgressText = document.getElementById('hw-progress-text');

    function updateHwProgress() {
      const total = hwCheckboxes.length;
      let checked = 0;
      hwCheckboxes.forEach(cb => {
        if (cb.checked) checked++;
      });

      const pct = Math.round((checked / total) * 100);
      if (hwProgressFill) hwProgressFill.style.width = `${pct}%`;
      if (hwProgressText) hwProgressText.textContent = `${checked} of ${total} Completed`;

      if (checked === total) {
        showPhoneToast('🎉 Outstanding! All homework tasks completed.', 'fas fa-trophy');
      }
    }

    hwCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateHwProgress);
    });

    const ttsBtn = document.getElementById('p-btn-hw-speak');
    const ttsLabel = document.getElementById('tts-label-text');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        const mathText = document.getElementById('hw-math-text')?.textContent || 
          "Mathematics Homework: Complete Chapter 4 word problems on fractions from page 48 in your notebook.";

        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(mathText.trim());
          utterance.rate = 0.95;
          utterance.pitch = 1.0;

          if (ttsLabel) ttsLabel.textContent = 'Reading Aloud...';
          ttsBtn.style.color = '#10b981';

          utterance.onend = () => {
            if (ttsLabel) ttsLabel.textContent = 'Read Aloud (Voice AI)';
            ttsBtn.style.color = '';
          };

          utterance.onerror = () => {
            if (ttsLabel) ttsLabel.textContent = 'Read Aloud (Voice AI)';
            ttsBtn.style.color = '';
          };

          window.speechSynthesis.speak(utterance);
        } else {
          showPhoneToast('Voice playback: ' + mathText.substring(0, 45) + '...', 'fas fa-volume-high');
        }
      });
    }

    const leaveForm = document.getElementById('p-leave-form');
    if (leaveForm) {
      leaveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('leave-date-input')?.value || 'selected date';
        showPhoneToast(`Leave application submitted for ${date}`, 'fas fa-paper-plane');
        setTimeout(() => closeAllViews(), 1000);
      });
    }

    const syncCalBtn = document.getElementById('p-btn-sync-calendar');
    const addGcalBtn = document.getElementById('p-btn-add-gcal');
    function triggerCalendarSync() {
      showPhoneToast('4 School events synced to phone calendar', 'far fa-calendar-check');
    }
    if (syncCalBtn) syncCalBtn.addEventListener('click', triggerCalendarSync);
    if (addGcalBtn) addGcalBtn.addEventListener('click', triggerCalendarSync);

    const momentCards = parentScreen.querySelectorAll('.p-moment-card');
    const momentsAllBtn = document.getElementById('p-btn-moments-all');
    const momentLightbox = document.getElementById('p-moment-lightbox');
    const closeLightboxBtn = document.getElementById('btn-close-lightbox');
    const lightboxImg = document.getElementById('lightbox-bg-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const likeBtn = document.getElementById('btn-like-moment');
    const likeCnt = document.getElementById('moment-like-cnt');
    const shareBtn = document.getElementById('btn-share-moment');

    const momentData = {
      'annual-day': {
        title: 'Annual Day Celebrations 2026',
        desc: 'Students performing the classical invocation dance in the main campus auditorium with parents and faculty in attendance.',
        img: "url('img/classroom-scene.jpg')"
      },
      'science-expo': {
        title: 'Robotics & STEM Project Fair',
        desc: 'Young innovators showcasing automated line-follower robots and IoT water management prototypes to visiting jury.',
        img: "url('img/school-campus.jpg')"
      },
      'sports-day': {
        title: 'Inter-School Athletics Championship',
        desc: 'Track and field sprint champions receiving the gold trophy at the Olympic-standard campus sports arena.',
        img: "url('img/parent-principal.jpg')"
      }
    };

    function openMomentModal(key = 'annual-day') {
      const data = momentData[key] || momentData['annual-day'];
      if (lightboxTitle) lightboxTitle.textContent = data.title;
      if (lightboxDesc) lightboxDesc.textContent = data.desc;
      if (lightboxImg) lightboxImg.style.backgroundImage = data.img;
      if (momentLightbox) momentLightbox.classList.add('active');
    }

    momentCards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-moment') || 'annual-day';
        openMomentModal(key);
      });
    });

    if (momentsAllBtn) momentsAllBtn.addEventListener('click', () => openMomentModal('annual-day'));
    if (closeLightboxBtn && momentLightbox) {
      closeLightboxBtn.addEventListener('click', () => momentLightbox.classList.remove('active'));
    }

    if (likeBtn && likeCnt) {
      let liked = false;
      likeBtn.addEventListener('click', () => {
        let count = parseInt(likeCnt.textContent || '128', 10);
        if (!liked) {
          count++;
          likeBtn.innerHTML = `<i class="fas fa-heart" style="color:#ef4444;"></i> <span id="moment-like-cnt">${count}</span> Liked`;
          liked = true;
        } else {
          count--;
          likeBtn.innerHTML = `<i class="far fa-heart"></i> <span id="moment-like-cnt">${count}</span> Likes`;
          liked = false;
        }
      });
    }

    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        showPhoneToast('Moment link copied to clipboard!', 'fas fa-share-nodes');
      });
    }

    const moreFees = document.getElementById('more-item-fees');
    const moreTimetable = document.getElementById('more-item-timetable');
    const moreClinic = document.getElementById('more-item-clinic');
    const moreContact = document.getElementById('more-item-contact');

    if (moreFees) moreFees.addEventListener('click', () => showPhoneToast('Quarter 3 Fee Receipt #SIS-9481 Downloaded (PDF)', 'fas fa-receipt'));
    if (moreTimetable) moreTimetable.addEventListener('click', () => showPhoneToast('Next Class: Physics Lab with Dr. Rao (Room 102)', 'fas fa-clock'));
    if (moreClinic) moreClinic.addEventListener('click', () => showPhoneToast('Campus Clinic: All vitals normal • Last check: 10 May', 'fas fa-heart-pulse'));
    if (moreContact) moreContact.addEventListener('click', () => showPhoneToast('Dialing Principal Helpline (+91 80 4912 3000)...', 'fas fa-phone'));

    const parentTriggers = document.querySelectorAll('#triggers-parent [data-trigger]');
    parentTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const trigger = btn.getAttribute('data-trigger');
        if (trigger === 'attendance') openSubview('subview-attendance');
        else if (trigger === 'homework') {
          openSubview('subview-homework');
          setTimeout(() => { if (ttsBtn) ttsBtn.click(); }, 400);
        } else if (trigger === 'notifications') openSubview('subview-notifications');
        else if (trigger === 'calendar') openSubview('subview-calendar');
        else if (trigger === 'sibling') { if (siblingSheet) siblingSheet.classList.add('active'); }
        else if (trigger === 'moments') openMomentModal('annual-day');
        else if (trigger === 'more') openSubview('subview-more');
      });
    });

    allSheets.forEach(sheet => {
      sheet.addEventListener('click', (e) => {
        if (e.target === sheet) sheet.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   6. NUMERICAL STAT COUNTERS
   ========================================================================== */
function initInteractiveCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target') || '0');
        const isDecimal = targetVal % 1 !== 0;
        const suffix = el.getAttribute('data-suffix') || '';
        let startVal = 0;
        const duration = 1800;
        const startTime = performance.now();

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          // Ease out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = startVal + (targetVal - startVal) * ease;

          el.textContent = isDecimal ? current.toFixed(1) + suffix : Math.round(current) + suffix;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = (isDecimal ? targetVal.toFixed(1) : targetVal) + suffix;
          }
        }

        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   7. INTERACTIVE DEMO MODAL
   ========================================================================== */
function initDemoModal() {
  const openButtons = document.querySelectorAll('.trigger-demo-modal, #btn-hero-click-to-join');
  const modal = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('btn-close-modal');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Attach click listeners to all demo trigger buttons
  openButtons.forEach(btn => btn.addEventListener('click', openModal));

  // 1. Close button click
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // 2. Click outside modal dialog (backdrop click)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 3. Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

