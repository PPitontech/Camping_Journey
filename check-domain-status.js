#!/usr/bin/env node

/**
 * 🌐 DOMAIN STATUS CHECKER - CAMPING JOURNEY
 * Verifica o status de configuração do domínio
 */

const https = require('https');
const dns = require('dns').promises;

const DOMAIN = 'camping-journey.com.mx';
const EXPECTED_IP = '76.76.19.61';

console.log('🌐 VERIFICANDO STATUS DO DOMÍNIO: camping-journey.com.mx\n');

async function checkDNS() {
  console.log('📋 1. VERIFICANDO DNS...');
  
  try {
    // Verificar registro A
    const addresses = await dns.resolve4(DOMAIN);
    console.log(`   ✅ Registro A: ${addresses.join(', ')}`);
    
    if (addresses.includes(EXPECTED_IP)) {
      console.log('   ✅ IP correto configurado!');
    } else {
      console.log(`   ❌ IP incorreto. Esperado: ${EXPECTED_IP}`);
    }
    
    // Verificar CNAME para www
    try {
      const cname = await dns.resolveCname(`www.${DOMAIN}`);
      console.log(`   ✅ CNAME www: ${cname.join(', ')}`);
    } catch (error) {
      console.log('   ⚠️  CNAME www não configurado');
    }
    
    // Verificar MX records
    try {
      const mx = await dns.resolveMx(DOMAIN);
      console.log(`   ✅ Registros MX: ${mx.length} encontrados`);
      mx.forEach(record => {
        console.log(`      - ${record.exchange} (prioridade: ${record.priority})`);
      });
    } catch (error) {
      console.log('   ⚠️  Registros MX não configurados');
    }
    
  } catch (error) {
    console.log(`   ❌ Erro DNS: ${error.message}`);
  }
}

async function checkHTTPS() {
  console.log('\n📋 2. VERIFICANDO HTTPS...');
  
  return new Promise((resolve) => {
    const options = {
      hostname: DOMAIN,
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`   ✅ Status HTTPS: ${res.statusCode}`);
      console.log(`   ✅ SSL Certificate: Ativo`);
      
      // Verificar headers de segurança
      const securityHeaders = [
        'strict-transport-security',
        'x-frame-options',
        'x-content-type-options'
      ];
      
      securityHeaders.forEach(header => {
        if (res.headers[header]) {
          console.log(`   ✅ ${header}: ${res.headers[header]}`);
        }
      });
      
      resolve();
    });

    req.on('error', (error) => {
      console.log(`   ❌ Erro HTTPS: ${error.message}`);
      resolve();
    });

    req.on('timeout', () => {
      console.log('   ❌ Timeout na conexão HTTPS');
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function checkVercelStatus() {
  console.log('\n📋 3. VERIFICANDO STATUS VERCEL...');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'camping-journey-4vfq.vercel.app',
      port: 443,
      path: '/',
      method: 'HEAD'
    };

    const req = https.request(options, (res) => {
      console.log(`   ✅ Vercel Status: ${res.statusCode}`);
      console.log('   ✅ Deploy ativo na Vercel');
      
      // Verificar se é redirect ou resposta direta
      if (res.statusCode >= 300 && res.statusCode < 400) {
        console.log(`   🔄 Redirect para: ${res.headers.location}`);
      }
      
      resolve();
    });

    req.on('error', (error) => {
      console.log(`   ❌ Erro Vercel: ${error.message}`);
      resolve();
    });

    req.end();
  });
}

function showNextSteps() {
  console.log('\n📋 4. PRÓXIMOS PASSOS:');
  console.log('');
  console.log('🔧 SE DNS NÃO ESTÁ CONFIGURADO:');
  console.log('   1. Acesse seu provedor de hospedagem');
  console.log('   2. Vá em "DNS Management" ou "Zone Editor"');
  console.log('   3. Adicione os registros:');
  console.log('      A     @     76.76.19.61');
  console.log('      A     www   76.76.19.61');
  console.log('      CNAME *     cname.vercel-dns.com');
  console.log('');
  console.log('🔧 SE DNS ESTÁ OK MAS SITE NÃO ABRE:');
  console.log('   1. Aguarde propagação (até 48h)');
  console.log('   2. Limpe cache DNS: ipconfig /flushdns');
  console.log('   3. Use DNS público: 8.8.8.8');
  console.log('');
  console.log('🔧 CONFIGURAR NO VERCEL:');
  console.log('   1. https://vercel.com/veo-paulos-projects/camping-journey-4vfq/settings/domains');
  console.log('   2. Add Domain: camping-journey.com.mx');
  console.log('   3. Add Domain: www.camping-journey.com.mx');
  console.log('');
  console.log('📧 CONFIGURAR EMAILS:');
  console.log('   1. Google Workspace: https://workspace.google.com/');
  console.log('   2. Zoho Mail: https://www.zoho.com/mail/');
  console.log('   3. Adicionar registros MX no DNS');
  console.log('');
  console.log('🔍 FERRAMENTAS DE VERIFICAÇÃO:');
  console.log('   • https://dnschecker.org/');
  console.log('   • https://whatsmydns.net/');
  console.log('   • https://www.ssllabs.com/ssltest/');
}

async function main() {
  try {
    await checkDNS();
    await checkHTTPS();
    await checkVercelStatus();
    showNextSteps();
    
    console.log('\n✅ VERIFICAÇÃO CONCLUÍDA!');
    console.log('📞 Precisa de ajuda? Consulte o guia: domain-setup-guide.md');
    
  } catch (error) {
    console.error('❌ Erro na verificação:', error.message);
  }
}

// Executar verificação
main(); 