import { Product } from '../models/Product';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  variables: string[];
  category: 'welcome' | 'abandoned_cart' | 'post_purchase' | 'promotional' | 'transactional';
  language: 'es' | 'en' | 'pt';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  template: EmailTemplate;
  segment: UserSegment;
  scheduledAt?: Date;
  sentAt?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
  metrics: CampaignMetrics;
}

export interface CampaignMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria[];
  userCount: number;
  lastUpdated: Date;
}

export interface SegmentCriteria {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'not_in';
  value: any;
  type: 'user' | 'order' | 'product' | 'behavior';
}

export interface EmailAutomation {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  active: boolean;
  createdAt: Date;
}

export interface AutomationTrigger {
  type: 'user_signup' | 'cart_abandoned' | 'purchase_completed' | 'product_viewed' | 'email_opened' | 'link_clicked';
  conditions?: TriggerCondition[];
  delay?: number; // minutes
}

export interface TriggerCondition {
  field: string;
  operator: string;
  value: any;
}

export interface AutomationAction {
  type: 'send_email' | 'add_tag' | 'remove_tag' | 'update_field' | 'wait';
  delay?: number; // minutes
  template?: EmailTemplate;
  data?: any;
}

export interface EmailLog {
  id: string;
  userId: string;
  email: string;
  subject: string;
  template: string;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  sentAt: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  bouncedAt?: Date;
  errorMessage?: string;
  campaignId?: string;
  automationId?: string;
}

export interface EmailPreferences {
  userId: string;
  email: string;
  subscribed: boolean;
  categories: {
    promotional: boolean;
    transactional: boolean;
    newsletter: boolean;
    abandoned_cart: boolean;
    product_updates: boolean;
  };
  frequency: 'daily' | 'weekly' | 'monthly';
  language: 'es' | 'en' | 'pt';
  timezone: string;
  updatedAt: Date;
}

export interface MexicanAdventureSpot {
  id: string;
  name: string;
  state: string;
  region: 'norte' | 'centro' | 'sur' | 'costa_pacifico' | 'costa_caribe' | 'peninsula_yucatan';
  coordinates: {
    lat: number;
    lng: number;
  };
  difficulty: 'principiante' | 'intermedio' | 'avanzado' | 'experto';
  activities: ('camping' | 'hiking' | 'climbing' | 'kayaking' | 'cycling')[];
  bestSeasons: string[];
  description: string;
  equipment_needed: string[];
  permits_required: boolean;
  accessibility: 'facil' | 'moderado' | 'dificil';
  featured_image: string;
  gallery: string[];
}

export interface ProductRecommendation {
  product: Product;
  reason: 'frequently_bought_together' | 'similar_products' | 'seasonal' | 'complementary';
  confidence: number;
  discount?: number;
}

export interface EmailPersonalization {
  userId: string;
  preferences: {
    adventure_types: string[];
    experience_level: 'beginner' | 'intermediate' | 'advanced';
    preferred_regions: string[];
    budget_range: 'low' | 'medium' | 'high';
    seasonal_preferences: string[];
  };
  behavioral_data: {
    last_purchase_date?: Date;
    total_orders: number;
    total_spent: number;
    favorite_categories: string[];
    abandoned_carts: number;
    email_engagement_score: number;
  };
}

export interface EmailAnalytics {
  period: {
    start: Date;
    end: Date;
  };
  overview: {
    total_sent: number;
    total_delivered: number;
    total_opened: number;
    total_clicked: number;
    total_bounced: number;
    total_unsubscribed: number;
  };
  rates: {
    delivery_rate: number;
    open_rate: number;
    click_rate: number;
    bounce_rate: number;
    unsubscribe_rate: number;
  };
  revenue: {
    total_revenue: number;
    revenue_per_email: number;
    conversion_rate: number;
  };
  top_performing: {
    campaigns: EmailCampaign[];
    templates: EmailTemplate[];
    segments: UserSegment[];
  };
}

// Tipos específicos para el mercado mexicano
export interface MexicanMarketData {
  regions: {
    norte: string[];
    centro: string[];
    sur: string[];
    costa_pacifico: string[];
    costa_caribe: string[];
    peninsula_yucatan: string[];
  };
  seasonal_trends: {
    alta_temporada: string[]; // Dec-Jan, Jul-Aug
    media_temporada: string[]; // Mar-May, Sep-Nov
    baja_temporada: string[]; // Jun, Feb
  };
  popular_activities: {
    camping: string[];
    hiking: string[];
    climbing: string[];
    water_sports: string[];
  };
  cultural_events: {
    name: string;
    date: string;
    region: string;
    camping_opportunity: boolean;
  }[];
}

export interface MexicanPaymentMethods {
  oxxo: {
    enabled: boolean;
    fee: number;
    processing_time: string;
  };
  spei: {
    enabled: boolean;
    fee: number;
    processing_time: string;
  };
  mercado_pago: {
    enabled: boolean;
    fee: number;
    installments: number[];
  };
  stripe: {
    enabled: boolean;
    fee: number;
    currencies: string[];
  };
} 