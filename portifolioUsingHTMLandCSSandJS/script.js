// ===== PORTFOLIO JAVASCRIPT - script.js =====
// Interactive features for Alex Rivera portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // --- 1. SMOOTH SCROLLING FOR NAVIGATION LINKS ---
  const navLinks = document.querySelectorAll('.nav-links a, .btn-group a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Check if it's an anchor link to a section
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70; // Account for sticky header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Update active class
          updateActiveNavLink(targetId);
        }
      }
    });
  });

  // --- 2. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL ---
  function updateActiveNavLink(activeId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === `#${activeId}`) {
        link.classList.add('active');
      } else if (href && href.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }

  function highlightCurrentSection() {
    const sections = ['home', 'skills', 'projects', 'about', 'contact'];
    let currentSection = '';

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        // If section is in viewport (with some offset)
        if (rect.top <= 150 && rect.bottom >= 100) {
          currentSection = sectionId;
        }
      }
    });

    if (currentSection) {
      updateActiveNavLink(currentSection);
    }
  }

  window.addEventListener('scroll', highlightCurrentSection);
  highlightCurrentSection(); // Initial check

  // --- 3. FORM VALIDATION WITH REAL-TIME FEEDBACK ---
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('project');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  // Error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Validation functions
  function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
      nameError.textContent = 'Full name is required';
      nameInput.classList.add('error-input');
      return false;
    } else if (name.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters';
      nameInput.classList.add('error-input');
      return false;
    } else {
      nameError.textContent = '';
      nameInput.classList.remove('error-input');
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      emailError.textContent = 'Email address is required';
      emailInput.classList.add('error-input');
      return false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email (e.g., name@domain.com)';
      emailInput.classList.add('error-input');
      return false;
    } else {
      emailError.textContent = '';
      emailInput.classList.remove('error-input');
      return true;
    }
  }

  function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
      messageError.textContent = 'Message is required';
      messageInput.classList.add('error-input');
      return false;
    } else if (message.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      messageInput.classList.add('error-input');
      return false;
    } else {
      messageError.textContent = '';
      messageInput.classList.remove('error-input');
      return true;
    }
  }

  // Real-time validation
  if (nameInput) {
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);
  }

  if (emailInput) {
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
  }

  if (messageInput) {
    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        // Simulate form submission (since no backend)
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.innerHTML = '';

        // Simulate API call with timeout
        setTimeout(() => {
          // Success message
          formStatus.innerHTML = '<div class="form-status success">✓ Message sent successfully! I\'ll get back to you soon.</div>';
          formStatus.className = 'form-status success';

          // Reset form
          contactForm.reset();

          // Clear errors and styling
          nameError.textContent = '';
          emailError.textContent = '';
          messageError.textContent = '';
          nameInput.classList.remove('error-input');
          emailInput.classList.remove('error-input');
          messageInput.classList.remove('error-input');

          // Reset button
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message →';

          // Clear status message after 5 seconds
          setTimeout(() => {
            formStatus.innerHTML = '';
            formStatus.className = '';
          }, 5000);

          // Show toast notification
          showToast('Thanks for reaching out, Alex will respond within 24h!');
        }, 1200);
      } else {
        // Show error toast
        showToast('Please fix the errors in the form before submitting.', 'error');
        formStatus.innerHTML = '<div class="form-status error">Please fill all fields correctly.</div>';
        setTimeout(() => {
          if (formStatus.innerHTML.includes('Please fill')) {
            formStatus.innerHTML = '';
          }
        }, 3000);
      }
    });
  }

  // --- 4. TOAST NOTIFICATION SYSTEM ---
  function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // Style based on type
    if (type === 'error') {
      toast.style.background = '#dc2626';
    } else {
      toast.style.background = '#1f2937';
    }

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // --- 5. PROJECT LINK INTERACTIONS (Interactive demo simulation) ---
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const projectName = this.getAttribute('data-project') || 'this project';
      showToast(`✨ Opening ${projectName} demo — coming soon! ✨`);
    });
  });

  // --- 6. SKILL CARD INTERACTION (click effect) ---
  const skillCards = document.querySelectorAll('.skill-card');

  skillCards.forEach(card => {
    card.addEventListener('click', function() {
      const skillName = this.querySelector('.skill-name')?.textContent || 'skill';
      showToast(`💡 ${skillName} — One of my core competencies!`);

      // Add a little bounce effect
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // --- 7. DARK/LIGHT MODE TOGGLE (Bonus feature) ---
  // Create theme toggle button and add to navbar
  const navContainer = document.querySelector('.nav-container');
  if (navContainer && !document.querySelector('.theme-toggle')) {
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
      background: none;
      border: none;
      font-size: 1.3rem;
      cursor: pointer;
      padding: 0.3rem 0.6rem;
      border-radius: 50%;
      transition: background 0.2s;
      margin-left: 0.5rem;
    `;
    themeToggle.style.background = '#f3f4f6';

    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        applyDarkMode();
      } else {
        themeToggle.textContent = '🌙';
        removeDarkMode();
      }
    });

    navContainer.appendChild(themeToggle);
  }

  function applyDarkMode() {
    const style = document.createElement('style');
    style.id = 'dark-mode-styles';
    style.textContent = `
      body.dark-mode {
        background: #0f172a;
        color: #e2e8f0;
      }
      body.dark-mode .navbar {
        background: rgba(15, 23, 42, 0.96);
        border-bottom-color: #334155;
      }
      body.dark-mode .nav-links a {
        color: #cbd5e1;
      }
      body.dark-mode .hero,
      body.dark-mode .skills-section,
      body.dark-mode .projects-section,
      body.dark-mode .about-section {
        background: #0f172a;
      }
      body.dark-mode .skill-card,
      body.dark-mode .project-card,
      body.dark-mode .form-card {
        background: #1e293b;
        border-color: #334155;
      }
      body.dark-mode .skill-card:hover,
      body.dark-mode .project-card:hover {
        background: #334155;
      }
      body.dark-mode .hero-visual {
        background: linear-gradient(125deg, #1e293b, #0f172a);
      }
      body.dark-mode .avatar-placeholder {
        background: #334155;
      }
      body.dark-mode .project-img {
        background: linear-gradient(135deg, #334155, #1e293b);
      }
      body.dark-mode .tag,
      body.dark-mode .hero-badge {
        background: #334155;
        color: #93c5fd;
      }
      body.dark-mode .form-group input,
      body.dark-mode .form-group textarea {
        background: #0f172a;
        border-color: #475569;
        color: #e2e8f0;
      }
      body.dark-mode .about-stats {
        background: #1e293b;
      }
      body.dark-mode .btn-outline {
        background: #334155;
        border-color: #475569;
        color: #e2e8f0;
      }
      body.dark-mode .btn-outline:hover {
        background: #475569;
      }
      body.dark-mode .contact-section {
        background: #0f172a;
      }
      body.dark-mode .stat-number {
        color: #60a5fa;
      }
    `;

    if (!document.getElementById('dark-mode-styles')) {
      document.head.appendChild(style);
    }
  }

  function removeDarkMode() {
    const darkStyles = document.getElementById('dark-mode-styles');
    if (darkStyles) {
      darkStyles.remove();
    }
  }

  // --- 8. TYPING EFFECT FOR HERO BADGE (fun addition) ---
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    const originalText = heroBadge.textContent;
    heroBadge.textContent = '';
    let i = 0;

    function typeEffect() {
      if (i < originalText.length) {
        heroBadge.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
      }
    }
    // Only run if user hasn't scrolled (just for fun, but safe)
    setTimeout(typeEffect, 300);
  }

  // --- 9. SCROLL REVEAL ANIMATION (simple fade-in) ---
  const fadeElements = document.querySelectorAll('.skill-card, .project-card, .about-stats');

  function checkFadeIn() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight - 100) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  // Set initial styles
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('scroll', checkFadeIn);
  checkFadeIn(); // Initial check

  console.log('🌟 Portfolio JS loaded - ready to impress!');
});