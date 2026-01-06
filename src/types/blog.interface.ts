export interface BlogAttributes {
  id: string;
  title: string;
  content: string;
  description?: string;
  postedDate?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateBlogDTO {
  title: string;
  content: string;
  description?: string;
}

export interface UpdateBlogDTO {
  title?: string;
  content?: string;
  description?: string;
}

export interface CommentDTO {
  comment: string;
}

export interface MockUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}
