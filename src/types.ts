export interface AuditMetric {
  name: string;
  score: number;
  status: 'Sangat Kurang' | 'Perlu Optimalisasi' | 'Optimal';
  details: string;
}

export interface AuditReport {
  businessName: string;
  category: string;
  location: string;
  overallScore: number;
  statusGoogleMaps: string;
  statusGoogleSearch: string;
  auditMetrics: AuditMetric[];
  quickWins: string[];
  strategicAdvice: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  bullets: string[];
  colorClass: string;
}

export interface PortfolioItem {
  id: string;
  businessName: string;
  category: string;
  metric: string;
  beforeValue: string;
  afterValue: string;
  description: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  businessName: string;
  image: string;
  stars: number;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
