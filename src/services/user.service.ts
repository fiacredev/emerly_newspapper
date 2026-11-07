import { apiRequest } from "@/lib/api";

export interface Journalist {
  _id: string;
  name: string;
  email: string;
  avatar?: {
    url: string | null;
    publicId: string | null;
  };
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

interface JournalistResponse {
  success: boolean;
  data: Journalist[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const userService = {
  getJournalists: (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {}) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        query.set(key, String(value));
      }
    });

    return apiRequest<JournalistResponse>(
      `/users/journalists?${query.toString()}`,
      { auth: true }
    );
  },

  createJournalist: (data: {
    name: string;
    email: string;
    password: string;
  }) =>
    apiRequest("/auth/journalists", {
      method: "POST",
      auth: true,
      body: JSON.stringify(data),
    }),

  updateJournalist: (
    id: string,
    data: { name?: string; email?: string }
  ) =>
    apiRequest(`/users/journalists/${id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(data),
    }),

  toggleStatus: (id: string) =>
    apiRequest(`/users/journalists/${id}/status`, {
      method: "PATCH",
      auth: true,
    }),

  deleteJournalist: (id: string) =>
    apiRequest(`/users/journalists/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};