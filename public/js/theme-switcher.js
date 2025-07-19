/**
 * Theme Switcher - Camping Journey Equipaments MX
 * Controla o modo escuro/claro com efeitos cinematográficos
 */

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o botão de toggle e o elemento HTML
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;
  
  // Verifica preferência salva ou usa preferência do sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplica o tema apropriado
  const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Atualiza a aparência do botão
    updateToggleAppearance(theme);
    
    // Adiciona efeito de transição cinematográfica
    addCinematicTransition(theme);
  };
  
  // Define o tema inicial
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);
  
  // Alterna o tema quando o botão é clicado
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Adiciona classe para animação do clique
    themeToggle.classList.add('clicked');
    
    // Remove a classe após a animação
    setTimeout(() => {
      themeToggle.classList.remove('clicked');
    }, 300);
    
    setTheme(newTheme);
  });
  
  /**
   * Atualiza a aparência do botão de toggle baseado no tema
   */
  function updateToggleAppearance(theme) {
    // Atualiza o ícone SVG do botão de toggle
    const svgIcon = document.querySelector('.theme-toggle-icon svg');
    const toggleIcon = themeToggle.querySelector('.theme-toggle-icon');
    
    if (svgIcon) {
      if (theme === 'dark') {
        // Ícone da lua para o modo escuro
        svgIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      } else {
        // Ícone do sol para o modo claro
        svgIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      }
    }
    
    if (theme === 'dark') {
      toggleIcon.classList.add('dark');
      toggleIcon.classList.remove('light');
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      toggleIcon.classList.add('light');
      toggleIcon.classList.remove('dark');
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
  
  /**
   * Adiciona efeito de transição cinematográfica ao mudar o tema
   */
  function addCinematicTransition(theme) {
    // Cria overlay para transição
    const overlay = document.createElement('div');
    overlay.classList.add('theme-transition-overlay');
    document.body.appendChild(overlay);
    
    // Anima o overlay
    setTimeout(() => {
      overlay.classList.add('active');
      
      // Remove o overlay após a animação
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 500);
      }, 500);
    }, 50);
  }
});

