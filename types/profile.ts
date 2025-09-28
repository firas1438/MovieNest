export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  provider: string;
  email_verified: boolean;
};