/**
 * Smooth Scroll - Camping Journey Equipaments MX
 * Implementa rolagem suave com efeito cinematográfico
 */

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  // Adiciona listener de evento para cada link
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obtém o alvo do link
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Calcula a posição do elemento
      const headerOffset = 80; // Altura do cabeçalho fixo
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Animação cinematográfica de rolagem
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Adiciona efeito de destaque ao elemento de destino
      setTimeout(() => {
        targetElement.classList.add('highlight-section');
        setTimeout(() => {
          targetElement.classList.remove('highlight-section');
        }, 1500);
      }, 800);
    });
  });
  
  // Adiciona efeito de parallax em elementos com a classe .parallax
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
  
  // Adiciona animação de entrada para elementos quando ficam visíveis
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
  const sections = document.querySelectorAll('section');
  
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  };
  
  const handleScroll = () => {
    // Anima elementos com classes de animação
    animatedElements.forEach(element => {
      if (isElementInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
      }
    });
    
    // Adiciona efeito cinematográfico às seções quando entram no viewport
    sections.forEach(section => {
      if (isElementInViewport(section) && !section.classList.contains('section-visible')) {
        section.classList.add('section-visible');
        
        // Adiciona efeito de destaque aos títulos das seções
        const sectionTitle = section.querySelector('h2');
        if (sectionTitle && !sectionTitle.classList.contains('title-animated')) {
          sectionTitle.classList.add('title-animated');
        }
      }
    });
  };
  
  // Inicializa a verificação de elementos visíveis
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  
  // Verifica elementos visíveis no carregamento inicial
  setTimeout(handleScroll, 300);
});
