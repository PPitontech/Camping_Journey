import nodemailer from 'nodemailer';
import { EmailTemplate } from '../types/email';
import { User } from '../models/User';
import { Product } from '../models/Product';

export class EmailAutomationService {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Template de bienvenida con descuento
  async sendWelcomeEmail(user: User, discountCode: string) {
    const template = this.getWelcomeTemplate(user.name, discountCode);
    
    await this.sendEmail({
      to: user.email,
      subject: '🎉 ¡Bienvenido a Camping Journey México! Regalo especial incluido',
      html: template,
    });

    // Programar follow-up en 3 días
    this.scheduleFollowUp(user, 3);
  }

  // Carrito abandonado - Serie de 3 emails optimizada para México
  async sendAbandonedCartSequence(user: User, cartItems: Product[]) {
    const sequences = [
      { 
        delay: 1, 
        discount: 10, 
        subject: '¿Olvidaste tu equipo de aventura? 🏔️',
        urgency: 'Tu carrito te espera'
      },
      { 
        delay: 3, 
        discount: 15, 
        subject: '¡Las montañas mexicanas te llaman! 15% OFF 🇲🇽',
        urgency: 'Oferta especial por tiempo limitado'
      },
      { 
        delay: 7, 
        discount: 20, 
        subject: 'Última oportunidad: 20% OFF + Envío GRATIS 🔥',
        urgency: 'Solo quedan pocas horas'
      },
    ];

    for (const seq of sequences) {
      setTimeout(async () => {
        const template = this.getAbandonedCartTemplate(
          user.name,
          cartItems,
          seq.discount,
          seq.urgency
        );
        
        await this.sendEmail({
          to: user.email,
          subject: seq.subject,
          html: template,
        });
      }, seq.delay * 24 * 60 * 60 * 1000);
    }
  }

  // Email post-compra con upsell mexicano
  async sendPostPurchaseEmail(user: User, order: any) {
    const recommendedProducts = await this.getRecommendedProducts(order.items);
    const template = this.getPostPurchaseTemplate(
      user.name,
      order,
      recommendedProducts
    );

    // Enviar inmediatamente confirmación
    await this.sendEmail({
      to: user.email,
      subject: `✅ ¡Pedido confirmado! #${order.id} - Camping Journey MX`,
      html: template,
    });

    // Review request después de 7 días
    setTimeout(async () => {
      await this.sendReviewRequest(user, order);
    }, 7 * 24 * 60 * 60 * 1000);

    // Programa de lealtad después de 14 días
    setTimeout(async () => {
      await this.sendLoyaltyInvitation(user);
    }, 14 * 24 * 60 * 60 * 1000);
  }

  // Segmentación inteligente para mercado mexicano
  async sendSegmentedCampaign(segment: string) {
    const users = await this.getUsersBySegment(segment);
    
    const campaigns = {
      'high_value': {
        subject: '🌟 Club VIP Camping Journey: Acceso exclusivo',
        template: 'vip_access_mx',
      },
      'inactive_30_days': {
        subject: 'Te extrañamos aventurero 😢 Regresa con 25% OFF',
        template: 'win_back_mx',
      },
      'frequent_buyer': {
        subject: '🎁 Aventurero VIP: Regalo especial para ti',
        template: 'loyalty_reward_mx',
      },
      'seasonal_camping': {
        subject: '🏕️ Temporada alta: Equipo premium para tus aventuras',
        template: 'seasonal_mx',
      },
      'regional_hidalgo': {
        subject: '🏔️ Aventuras en Hidalgo: Equipo especializado',
        template: 'regional_hidalgo',
      },
    };

    const campaign = campaigns[segment];
    if (!campaign) return;

    for (const user of users) {
      const template = await this.getTemplate(campaign.template, user);
      await this.sendEmail({
        to: user.email,
        subject: campaign.subject,
        html: template,
      });
    }
  }

  // Email de seguimiento post-compra específico para México
  async sendMexicanAdventureGuide(user: User, purchasedItems: Product[]) {
    const adventureSpots = this.getMexicanAdventureSpots(purchasedItems);
    const template = this.getAdventureGuideTemplate(user.name, adventureSpots, purchasedItems);
    
    await this.sendEmail({
      to: user.email,
      subject: '🗺️ Tu guía de aventuras en México está lista',
      html: template,
    });
  }

  // Templates HTML responsivos optimizados para México
  private getWelcomeTemplate(name: string, discountCode: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #228B22 0%, #006400 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            position: relative;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-top: 20px solid #006400;
          }
          .logo {
            width: 120px;
            height: auto;
            margin-bottom: 20px;
          }
          .content {
            padding: 40px 20px;
            line-height: 1.6;
          }
          .discount-box {
            background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
            border: 3px solid #D97706;
            padding: 30px 20px;
            text-align: center;
            margin: 30px 0;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(217, 119, 6, 0.2);
          }
          .discount-code {
            font-size: 32px;
            font-weight: bold;
            color: #D97706;
            background: white;
            padding: 15px 30px;
            border-radius: 10px;
            display: inline-block;
            margin: 10px 0;
            border: 2px dashed #D97706;
            letter-spacing: 2px;
          }
          .cta-button {
            background: linear-gradient(135deg, #D97706 0%, #EA580C 100%);
            color: white;
            padding: 18px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            display: inline-block;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(217, 119, 6, 0.3);
            transition: transform 0.3s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .features {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 30px 0;
          }
          .feature {
            flex: 1;
            min-width: 150px;
            text-align: center;
            padding: 20px;
            background: #f8fafc;
            border-radius: 10px;
          }
          .feature-icon {
            font-size: 48px;
            margin-bottom: 10px;
            display: block;
          }
          .footer {
            background: #1f2937;
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            color: #D97706;
            text-decoration: none;
            margin: 0 15px;
            font-size: 24px;
          }
          @media (max-width: 600px) {
            .features {
              flex-direction: column;
            }
            .discount-code {
              font-size: 24px;
            }
            .content {
              padding: 20px 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🏔️</div>
            <h1>¡Bienvenido a Camping Journey México!</h1>
            <p>Tu aventura comienza aquí, ${name}</p>
          </div>
          
          <div class="content">
            <h2>🎉 ¡Gracias por unirte a nuestra comunidad de aventureros!</h2>
            
            <p>Hola <strong>${name}</strong>,</p>
            
            <p>¡Qué emoción tenerte en la familia Camping Journey! Somos la comunidad #1 de equipos premium para camping y aventuras al aire libre en México.</p>
            
            <div class="discount-box">
              <h3>🎁 ¡Regalo de bienvenida!</h3>
              <p>Usa este código y obtén <strong>20% OFF</strong> en tu primera compra:</p>
              <div class="discount-code">${discountCode}</div>
              <p><small>Válido por 7 días • Envío gratis en compras +$1,500 MXN</small></p>
              <a href="https://camping-journey.com.mx/productos?discount=${discountCode}" class="cta-button">
                🛒 Explorar Productos
              </a>
            </div>
            
            <h3>🌟 ¿Por qué elegir Camping Journey?</h3>
            
            <div class="features">
              <div class="feature">
                <span class="feature-icon">🏔️</span>
                <h4>Equipo Premium</h4>
                <p>Marcas reconocidas mundialmente</p>
              </div>
              <div class="feature">
                <span class="feature-icon">🚚</span>
                <h4>Envío Rápido</h4>
                <p>Entrega en 24-48hrs en CDMX</p>
              </div>
              <div class="feature">
                <span class="feature-icon">🇲🇽</span>
                <h4>Hecho en México</h4>
                <p>Conocemos nuestras montañas</p>
              </div>
            </div>
            
            <h3>🗺️ Destinos recomendados en México:</h3>
            <ul style="list-style: none; padding: 0;">
              <li>🏔️ <strong>Pico de Orizaba</strong> - La montaña más alta de México</li>
              <li>🌵 <strong>Desierto de Wirikuta</strong> - Experiencia única en San Luis Potosí</li>
              <li>🏕️ <strong>Nevado de Toluca</strong> - Camping a 4,000m de altura</li>
              <li>🌊 <strong>Holbox</strong> - Camping en la playa del Caribe</li>
            </ul>
            
            <p>¿Tienes preguntas? Nuestro equipo está aquí para ayudarte:</p>
            <p>📧 <a href="mailto:hola@camping-journey.com.mx">hola@camping-journey.com.mx</a><br>
            📱 WhatsApp: <a href="https://wa.me/525512345678">+52 55 1234-5678</a></p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://camping-journey.com.mx/productos?discount=${discountCode}" class="cta-button">
                🎒 Comenzar mi aventura
              </a>
            </div>
          </div>
          
          <div class="footer">
            <h3>¡Síguenos en redes sociales!</h3>
            <div class="social-links">
              <a href="https://instagram.com/campingjourneymx">📷 Instagram</a>
              <a href="https://facebook.com/campingjourneymx">📘 Facebook</a>
              <a href="https://tiktok.com/@campingjourneymx">🎵 TikTok</a>
            </div>
            <p>Camping Journey México<br>
            Tu compañero de aventuras desde 2024</p>
            <p><small>¿No quieres recibir estos emails? <a href="#" style="color: #D97706;">Cancelar suscripción</a></small></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getAbandonedCartTemplate(name: string, items: Product[], discount: number, urgency: string): string {
    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 15px; border-bottom: 1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
        </td>
        <td style="padding: 15px; border-bottom: 1px solid #eee;">
          <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
          <p style="color: #666; margin: 0;">$${item.price.toLocaleString('es-MX')} MXN</p>
        </td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: #f8fafc;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
          }
          .header {
            background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .urgency-banner {
            background: #FEE2E2;
            color: #DC2626;
            padding: 15px 20px;
            text-align: center;
            font-weight: bold;
            border-left: 4px solid #DC2626;
          }
          .content {
            padding: 30px 20px;
          }
          .cart-items {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .discount-highlight {
            background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
            border: 2px solid #3B82F6;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
            border-radius: 12px;
          }
          .cta-button {
            background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
            color: white;
            padding: 18px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            display: inline-block;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="urgency-banner">
            ⏰ ${urgency}
          </div>
          
          <div class="header">
            <h1>🛒 ${name}, tu aventura te está esperando</h1>
          </div>
          
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <p>Notamos que dejaste algunos productos increíbles en tu carrito. ¡No dejes que tu próxima aventura espere más!</p>
            
            <h3>🎒 Productos en tu carrito:</h3>
            <table class="cart-items">
              ${itemsHtml}
            </table>
            
            <div class="discount-highlight">
              <h3>🎉 ¡Oferta especial solo para ti!</h3>
              <p>Completa tu compra ahora y obtén <strong>${discount}% OFF</strong></p>
              <p>+ <strong>Envío GRATIS</strong> en compras mayores a $1,500 MXN</p>
              
              <a href="https://camping-journey.com.mx/carrito?discount=${discount}" class="cta-button">
                Completar mi compra con ${discount}% OFF
              </a>
            </div>
            
            <h3>🏔️ ¿Sabías que...?</h3>
            <p>México tiene más de 200 áreas naturales protegidas perfectas para camping. Con el equipo adecuado, cada aventura se convierte en una experiencia inolvidable.</p>
            
            <p>¿Necesitas ayuda para decidir? Nuestro equipo de expertos está aquí:</p>
            <p>📱 WhatsApp: <a href="https://wa.me/525512345678">+52 55 1234-5678</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private async getRecommendedProducts(orderItems: Product[]): Promise<Product[]> {
    // Lógica de recomendación basada en los productos comprados
    // Por ahora retorna productos mock, implementar lógica real
    return [
      { id: 1, name: 'Linterna LED Recargable', price: 450, image: '/images/products/linterna.jpg' },
      { id: 2, name: 'Botella Térmica 1L', price: 320, image: '/images/products/botella.jpg' },
    ] as Product[];
  }

  private getMexicanAdventureSpots(items: Product[]): any[] {
    // Retorna spots de aventura basados en los productos comprados
    return [
      {
        name: 'Nevado de Toluca',
        state: 'Estado de México',
        difficulty: 'Intermedio',
        bestSeason: 'Oct - Mar',
        description: 'Perfecto para camping de altura con vistas espectaculares'
      },
      {
        name: 'Pico de Orizaba',
        state: 'Veracruz/Puebla',
        difficulty: 'Avanzado',
        bestSeason: 'Nov - Feb',
        description: 'La montaña más alta de México, ideal para montañistas experimentados'
      }
    ];
  }

  private async sendEmail(options: { to: string; subject: string; html: string }) {
    try {
      await this.transporter.sendMail({
        from: `"Camping Journey México" <${process.env.EMAIL_USER}>`,
        ...options,
      });
      console.log(`✅ Email sent to ${options.to}: ${options.subject}`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${options.to}:`, error);
    }
  }

  private scheduleFollowUp(user: User, days: number) {
    // Implementar sistema de scheduling (Redis, Bull Queue, etc.)
    console.log(`📅 Follow-up scheduled for ${user.email} in ${days} days`);
  }

  private async getUsersBySegment(segment: string): Promise<User[]> {
    // Implementar query de segmentación
    return [] as User[];
  }

  private async getTemplate(templateName: string, user: User): Promise<string> {
    // Implementar sistema de templates
    return `Template ${templateName} for ${user.name}`;
  }

  private getPostPurchaseTemplate(name: string, order: any, recommended: Product[]): string {
    return `Post-purchase template for ${name}`;
  }

  private getAdventureGuideTemplate(name: string, spots: any[], items: Product[]): string {
    return `Adventure guide template for ${name}`;
  }

  private async sendReviewRequest(user: User, order: any) {
    // Implementar solicitud de review
    console.log(`📝 Review request sent to ${user.email} for order ${order.id}`);
  }

  private async sendLoyaltyInvitation(user: User) {
    // Implementar invitación al programa de lealtad
    console.log(`🌟 Loyalty invitation sent to ${user.email}`);
  }
} 