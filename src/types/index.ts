export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  featuredImage?: string;
  status: "draft" | "published" | "archived";
  author: User;
  categories: Category[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory?: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ContentState {
  contents: Content[];
  selectedContent: Content | null;
  isLoading: boolean;
  error: string | null;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}
