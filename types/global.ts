// Global application types
export interface AppConfig {
  siteName: string;
  siteDescription: string;
  version: string;
  environment: "development" | "staging" | "production";
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
}

export interface FormState {
  isLoading: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
}

export interface ToastMessage {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}
