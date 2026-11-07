export type UserRole = "admin" | "journalist";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: {
    url: string | null;
    publicId: string | null;
  };
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: {
    url: string | null;
    publicId: string | null;
  };
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}