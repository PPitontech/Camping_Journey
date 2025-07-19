/**
 * Brand Identity - Camping Journey Equipaments MX
 * Aplica a identidade visual cinematográfica em todo o site
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar a identidade visual
    initBrandIdentity();
});

/**
 * Inicializa todos os elementos da identidade visual
 */
function initBrandIdentity() {
    // Aplicar favicon
    applyFavicon();
    
    // Aplicar logo no cabeçalho
    applyHeaderLogo();
    
    // Aplicar logo no rodapé
    applyFooterLogo();
    
    // Aplicar logo na comunidade
    applyCommunityLogo();
    
    // Aplicar logo no Wild News
    applyWildNewsLogo();
    
    // Aplicar logo no dashboard
    applyDashboardLogo();
    
    // Melhorar o toggle de tema
    enhanceThemeToggle();
    
    // Adicionar efeitos cinematográficos
    applyCinematicEffects();
    
    // Inicializar animações
    initAnimations();
}

/**
 * Aplica o favicon do site
 */
function applyFavicon() {
    // Verificar se já existe um favicon
    let favicon = document.querySelector('link[rel="icon"]');
    
    // Se não existir, criar um novo
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }
    
    // Definir o caminho para o favicon
    favicon.href = '/images/favicon.ico';
    
    // Adicionar também apple-touch-icon para dispositivos iOS
    let touchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    
    if (!touchIcon) {
        touchIcon = document.createElement('link');
        touchIcon.rel = 'apple-touch-icon';
        document.head.appendChild(touchIcon);
    }
    
    touchIcon.href = '/images/apple-touch-icon.png';
}

/**
 * Aplica o logo no cabeçalho
 */
function applyHeaderLogo() {
    const headerLogo = document.querySelector('.logo-img');
    
    if (headerLogo) {
        headerLogo.src = '/images/Logo_Camping_Journey1.png';
        headerLogo.alt = 'Camping Journey Equipaments MX';
        
        // Adicionar efeito de brilho ao passar o mouse
        headerLogo.classList.add('glow-on-hover');
    }
}

/**
 * Aplica o logo no rodapé
 */
function applyFooterLogo() {
    const footerLogo = document.querySelector('.footer-logo img');
    
    if (footerLogo) {
        footerLogo.src = '/images/Logo_Camping_Journey1.png';
        footerLogo.alt = 'Camping Journey Equipaments MX';
    }
}

/**
 * Aplica o logo na seção de comunidade
 */
function applyCommunityLogo() {
    const communitySection = document.querySelector('.community');
    
    if (communitySection) {
        // Verificar se já existe um logo na seção de comunidade
        let communityLogo = communitySection.querySelector('.community-logo');
        
        // Se não existir, criar um novo
        if (!communityLogo) {
            const communityContent = communitySection.querySelector('.community-content');
            
            if (communityContent) {
                const logoContainer = document.createElement('div');
                logoContainer.className = 'community-logo';
                logoContainer.innerHTML = `<img src="/images/Logo_Camping_Journey1.png" alt="Camping Journey Community" class="fade-in">`;
                
                // Inserir antes do primeiro elemento
                communityContent.insertBefore(logoContainer, communityContent.firstChild);
            }
        } else {
            // Se já existir, atualizar o src
            const logoImg = communityLogo.querySelector('img');
            if (logoImg) {
                logoImg.src = '/images/Logo_Camping_Journey1.png';
            }
        }
    }
}

/**
 * Aplica o logo na seção Wild News
 */
function applyWildNewsLogo() {
    const wildNewsSection = document.querySelector('.wild-news');
    
    if (wildNewsSection) {
        // Verificar se já existe um logo na seção Wild News
        let wildNewsHeader = wildNewsSection.querySelector('.section-header');
        
        if (wildNewsHeader) {
            // Verificar se já existe um logo no cabeçalho da seção
            let wildNewsLogo = wildNewsHeader.querySelector('.wild-news-logo');
            
            if (!wildNewsLogo) {
                // Criar um novo elemento de logo
                wildNewsLogo = document.createElement('div');
                wildNewsLogo.className = 'wild-news-logo';
                wildNewsLogo.innerHTML = `<img src="/images/Logo_Camping_Journey1.png" alt="Wild News" class="fade-in" style="height: 60px; margin-bottom: 1rem;">`;
                
                // Inserir antes do primeiro elemento
                wildNewsHeader.insertBefore(wildNewsLogo, wildNewsHeader.firstChild);
            } else {
                // Se já existir, atualizar o src
                const logoImg = wildNewsLogo.querySelector('img');
                if (logoImg) {
                    logoImg.src = '/images/Logo_Camping_Journey1.png';
                }
            }
        }
    }
}

/**
 * Aplica o logo no dashboard
 */
function applyDashboardLogo() {
    // Verificar se estamos na página do dashboard
    if (window.location.pathname.includes('/dashboard') || 
        window.location.pathname.includes('/admin')) {
        
        const dashboardHeader = document.querySelector('.dashboard-header');
        
        if (dashboardHeader) {
            // Verificar se já existe um logo no cabeçalho do dashboard
            let dashboardLogo = dashboardHeader.querySelector('.dashboard-logo img');
            
            if (dashboardLogo) {
                dashboardLogo.src = '/images/Logo_Camping_Journey1.png';
                dashboardLogo.alt = 'Camping Journey Dashboard';
            } else {
                // Se não existir um elemento de logo, criar um novo
                const logoContainer = document.createElement('div');
                logoContainer.className = 'dashboard-logo';
                logoContainer.innerHTML = `<img src="/images/Logo_Camping_Journey1.png" alt="Camping Journey Dashboard" style="height: 40px;">`;
                
                // Inserir no início do cabeçalho
                dashboardHeader.insertBefore(logoContainer, dashboardHeader.firstChild);
            }
        }
    }
}

/**
 * Melhora o toggle de tema com estilo cinematográfico
 */
function enhanceThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Remover conteúdo atual
        themeToggle.innerHTML = '';
        
        // Criar novo ícone com estilo cinematográfico
        const toggleIcon = document.createElement('div');
        toggleIcon.className = 'theme-toggle-icon';
        
        // Adicionar ao botão
        themeToggle.appendChild(toggleIcon);
        
        // Adicionar efeito de brilho ao passar o mouse
        themeToggle.classList.add('glow-on-hover');
        
        // Adicionar classes para animação
        themeToggle.classList.add('fade-in');
    }
}

/**
 * Aplica efeitos cinematográficos em elementos da página
 */
function applyCinematicEffects() {
    // Aplicar overlay cinematográfico em imagens de fundo
    applyBackgroundOverlays();
    
    // Aplicar efeitos de hover em botões
    applyButtonEffects();
    
    // Aplicar efeitos de parallax
    applyParallaxEffects();
    
    // Aplicar efeitos de vídeo
    applyVideoEffects();
}

/**
 * Aplica overlays cinematográficos em imagens de fundo
 */
function applyBackgroundOverlays() {
    // Aplicar overlay na seção hero
    const hero = document.querySelector('.hero');
    if (hero && !hero.querySelector('.hero-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'hero-overlay';
        hero.appendChild(overlay);
    }
    
    // Aplicar overlay na seção de comunidade
    const community = document.querySelector('.community');
    if (community && !community.querySelector('.overlay-blue')) {
        community.classList.add('overlay-blue');
    }
    
    // Aplicar overlay na seção de depoimentos
    const testimonials = document.querySelector('.testimonials');
    if (testimonials && !testimonials.querySelector('.overlay-dark')) {
        testimonials.classList.add('overlay-dark');
    }
}

/**
 * Aplica efeitos de hover em botões
 */
function applyButtonEffects() {
    // Selecionar todos os botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Adicionar efeito de brilho ao passar o mouse
        if (button.classList.contains('btn-primary')) {
            button.classList.add('glow-on-hover');
        } else if (button.classList.contains('btn-secondary')) {
            button.classList.add('glow-orange-on-hover');
        }
        
        // Adicionar efeito de ripple ao clicar
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adicionar CSS para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Aplica efeitos de parallax
 */
function applyParallaxEffects() {
    // Selecionar elementos que terão efeito parallax
    const parallaxElements = document.querySelectorAll('.hero, .community-bg');
    
    if (parallaxElements.length > 0) {
        // Função para atualizar a posição dos elementos
        const updateParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrollTop * speed);
                element.style.backgroundPosition = `center ${yPos}px`;
            });
        };
        
        // Adicionar evento de scroll
        window.addEventListener('scroll', updateParallax);
        
        // Inicializar
        updateParallax();
    }
}

/**
 * Aplica efeitos em vídeos de fundo
 */
function applyVideoEffects() {
    // Verificar se existe um vídeo de fundo na seção hero
    const hero = document.querySelector('.hero');
    
    if (hero) {
        let heroVideo = hero.querySelector('.hero-video');
        
        // Se não existir, criar um novo
        if (!heroVideo) {
            heroVideo = document.createElement('video');
            heroVideo.className = 'hero-video';
            heroVideo.autoplay = true;
            heroVideo.loop = true;
            heroVideo.muted = true;
            heroVideo.playsInline = true;
            
            // Adicionar source
            const source = document.createElement('source');
            source.src = '/videos/hero-background.mp4';
            source.type = 'video/mp4';
            
            heroVideo.appendChild(source);
            
            // Adicionar fallback para navegadores que não suportam vídeo
            const fallbackImg = document.createElement('img');
            fallbackImg.src = '/images/hero-fallback.webp';
            fallbackImg.alt = 'Camping Journey Experience';
            heroVideo.appendChild(fallbackImg);
            
            // Inserir no início da seção hero
            hero.insertBefore(heroVideo, hero.firstChild);
        }
    }
}

/**
 * Inicializa animações para elementos da página
 */
function initAnimations() {
    // Animar elementos quando entrarem na viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .section-subtitle, .product-card, .testimonial-card, .news-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Verificar se o elemento está visível na viewport
            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                // Adicionar classe de animação apropriada
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    
                    if (element.classList.contains('section-title')) {
                        element.classList.add('fade-in-down');
                    } else if (element.classList.contains('section-subtitle')) {
                        element.classList.add('fade-in-up');
                        element.classList.add('delay-200');
                    } else if (element.classList.contains('product-card')) {
                        element.classList.add('fade-in-up');
                        // Adicionar delay com base na posição do elemento
                        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                        element.style.animationDelay = delay + 'ms';
                    } else if (element.classList.contains('testimonial-card')) {
                        element.classList.add('fade-in');
                        // Adicionar delay com base na posição do elemento
                        const delay = Array.from(element.parentNode.children).indexOf(element) * 150;
                        element.style.animationDelay = delay + 'ms';
                    } else if (element.classList.contains('news-card')) {
                        element.classList.add('fade-in-up');
                        // Adicionar delay com base na posição do elemento
                        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
                        element.style.animationDelay = delay + 'ms';
                    }
                }
            }
        });
    };
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar
    animateOnScroll();
    
    // Adicionar CSS para a classe animated
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            animation-duration: 1s;
            animation-fill-mode: both;
        }
    `;
    document.head.appendChild(style);
}

// Executar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initBrandIdentity);
