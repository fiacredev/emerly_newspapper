export type UserRole = "admin" | "journalist";

export interface AdminUser {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: "admin" | "journalist";
  avatar: {
    url: string | null;
    publicId: string | null;
  } | null;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt?: string;
}