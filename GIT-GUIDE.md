# 📦 GUIA GIT - CAMPING JOURNEY MX

## ✅ ARQUIVOS PARA INCLUIR NO GIT

### 🏗️ **ARQUIVOS DE CONFIGURAÇÃO**
```
✅ package.json                    # Dependências e scripts
✅ package-lock.json               # Lock de versões (se usar npm)
✅ tsconfig.json                   # Configuração TypeScript
✅ vercel.json                     # Configuração deploy Vercel
✅ build-production.js             # Script de build
✅ deploy-production.md            # Guia de deploy
✅ README.md                       # Documentação
✅ .gitignore                      # Este arquivo!
```

### 📁 **CÓDIGO FONTE (src/)**
```
✅ src/
   ✅ app.ts
   ✅ server.ts
   ✅ components/
      ✅ WindHeader.tsx
   ✅ data/
      ✅ models/
         ✅ Category.ts
         ✅ Product.ts
```

### 🌐 **ARQUIVOS PÚBLICOS (public/)**
```
✅ public/
   ✅ index.html                   # Página principal
   ✅ wild-news.html              # Página de notícias
   ✅ sitemap.xml                 # SEO
   ✅ robots.txt                  # SEO
   
   ✅ css/                        # Todos os CSS
      ✅ styles.css
      ✅ homepage.css
      ✅ sidebar-layout.css
      ✅ cart-styles.css
      ✅ dark-mode.css
      ✅ (todos os outros .css)
   
   ✅ js/                         # Todos os JavaScript
      ✅ main.js
      ✅ sidebar-layout.js
      ✅ analytics-tracking.js
      ✅ enhanced-i18n.js
      ✅ cart-system.js
      ✅ navigation-system.js
      ✅ (todos os outros .js)
   
   ✅ images/                     # Imagens do projeto
      ✅ Logo_Camping_Journey1.png
      ✅ favicon/
      ✅ products/
      ✅ Elements_UI/
      ✅ testimonials/
      ✅ community/
      ✅ wild-news/
   
   ✅ videos/                     # Vídeos
      ✅ hero-background.mp4
   
   ✅ wild-news/                  # Artigos
      ✅ articles/
         ✅ copper-canyon-adventure.html
```

### 📊 **DADOS E MENSAGENS**
```
✅ data/
   ✅ products.json               # Dados dos produtos

✅ messages/                      # Traduções
   ✅ en/
      ✅ homepage.json
   ✅ es/
      ✅ homepage.json
   ✅ pt/
      ✅ homepage.json
      ✅ wild-news.json
```

### 📋 **DOCUMENTAÇÃO**
```
✅ docs/                         # Estratégias e documentação
   ✅ advertising_strategy.md
   ✅ community_strategy.md
   ✅ content-strategy.md
   ✅ ideal_products.md
   ✅ kpi_dashboard.md
   ✅ platform_recommendation.md
   ✅ reinvestment_strategy.md
   ✅ security-compliance.md
   ✅ strategic_suppliers.md
```

---

## ❌ ARQUIVOS PARA **NÃO** INCLUIR NO GIT

### 🚫 **NUNCA COMMITAR**
```
❌ .env                          # Variáveis de ambiente
❌ .env.local                    # Ambiente local
❌ .env.production               # Ambiente produção
❌ config/production.env         # Configurações sensíveis
❌ node_modules/                 # Dependências (muito pesado)
❌ dist/                         # Build compilado
❌ build-info.json               # Gerado automaticamente
❌ .vercel/                      # Cache do Vercel
```

### 🗂️ **ARQUIVOS TEMPORÁRIOS**
```
❌ *.log                         # Logs
❌ *.tmp                         # Temporários
❌ .DS_Store                     # macOS
❌ Thumbs.db                     # Windows
❌ .vscode/                      # Configurações IDE
❌ .idea/                        # IntelliJ
```

---

## 🚀 COMANDOS GIT PARA O PROJETO

### **1. INICIALIZAR REPOSITÓRIO**
```bash
# Se ainda não tem git
git init

# Adicionar remote (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/camping-journey-mx.git
```

### **2. PRIMEIRO COMMIT**
```bash
# Adicionar todos os arquivos corretos
git add .

# Verificar o que será commitado
git status

# Fazer o commit inicial
git commit -m "feat: initial camping journey mx setup

- Complete responsive layout with sidebar
- Dark mode toggle with premium animations
- Multilingual support (PT/EN/ES)
- Shopping cart system
- Analytics tracking (GA4, Facebook Pixel, Hotjar)
- SEO optimization (sitemap, robots.txt, meta tags)
- Production deployment configuration
- Email professional setup ready"

# Enviar para GitHub
git push -u origin main
```

### **3. COMMITS FUTUROS**
```bash
# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: add new product categories"

# Push
git push origin main
```

### **4. BRANCHES PARA DEPLOY**
```bash
# Branch de desenvolvimento
git checkout -b development

# Branch de produção (já é main)
# main = produção
# development = desenvolvimento
```

---

## 📋 CHECKLIST ANTES DO COMMIT

### ✅ **VERIFICAR SEMPRE**
- [ ] **Não há arquivos .env** no git add
- [ ] **node_modules/** está no .gitignore
- [ ] **dist/** está no .gitignore
- [ ] **Imagens otimizadas** (não muito pesadas)
- [ ] **Código funciona** localmente
- [ ] **Sem senhas ou tokens** no código
- [ ] **Mensagem de commit** descritiva

### 🔍 **COMANDOS DE VERIFICAÇÃO**
```bash
# Ver o que será commitado
git status

# Ver diferenças
git diff

# Ver histórico
git log --oneline

# Ver arquivos ignorados
git ls-files --others --ignored --exclude-standard
```

---

## 🌿 ESTRUTURA DE BRANCHES

### **BRANCHES RECOMENDADAS**
```
main                    # 🚀 Produção (camping-journey.com.mx)
├── development        # 🔧 Desenvolvimento
├── feature/cart       # ✨ Nova funcionalidade
├── feature/products   # ✨ Nova funcionalidade
└── hotfix/bug-fix     # 🐛 Correções urgentes
```

### **WORKFLOW**
```bash
# 1. Desenvolvimento
git checkout development
git pull origin development

# 2. Nova feature
git checkout -b feature/nova-funcionalidade
# ... fazer mudanças ...
git add .
git commit -m "feat: nova funcionalidade"
git push origin feature/nova-funcionalidade

# 3. Merge para development
git checkout development
git merge feature/nova-funcionalidade

# 4. Deploy para produção
git checkout main
git merge development
git push origin main  # Auto-deploy no Vercel
```

---

## 🎯 TAMANHO DO REPOSITÓRIO

### **ESTIMATIVA DE TAMANHO**
```
📁 Código fonte:           ~2 MB
🖼️  Imagens otimizadas:    ~15 MB
📄 Documentação:          ~1 MB
⚙️  Configurações:         ~0.5 MB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 Total do repositório:   ~18.5 MB
```

### **OTIMIZAÇÕES**
- ✅ Imagens em WebP quando possível
- ✅ Vídeos comprimidos
- ✅ CSS/JS minificados em produção
- ✅ .gitignore completo

---

## 🔗 LINKS ÚTEIS

- **GitHub**: https://github.com/seu-usuario/camping-journey-mx
- **Vercel**: https://vercel.com/dashboard
- **Site Produção**: https://camping-journey.com.mx
- **Site Preview**: https://camping-journey-mx.vercel.app

---

## 🚨 COMANDOS DE EMERGÊNCIA

### **DESFAZER ÚLTIMO COMMIT**
```bash
# Manter mudanças
git reset --soft HEAD~1

# Descartar mudanças
git reset --hard HEAD~1
```

### **REMOVER ARQUIVO DO GIT (mas manter local)**
```bash
git rm --cached arquivo.txt
```

### **VER ARQUIVOS GRANDES**
```bash
git ls-files | xargs ls -la | sort -k5 -rn | head -10
```

---

**🎉 REPOSITÓRIO PRONTO PARA PRODUÇÃO!**

Agora você pode fazer commits seguros sabendo exatamente o que incluir e excluir do Git. 