
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');


function setupCustomCursor() {
  if (!cursor || !cursorFollower) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
   
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    }, 50);
  });
  
  
  const clickableElements = document.querySelectorAll('a, button, .btn, .project-item, .nav-toggle, .filter-btn');
  
  clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.border = '2px solid var(--primary)';
      cursorFollower.style.width = '30px';
      cursorFollower.style.height = '30px';
      cursorFollower.style.borderWidth = '1px';
      element.style.cursor = 'none';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursor.style.backgroundColor = 'var(--primary)';
      cursor.style.border = 'none';
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursorFollower.style.borderWidth = '2px';
      element.style.cursor = 'auto';
    });
  });
  
 
  document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '0.6';
  });
  
 
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}


function setupParallaxEffects() {
 
  const heroSection = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (!heroSection || !heroContent) return;
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
      
      const translateY = scrollPosition * 0.3;
      heroContent.style.transform = `translateY(${translateY}px)`;
      
     
      const opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
      heroContent.style.opacity = Math.max(opacity, 0.3);
    }
  });
  

  heroSection.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const heroImage = document.querySelector('.avatar-bg');
    if (heroImage) {
      heroImage.style.transform = `rotate(-6deg) translate(${moveX}px, ${moveY}px)`;
    }
  });
}


function setupSmoothScrolling() {
  const scrollLinks = document.querySelectorAll('a[data-scroll]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}


function setupPageLoader() {
  
  document.body.classList.add('is-loading');
  
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.remove('is-loading');
      
    
      document.querySelectorAll('.hero-text > *').forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('show');
        }, 200 * index);
      });
    }, 500);
  });
}


function setupButtonEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
      const btnRect = button.getBoundingClientRect();
      const mouseX = e.clientX - btnRect.left;
      const mouseY = e.clientY - btnRect.top;
      
      const highlight = document.createElement('span');
      highlight.classList.add('btn-highlight');
      highlight.style.left = `${mouseX}px`;
      highlight.style.top = `${mouseY}px`;
      
      button.appendChild(highlight);
      
      setTimeout(() => {
        highlight.remove();
      }, 500);
    });
  });
}


function setupProjectEffects() {
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const overlay = item.querySelector('.project-overlay');
      overlay.style.opacity = '1';
      
      const info = item.querySelector('.project-info');
      info.style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
      const overlay = item.querySelector('.project-overlay');
      overlay.style.opacity = '0';
      
      const info = item.querySelector('.project-info');
      info.style.transform = 'translateY(20px)';
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
 
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  
  if (supportsHover) {
    setupCustomCursor();
  } else {
 
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
  }
  
  setupParallaxEffects();
  setupSmoothScrolling();
  setupButtonEffects();
  setupProjectEffects();
  setupPageLoader();
});