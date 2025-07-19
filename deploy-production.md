# 🚀 GUIA DE DEPLOY PRODUÇÃO - CAMPING JOURNEY MX

## 📋 PRÉ-REQUISITOS

### 1. DOMÍNIO REGISTRADO
- ✅ **camping-journey.com.mx** - Registrado
- ✅ **www.camping-journey.com.mx** - Subdomínio configurado

### 2. CONTAS NECESSÁRIAS
- [ ] **Vercel Account** - Para hosting
- [ ] **Google Analytics** - Para tracking
- [ ] **Facebook Business** - Para pixel
- [ ] **Google Search Console** - Para SEO
- [ ] **Hotjar** - Para heatmaps
- [ ] **Email Provider** - Para emails profissionais

---

## 🔧 CONFIGURAÇÃO DO DEPLOY

### PASSO 1: VERCEL SETUP

1. **Conectar Repositório:**
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Login na Vercel
   vercel login
   
   # Deploy inicial
   vercel --prod
   ```

2. **Configurar Domínio Customizado:**
   - Dashboard Vercel > Project Settings > Domains
   - Adicionar: `camping-journey.com.mx`
   - Adicionar: `www.camping-journey.com.mx`
   - Configurar DNS:
     ```
     Type: A
     Name: @
     Value: 76.76.19.61
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **Variáveis de Ambiente:**
   ```env
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://camping-journey.com.mx
   NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id
   CONTACT_EMAIL=contato@camping-journey.com.mx
   ```

### PASSO 2: ANALYTICS SETUP

#### Google Analytics 4
1. **Criar Propriedade:**
   - Acessar: https://analytics.google.com
   - Criar conta > Propriedade
   - Nome: "Camping Journey MX"
   - País: México
   - Moeda: MXN (Peso Mexicano)

2. **Configurar Enhanced Ecommerce:**
   ```javascript
   // Eventos configurados no analytics-tracking.js:
   - view_item (visualização de produto)
   - add_to_cart (adicionar ao carrinho)
   - purchase (compra)
   - sign_up (newsletter)
   - generate_lead (contato)
   ```

3. **Configurar Metas:**
   - Newsletter Signup
   - Contact Form Submit
   - Product View
   - Add to Cart
   - Purchase (futuro)

#### Facebook Pixel
1. **Criar Pixel:**
   - Business Manager > Eventos > Pixels
   - Criar Pixel: "Camping Journey MX"
   - Copiar Pixel ID

2. **Eventos Configurados:**
   - PageView
   - ViewContent
   - AddToCart
   - Subscribe
   - Lead

#### Google Search Console
1. **Verificar Propriedade:**
   - Adicionar propriedade: `https://camping-journey.com.mx`
   - Método: Meta tag (já incluída no HTML)
   - Submeter sitemap: `https://camping-journey.com.mx/sitemap.xml`

#### Hotjar
1. **Criar Site:**
   - Acessar: https://hotjar.com
   - Adicionar site: camping-journey.com.mx
   - Copiar Site ID

### PASSO 3: EMAIL PROFISSIONAL

#### Configurar Emails
- **contato@camping-journey.com.mx** - Contato geral
- **vendas@camping-journey.com.mx** - Vendas
- **suporte@camping-journey.com.mx** - Suporte
- **admin@camping-journey.com.mx** - Administração

#### Provedor Recomendado
**Google Workspace** ou **Zoho Mail**
```
MX Records:
Priority: 10
Host: @
Points to: mx1.zoho.com

Priority: 20
Host: @
Points to: mx2.zoho.com
```

---

## ⚡ COMANDOS DE DEPLOY

### Deploy Automático (Recomendado)
```bash
# Push para branch main
git add .
git commit -m "feat: production ready"
git push origin main

# Vercel auto-deploy ativado
```

### Deploy Manual
```bash
# Build local
npm run build

# Deploy com Vercel CLI
vercel --prod

# Verificar deploy
vercel ls
```

---

## 🔍 VERIFICAÇÕES PÓS-DEPLOY

### ✅ CHECKLIST TÉCNICO

#### Performance
- [ ] **PageSpeed Insights** > 90
- [ ] **GTmetrix Grade** A
- [ ] **Core Web Vitals** aprovados
- [ ] **Mobile Friendly** test aprovado

#### SEO
- [ ] **Sitemap** submetido no Search Console
- [ ] **Robots.txt** acessível
- [ ] **Meta tags** todas preenchidas
- [ ] **Schema markup** validado
- [ ] **Hreflang** configurado (PT/EN/ES)

#### Analytics
- [ ] **Google Analytics** recebendo dados
- [ ] **Facebook Pixel** tracking eventos
- [ ] **Search Console** sem erros
- [ ] **Hotjar** gravando sessões

#### Funcionalidades
- [ ] **Menu lateral** funcionando
- [ ] **Dark mode** toggle funcionando
- [ ] **Language switcher** funcionando
- [ ] **Cart system** funcionando
- [ ] **Newsletter** funcionando
- [ ] **Contact forms** funcionando

### 🌐 TESTES DE PRODUÇÃO

#### URLs para Testar
```
https://camping-journey.com.mx/
https://www.camping-journey.com.mx/ (redirect)
https://camping-journey.com.mx/?lang=pt
https://camping-journey.com.mx/?lang=en
https://camping-journey.com.mx/?lang=es
https://camping-journey.com.mx/wild-news.html
https://camping-journey.com.mx/sitemap.xml
https://camping-journey.com.mx/robots.txt
```

#### Ferramentas de Teste
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Mobile Friendly**: https://search.google.com/test/mobile-friendly
- **Schema Validator**: https://validator.schema.org/
- **SSL Test**: https://www.ssllabs.com/ssltest/

---

## 📊 MONITORAMENTO CONTÍNUO

### KPIs Principais
- **Visitantes únicos/mês**
- **Taxa de conversão newsletter**
- **Tempo médio na página**
- **Taxa de rejeição**
- **Velocidade de carregamento**
- **Uptime do site**

### Alertas Configurar
- **Site offline** (UptimeRobot)
- **Erro 404** (Search Console)
- **Velocidade lenta** (PageSpeed)
- **Problemas SSL** (SSL Monitor)

---

## 🚨 TROUBLESHOOTING

### Problemas Comuns

#### DNS não propaga
```bash
# Verificar DNS
nslookup camping-journey.com.mx
dig camping-journey.com.mx

# Aguardar até 48h para propagação completa
```

#### Analytics não trackeia
1. Verificar IDs corretos no código
2. Desabilitar ad blockers para teste
3. Verificar console do navegador
4. Testar em modo incógnito

#### SSL não funciona
1. Verificar configuração Vercel
2. Aguardar provisioning SSL
3. Forçar HTTPS no Vercel

#### Performance baixa
1. Otimizar imagens (WebP)
2. Minificar CSS/JS
3. Ativar cache headers
4. Usar CDN

---

## 📞 CONTATOS DE SUPORTE

### Emergências
- **Vercel Support**: support@vercel.com
- **Domain Provider**: suporte do registrar
- **DNS Issues**: CloudFlare/registrar

### Monitoramento
- **Google Analytics**: analytics.google.com
- **Search Console**: search.google.com/search-console
- **Vercel Dashboard**: vercel.com/dashboard

---

## 🎯 PRÓXIMOS PASSOS

### Pós-Deploy Imediato
1. **Testar todas funcionalidades**
2. **Configurar alertas de monitoramento**
3. **Submeter sitemap no Search Console**
4. **Configurar emails profissionais**
5. **Testar analytics em produção**

### Primeira Semana
1. **Monitorar performance**
2. **Verificar erros no console**
3. **Analisar dados iniciais**
4. **Ajustar configurações se necessário**

### Primeiro Mês
1. **Análise completa de analytics**
2. **Otimizações baseadas em dados**
3. **A/B tests iniciais**
4. **Expansão de funcionalidades**

---

**🚀 SITE PRONTO PARA RECEBER TRÁFEGO REAL E VENDAS!** 