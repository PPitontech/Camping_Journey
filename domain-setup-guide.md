# 🌐 CONFIGURAÇÃO DE DOMÍNIO - camping-journey.com.mx

## 📋 PASSO 1: CONFIGURAÇÃO DNS NO SEU PROVEDOR

### 🔧 REGISTROS DNS NECESSÁRIOS:

```dns
TIPO    NOME/HOST       VALOR/DESTINO           TTL
A       @               76.76.19.61             3600
A       www             76.76.19.61             3600
CNAME   *               cname.vercel-dns.com    3600
```

### 🏢 PROVEDORES MAIS COMUNS:

#### **GODADDY:**
1. Acesse: https://dcc.godaddy.com/
2. Selecione seu domínio camping-journey.com.mx
3. Vá em "DNS Management"
4. Adicione os registros acima
5. Aguarde 24-48h para propagação

#### **HOSTGATOR:**
1. Acesse cPanel do seu domínio
2. Vá em "Zone Editor" ou "DNS Zone Editor"
3. Adicione os registros A e CNAME
4. Salve as alterações

#### **NAMECHEAP:**
1. Login em namecheap.com
2. Domain List > Manage
3. Advanced DNS
4. Adicione os registros

#### **REGISTRO.BR (Brasil):**
1. Acesse: https://registro.br/
2. Login com sua conta
3. DNS > Editar Zona
4. Adicione os registros

## 📋 PASSO 2: CONFIGURAÇÃO NO VERCEL

### 🔗 ADICIONAR DOMÍNIO NO VERCEL:

1. **Acesse o Dashboard:**
   ```
   https://vercel.com/veo-paulos-projects/camping-journey-4vfq/settings/domains
   ```

2. **Adicione o Domínio:**
   - Clique em "Add Domain"
   - Digite: `camping-journey.com.mx`
   - Clique em "Add"

3. **Configure Subdomínios:**
   - Adicione também: `www.camping-journey.com.mx`
   - Configure redirect de www para apex domain

### ⚙️ CONFIGURAÇÕES RECOMENDADAS:

```json
{
  "domains": [
    "camping-journey.com.mx",
    "www.camping-journey.com.mx"
  ],
  "redirects": [
    {
      "source": "www.camping-journey.com.mx",
      "destination": "camping-journey.com.mx",
      "permanent": true
    }
  ]
}
```

## 📋 PASSO 3: VERIFICAÇÃO E TESTE

### 🔍 FERRAMENTAS DE VERIFICAÇÃO:

1. **Verificar DNS:**
   ```bash
   nslookup camping-journey.com.mx
   dig camping-journey.com.mx
   ```

2. **Verificar Online:**
   - https://dnschecker.org/
   - https://whatsmydns.net/
   - Digite: camping-journey.com.mx

3. **Teste SSL:**
   - https://www.ssllabs.com/ssltest/
   - Verifica certificado SSL automático do Vercel

## 📋 PASSO 4: CONFIGURAÇÃO DE EMAIL PROFISSIONAL

### 📧 EMAILS A CONFIGURAR:
- contato@camping-journey.com.mx
- vendas@camping-journey.com.mx
- suporte@camping-journey.com.mx

### 🏢 OPÇÕES DE PROVEDOR:

#### **GOOGLE WORKSPACE (Recomendado):**
- Custo: $6/usuário/mês
- 30GB de armazenamento
- Integração com Gmail, Drive, Meet
- Setup: https://workspace.google.com/

#### **ZOHO MAIL (Econômico):**
- Custo: $1/usuário/mês
- 5GB de armazenamento
- Interface profissional
- Setup: https://www.zoho.com/mail/

#### **MICROSOFT 365:**
- Custo: $6/usuário/mês
- Integração com Office
- Teams incluído

### 📝 REGISTROS MX NECESSÁRIOS:
```dns
TIPO    NOME    VALOR                       PRIORIDADE
MX      @       ASPMX.L.GOOGLE.COM          1
MX      @       ALT1.ASPMX.L.GOOGLE.COM     5
MX      @       ALT2.ASPMX.L.GOOGLE.COM     5
MX      @       ALT3.ASPMX.L.GOOGLE.COM     10
MX      @       ALT4.ASPMX.L.GOOGLE.COM     10
```

## 📋 PASSO 5: CONFIGURAÇÕES AVANÇADAS

### 🔒 SEGURANÇA:
```dns
TIPO    NOME                VALOR
TXT     @                   "v=spf1 include:_spf.google.com ~all"
TXT     _dmarc              "v=DMARC1; p=none; rua=mailto:dmarc@camping-journey.com.mx"
CNAME   selector1._domainkey selector1-camping-journey-com-mx._domainkey.google.com
```

### 📈 ANALYTICS:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- Search Console -->
<meta name="google-site-verification" content="XXXXXXXXXX" />
```

## ⏱️ TIMELINE ESPERADO:

- **0-2h**: Configuração DNS
- **2-24h**: Propagação DNS
- **24-48h**: SSL automático ativo
- **48-72h**: Email funcionando
- **Imediato**: Site acessível via domínio

## 🚨 TROUBLESHOOTING:

### **Problema: DNS não propaga**
- Limpe cache DNS: `ipconfig /flushdns`
- Use DNS público: 8.8.8.8, 1.1.1.1
- Aguarde até 72h

### **Problema: SSL não ativa**
- Verifique se DNS aponta corretamente
- Aguarde propagação completa
- Contate suporte Vercel se necessário

### **Problema: Email não funciona**
- Verifique registros MX
- Confirme configuração no provedor
- Teste com ferramenta MX Lookup

## 📞 SUPORTE:

- **Vercel**: https://vercel.com/support
- **Seu Provedor DNS**: Consulte documentação específica
- **Google Workspace**: https://support.google.com/a/

---

✅ **Após configuração, seu painel de utilidades mostrará:**
- Status do domínio: ATIVO ✅
- Emails funcionando: ✅
- SSL certificado: ✅
- Performance otimizada: ✅ 