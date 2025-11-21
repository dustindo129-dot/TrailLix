// Constants for TrailLix app

export const Colors = {
  light: {
    primary: '#0ea5e9',
    primaryDark: '#0284c7',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  dark: {
    primary: '#38bdf8',
    primaryDark: '#0ea5e9',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

export const FontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const Layout = {
  headerHeight: 56,
  tabBarHeight: 64,
  maxContentWidth: 1200,
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    LESSONS: '/courses/:id/lessons',
    ENROLL: '/courses/:id/enroll',
    PROGRESS: '/courses/:id/progress',
    FEATURED: '/courses/featured',
    POPULAR: '/courses/popular',
  },
  LESSONS: {
    DETAIL: '/lessons/:id',
    PROGRESS: '/lessons/:id/progress',
  },
  ENROLLMENTS: '/enrollments',
  ORDERS: '/orders',
  PAYMENTS: '/payments',
};

export const STORAGE_KEYS = {
  AUTH_TOKENS: 'auth-tokens',
  USER_PREFERENCES: 'user-preferences',
  COURSE_PROGRESS: 'course-progress',
  OFFLINE_DATA: 'offline-data',
};

export const COURSE_CATEGORIES = [
  { id: 'ai-fundamentals', name: 'AI Cơ Bản', icon: '🤖' },
  { id: 'machine-learning', name: 'Machine Learning', icon: '🧠' },
  { id: 'deep-learning', name: 'Deep Learning', icon: '🔥' },
  { id: 'nlp', name: 'Xử Lý Ngôn Ngữ Tự Nhiên', icon: '💬' },
  { id: 'computer-vision', name: 'Thị Giác Máy Tính', icon: '👁️' },
  { id: 'data-science', name: 'Khoa Học Dữ Liệu', icon: '📊' },
  { id: 'python', name: 'Lập Trình Python', icon: '🐍' },
  { id: 'tensorflow', name: 'TensorFlow', icon: '🔶' },
  { id: 'pytorch', name: 'PyTorch', icon: '🔥' },
];

export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor', 
  ADMIN: 'admin',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  CANCELLED: 'cancelled',
};

export const ENROLLMENT_SOURCE = {
  PURCHASE: 'purchase',
  GIFT: 'gift',
  SUBSCRIPTION: 'subscription',
};

export const QUERY_KEYS = {
  COURSES: ['courses'],
  COURSE_DETAIL: ['course'],
  COURSE_LESSONS: ['course-lessons'],
  LESSON_DETAIL: ['lesson'],
  ENROLLMENTS: ['enrollments'],
  USER_PROFILE: ['user-profile'],
  COURSE_PROGRESS: ['course-progress'],
  FEATURED_COURSES: ['featured-courses'],
  POPULAR_COURSES: ['popular-courses'],
};

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE: /^(\+84|84|0)[3|5|7|8|9]\d{8}$/,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng thử lại.',
  UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  FORBIDDEN: 'Bạn không có quyền truy cập tính năng này.',
  NOT_FOUND: 'Không tìm thấy dữ liệu yêu cầu.',
  SERVER_ERROR: 'Lỗi máy chủ. Vui lòng thử lại sau.',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Đăng nhập thành công!',
  REGISTER: 'Đăng ký tài khoản thành công!',
  LOGOUT: 'Đăng xuất thành công!',
  PROFILE_UPDATED: 'Cập nhật hồ sơ thành công!',
  PASSWORD_CHANGED: 'Đổi mật khẩu thành công!',
  ENROLLMENT_SUCCESS: 'Đăng ký khóa học thành công!',
  PAYMENT_SUCCESS: 'Thanh toán thành công!',
};
