/**
 * Cinematic Loader - Camping Journey Equipaments MX
 * Adiciona um efeito de carregamento cinematográfico para melhorar a experiência do usuário
 */

document.addEventListener('DOMContentLoaded', () => {
  // Cria o elemento de loader
  const loader = document.createElement('div');
  loader.classList.add('cinematic-loader');
  
  // Adiciona o conteúdo do loader
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="80" height="80">
          <path fill="currentColor" d="M256 32l-192 96v256l192 96 192-96V128L256 32zm0 32l160 80v224l-160 80-160-80V144l160-80z"/>
          <path fill="currentColor" d="M256 128l-96 48v128l96 48 96-48V176l-96-48zm0 32l64 32v96l-64 32-64-32v-96l64-32z"/>
        </svg>
      </div>
      <div class="loader-progress">
        <div class="loader-bar"></div>
      </div>
      <div class="loader-text">Loading cinematic experience</div>
    </div>
  `;
  
  // Adiciona o loader ao body
  document.body.appendChild(loader);
  
  // Simula o progresso de carregamento
  const progressBar = loader.querySelector('.loader-bar');
  let progress = 0;
  
  const updateProgress = () => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    
    if (progress < 100) {
      setTimeout(updateProgress, 200);
    } else {
      // Quando o carregamento estiver completo, adiciona a classe para iniciar a animação de saída
      setTimeout(() => {
        loader.classList.add('loaded');
        
        // Remove o loader após a animação de saída
        setTimeout(() => {
          loader.remove();
          
          // Adiciona classe ao body para iniciar as animações da página
          document.body.classList.add('page-loaded');
        }, 1000);
      }, 500);
    }
  };
  
  // Inicia o progresso após um pequeno delay
  setTimeout(updateProgress, 300);
});
