export interface BlogAttributes {
    id: number;
    title: string;
    content: string;
    postedDate?: string;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateBlogDTO {
    title: string;
    content: string;
}

export interface UpdateBlogDTO {
    title?: string;
    content?: string;
}

export interface CommentDTO {
    comment: string;
}

export interface MockUser {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
}