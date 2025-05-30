export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface articleType {
  id: number;
  title: string;
  content: string;
  tags: string[];
  author: string;
  created_at: string;
}
