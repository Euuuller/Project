(function() {
  const html = document.documentElement;

  // ----- Canvas animado -----
  const canvas = document.getElementById('mathCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const symbols = [
      'e^{iπ}+1=0', 'f(x)=∫g(t)dt', '∇²φ=ρ/ε₀', 'lim_{x→∞}', 'Σaₙxⁿ',
      '∂f/∂x', 'P(A|B)', 'μ=Σx/n', 'σ²=Var(X)', 'z=R+jX', 'F=ma',
      'y=mx+b', 'det(A)', 'E[X]', 'χ²', 'R²', '∞', '√(x²+y²)',
      'β₀+β₁x', 'log₂(n)', '∀x∈ℝ', '∃ε>0', '∬f dA', '∮F·ds'
    ];
    let particles = [];

    function createParticle(fromTop = true) {
      return {
        x: Math.random() * canvas.width,
        y: fromTop ? Math.random() * canvas.height : canvas.height + 20,
        text: symbols[Math.floor(Math.random() * symbols.length)],
        size: 11 + Math.random() * 12,
        opacity: 0.035 + Math.random() * 0.1,
        speed: 0.1 + Math.random() * 0.25,
        angle: Math.random() * Math.PI * 2
      };
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor(canvas.width * canvas.height / 26000);
      particles = Array.from({ length: count }, () => createParticle(true));
      draw();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = html.getAttribute('data-theme') !== 'light';
      const color = isDark ? '255,255,255' : '0,0,0';

      for (let p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.font = `${p.size}px Georgia, serif`;
        ctx.fillStyle = `rgba(${color},${p.opacity})`;
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      }
    }

    function animate() {
      for (let i = 0; i < particles.length; i++) {
        particles[i].y -= particles[i].speed;
        particles[i].angle += 0.0008;
        if (particles[i].y < -50) {
          particles[i] = createParticle(false);
        }
      }
      draw();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  }

  // ----- Tema (claro/escuro) -----
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('iconSun');
  const moonIcon = document.getElementById('iconMoon');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
    moonIcon.style.display = theme === 'light' ? 'block' : 'none';
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ----- Navbar scroll -----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ----- Typing effect -----
  const words = ['Data Analyst', 'Data Scientist', 'Python Developer', 'SQL Expert'];
  let wordIndex = 0,
    charIndex = 0,
    deleting = false;
  const typedEl = document.getElementById('typedText');

  function type() {
    if (!typedEl) return;
    const currentWord = words[wordIndex];
    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    typedEl.textContent = currentWord.slice(0, charIndex);

    let delay = deleting ? 60 : 110;
    if (!deleting && charIndex === currentWord.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 800);

  // ----- Carrossel de projetos -----
  const track = document.getElementById('projectsTrack');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const cards = track ? track.querySelectorAll('.project-card') : [];

  if (track && prevBtn && nextBtn && cards.length) {
    let current = 0;
    const total = cards.length;

    function getStep() {
      const card = cards[0];
      const gap = parseInt(getComputedStyle(track).gap) || 32;
      return card.offsetWidth + gap;
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, total - 1));
      track.scrollTo({ left: current * getStep(), behavior: 'smooth' });
      updateUI();
    }

    function updateUI() {
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    nextBtn.addEventListener('click', () => goTo(current + 1));
    prevBtn.addEventListener('click', () => goTo(current - 1));

    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(Number(dot.dataset.dot)));
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            if (!isNaN(idx)) {
              current = idx;
              updateUI();
            }
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    cards.forEach(card => observer.observe(card));
    updateUI();
  }

  // ----- Smooth scroll para âncoras -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.getElementById('scrollDown')?.addEventListener('click', () => {
    document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
  });

  // ----- Scroll reveal -----
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ----- Mobile menu -----
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');
  const body = document.body;
  const mobileLinks = document.querySelectorAll('.mobile-link, .btn-cv-mobile');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    body.classList.add('menu-open');
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
  }

  menuToggle?.addEventListener('click', openMobileMenu);
  closeMenu?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // ----- Modal de projetos -----
  const modalOverlay = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesafio = document.getElementById('modalDesafio');
  const modalSolucao = document.getElementById('modalSolucao');
  const modalImpacto = document.getElementById('modalImpacto');
  const modalTags = document.getElementById('modalTags');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalLinks = document.getElementById('modalLinks');
  const closeModalBtn = document.getElementById('closeModal');

  const projectsData = [{
      title: 'Segmentação de Clientes (RFM)',
      desafio: 'Empresa de e-commerce com dificuldade em personalizar campanhas de marketing devido à falta de segmentação adequada.',
      solucao: 'Aplicação da análise RFM (Recência, Frequência, Valor Monetário) com clustering K-Means para agrupar clientes em perfis de compra.',
      impacto: 'Aumento de 23% na taxa de conversão das campanhas e redução de 15% no custo de aquisição de clientes.',
      tags: ['Python', 'SQL', 'Pandas', 'Scikit-learn'],
      metrics: ['1.5k Registros', '5 Segmentos'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Dashboard de Vendas',
      desafio: 'Diretoria sem visibilidade em tempo real dos indicadores de vendas, dificultando decisões estratégicas.',
      solucao: 'Criação de um dashboard interativo no Power BI conectado diretamente ao banco de dados transacional, com atualização automática.',
      impacto: 'Redução de 30% no tempo de reuniões de análise e identificação de oportunidades de cross-selling.',
      tags: ['Power BI', 'DAX', 'SQL', 'Excel'],
      metrics: ['KPIs em Tempo Real', '+15 usuários'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Detecção de Fraudes (ML)',
      desafio: 'Instituição financeira com alta taxa de fraudes não detectadas, gerando prejuízos significativos.',
      solucao: 'Desenvolvimento de modelo XGBoost com balanceamento de classes e validação cruzada para identificar transações suspeitas.',
      impacto: 'Acurácia de 95%, redução de 70% nos falsos negativos e economia anual estimada em R$ 2 milhões.',
      tags: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas'],
      metrics: ['95% Precisão', '2% Falsos Positivos'],
      github: '#',
      demo: '#'
    }
  ];

  function openModal(index) {
    const p = projectsData[index];
    if (!p) return;

    modalTitle.textContent = p.title;
    modalDesafio.textContent = p.desafio;
    modalSolucao.textContent = p.solucao;
    modalImpacto.textContent = p.impacto;

    modalTags.innerHTML = '';
    p.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'modal-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    modalMetrics.innerHTML = '';
    p.metrics.forEach(metric => {
      const parts = metric.split(' ');
      const value = parts[0];
      const label = parts.slice(1).join(' ') || '';
      const div = document.createElement('div');
      div.className = 'metric-item';
      div.innerHTML = `<span class="metric-value">${value}</span><span class="metric-label">${label}</span>`;
      modalMetrics.appendChild(div);
    });

    modalLinks.innerHTML = `
      <a href="${p.github}" class="modal-link" target="_blank">GitHub</a>
      <a href="${p.demo}" class="modal-link secondary" target="_blank">Ver Demo</a>
    `;

    modalOverlay.classList.add('active');
    body.classList.add('modal-open');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    body.classList.remove('modal-open');
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      const index = card.getAttribute('data-index');
      if (index !== null) openModal(parseInt(index));
    });
  });

  closeModalBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });
})();