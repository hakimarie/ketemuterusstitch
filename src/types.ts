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
  dataMode?: "ai_estimate";
  scoreType?: "heuristic_estimate";
  dataSources?: string[];
  placesLookupStatus?: "matched" | "no_match" | "ambiguous_match" | "not_configured" | "configuration_error" | "provider_error";
  publicData?: {
    placeId: string | null;
    name: string;
    address: string | null;
    rating: number | null;
    reviewCount: number | null;
    website: string | null;
    googleMapsUrl: string | null;
    primaryType: string | null;
    businessStatus: string | null;
    coordinates: { latitude: number; longitude: number } | null;
  } | null;
  rankingMeasurement?: { status: "not_measured"; message: string };
  ownerDataStatus?: "not_connected";
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
