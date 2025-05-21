
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('themeToggle');
const header = document.querySelector('.header');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const skillBars = document.querySelectorAll('.skill-bar');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const resetFormButton = document.getElementById('resetForm');
const typingText = document.getElementById('typingText');

function setupNavigation() {
  
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

 
  const navLinkElements = document.querySelectorAll('.nav-link');
  navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('nav-open');
      
     
      navLinkElements.forEach(el => el.classList.remove('active'));
      link.classList.add('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
   
    updateActiveNavOnScroll();
  });
  
  
  themeToggle.addEventListener('click', toggleTheme);
  
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}


function setupProjectFilters() {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
     
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
   
      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}


function setupContactForm() {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
   
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    if (!formValues.name || !formValues.email || !formValues.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    
    setTimeout(() => {
      formSuccess.classList.add('active');
    }, 500);
  });
  
  resetFormButton.addEventListener('click', () => {
    formSuccess.classList.remove('active');
    contactForm.reset();
  });
}


function setupTypingAnimation() {
  const phrases = [
    'Building beautiful web experiences.',
    'Crafting responsive UIs.',
    'Creating seamless user journeys.',
    'Transforming ideas into reality.'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
    
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      
      isDeleting = true;
      typingSpeed = 1000; 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 300; 
    }
    
    setTimeout(type, typingSpeed);
  }
  
 
  setTimeout(type, 1000);
}


function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    
   
    bar.style.width = '0%';
    
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(bar.parentElement);
  });
}


function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupProjectFilters();
  setupContactForm();
  setupTypingAnimation();
  animateSkillBars();
  setupScrollAnimations();
});