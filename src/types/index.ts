// Core types for TrailLix platform

export interface User {
  id: string;
  external_auth_id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price_cents: number;
  currency: 'VND';
  visibility: 'public' | 'private' | 'draft';
  author_id: string;
  author?: User;
  media_policy: string;
  thumbnail_url?: string;
  duration_total?: number;
  lessons_count?: number;
  enrolled_count?: number;
  rating?: number;
  created_at: string;
  updated_at: string;
}

// Trail lesson types (different from course lessons)
export interface PromptComponent {
  labelKey: string;
  text: string;
}

export interface LessonContent {
  title: string;
  category: string;
  what: string; // Explanation of the technique
  why: string; // Why it's necessary
  formula: string; // How to apply it
  comparison: { // Comparison between normal and applied prompt
    before: string;
    after: string;
  };
  simpleExample?: { // Simple example for practice
    context: string;
    fullPrompt: string;
    components: PromptComponent[];
  };
}

export interface Lesson {
  id: number;
  level?: number;
  content: {
    en: LessonContent;
    vi: LessonContent;
  };
}

// Course lesson types (for API-based lessons)
export interface CourseLessonType {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  duration_s: number;
  video_asset_id?: string;
  video_url?: string;
  is_free_preview: boolean;
  description?: string;
  completed?: boolean;
  progress?: LessonProgress;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  source: 'purchase' | 'gift' | 'subscription';
  status: 'active' | 'suspended' | 'cancelled';
  created_at: string;
  course?: Course;
}

export interface Order {
  id: string;
  user_id: string;
  amount_cents: number;
  currency: 'VND';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  provider: 'qr_payment' | 'bank_transfer';
  ext_session_id?: string;
  ext_payment_intent_id?: string;
  qr_code?: string;
  transfer_content?: string;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  course_id: string;
  unit_price_cents: number;
  qty: number;
  course?: Course;
}

export interface PaymentLedger {
  id: string;
  order_id: string;
  type: 'debit' | 'credit';
  account: string;
  amount_cents: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_sub_id?: string;
  status: 'active' | 'cancelled' | 'past_due';
  current_period_end: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  last_watched_s: number;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_user_id: string;
  action: string;
  entity: string;
  entity_id: string;
  diff_json?: object;
  ip?: string;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth Types
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Navigation Types
export type RootStackParamList = {
  '(tabs)': undefined;
  'auth/login': undefined;
  'auth/register': undefined;
  'course/[id]': { id: string };
  'lesson/[id]': { id: string; courseId: string };
  'profile/edit': undefined;
  'payment/checkout': { courseId: string };
  'payment/success': { orderId: string };
};

export type TabParamList = {
  home: undefined;
  courses: undefined;
  library: undefined;
  profile: undefined;
};

// Store State Types
export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export interface AppState {
  theme: 'light' | 'dark' | 'system';
  language: 'vi' | 'en';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'vi' | 'en') => void;
}
