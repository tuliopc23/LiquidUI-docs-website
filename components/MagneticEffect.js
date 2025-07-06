// Add this file to implement magnetic hover effects
export function initMagneticElements() {
  const magneticElements = document.querySelectorAll('.magnetic-element');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate distance from center (0-1)
      const distance = Math.sqrt(x*x + y*y);
      const maxDistance = Math.sqrt(Math.pow(rect.width/2, 2) + Math.pow(rect.height/2, 2));
      const strength = Math.min(distance / maxDistance, 1) * 0.3; // Max 30% movement
      
      // Apply transform
      this.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}

// Add scroll animation effects
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}