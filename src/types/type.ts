export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  is_verified: string;
  created_at: Date;
  updated_at: Date;
}
export interface articleType {
  id: number;
  title: string;
  content: string;
  tags: string[];
  user_id: number;
  is_published: boolean;
  created_at: string;
}
