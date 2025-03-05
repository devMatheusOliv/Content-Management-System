import axios from "axios";
import { Content, Category, User } from "../types";

// Configuração base do axios
const api = axios.create({
  baseURL: "https://api.example.com", // Substitua pela URL real da sua API
  timeout: 10000,
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Funções de autenticação
export const authService = {
  login: async (email: string, password: string) => {
    // Em um ambiente real, você faria uma chamada para seu backend
    // Simulando uma chamada de API para fins de demonstração
    return new Promise<{ user: User; token: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "1",
            username: "admin",
            email,
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          token: "fake-jwt-token",
        });
      }, 1000);
    });
  },

  register: async (username: string, email: string, password: string) => {
    // Simulando uma chamada de API
    return new Promise<{ user: User; token: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "2",
            username,
            email,
            role: "editor",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          token: "fake-jwt-token",
        });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

// Funções para gerenciar conteúdo
export const contentService = {
  getContents: async (): Promise<Content[]> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Primeiro Artigo",
            slug: "primeiro-artigo",
            body: "Conteúdo do primeiro artigo...",
            excerpt: "Resumo do primeiro artigo",
            status: "published",
            author: {
              id: "1",
              username: "admin",
              email: "admin@example.com",
              role: "admin",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            categories: [
              {
                id: "1",
                name: "Tecnologia",
                slug: "tecnologia",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            tags: ["react", "frontend"],
            createdAt: new Date(),
            updatedAt: new Date(),
            publishedAt: new Date(),
          },
        ]);
      }, 1000);
    });
  },

  getContentById: async (id: string): Promise<Content> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: "Primeiro Artigo",
          slug: "primeiro-artigo",
          body: "Conteúdo do primeiro artigo...",
          excerpt: "Resumo do primeiro artigo",
          status: "published",
          author: {
            id: "1",
            username: "admin",
            email: "admin@example.com",
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          categories: [
            {
              id: "1",
              name: "Tecnologia",
              slug: "tecnologia",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          tags: ["react", "frontend"],
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: new Date(),
        });
      }, 1000);
    });
  },

  createContent: async (content: Partial<Content>): Promise<Content> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          title: content.title || "",
          slug: content.slug || "",
          body: content.body || "",
          excerpt: content.excerpt,
          status: content.status || "draft",
          author: {
            id: "1",
            username: "admin",
            email: "admin@example.com",
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          categories: content.categories || [],
          tags: content.tags || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }, 1000);
    });
  },

  updateContent: async (
    id: string,
    content: Partial<Content>
  ): Promise<Content> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: content.title || "",
          slug: content.slug || "",
          body: content.body || "",
          excerpt: content.excerpt,
          status: content.status || "draft",
          author: {
            id: "1",
            username: "admin",
            email: "admin@example.com",
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          categories: content.categories || [],
          tags: content.tags || [],
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: content.status === "published" ? new Date() : undefined,
        });
      }, 1000);
    });
  },

  deleteContent: async (id: string): Promise<void> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

// Funções para gerenciar categorias
export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            name: "Tecnologia",
            slug: "tecnologia",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            name: "Design",
            slug: "design",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      }, 1000);
    });
  },

  getCategoryById: async (id: string): Promise<Category> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: "Tecnologia",
          slug: "tecnologia",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }, 1000);
    });
  },

  createCategory: async (category: Partial<Category>): Promise<Category> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name: category.name || "",
          slug: category.slug || "",
          description: category.description,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }, 1000);
    });
  },

  updateCategory: async (
    id: string,
    category: Partial<Category>
  ): Promise<Category> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: category.name || "",
          slug: category.slug || "",
          description: category.description,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }, 1000);
    });
  },

  deleteCategory: async (id: string): Promise<void> => {
    // Simulando uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
};

export default api;
