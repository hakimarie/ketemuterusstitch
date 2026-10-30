import type { PublicBusinessLookup } from "./lib/publicBusinessLookup";

export interface AuditMetric {
  name: string;
  score: number | null;
  status: 'Sangat Kurang' | 'Perlu Optimalisasi' | 'Optimal' | 'Belum diukur';
  details: string;
}

export interface AuditDiagnosis {
  title: string;
  evidenceStatus: "input_available" | "missing";
  confidence: "low" | "medium";
  severity: "high" | "medium" | "low";
  finding: string;
  recommendation: string;
  validationStep: string;
}

export interface AuditReport {
  businessName: string;
  category: string;
  location: string;
  overallScore: number | null;
  statusGoogleMaps: string;
  statusGoogleSearch: string;
  auditMetrics: AuditMetric[];
  quickWins: string[];
  diagnoses: AuditDiagnosis[];
  strategicAdvice: string;
  dataMode?: "ai_estimate";
  scoreType?: "heuristic_estimate";
  dataSources?: string[];
  publicBusinessLookup?: PublicBusinessLookup;
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
  submittedEvidence?: {
    mapsProfileUrl: string | null;
    observedRating: number | null;
    observedReviewCount: number | null;
    websiteUrl: string | null;
    recentReviews30d: number | null;
    verificationStatus: "user_submitted_unverified";
  };
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
