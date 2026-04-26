// src/types/auth.ts

export type StaffRole = "admin" | "editor";

export interface StaffUser {
  email: string;
  name?: string | null;
  image?: string | null;
  role: StaffRole;
}

export interface SessionUser {
  email: string;
  name?: string | null;
  image?: string | null;
  role: StaffRole;
}
