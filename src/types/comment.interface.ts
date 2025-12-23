export interface CommentAttributes {
    id?: number;
    user_id: number;
    username: string;
    comment: string;
    postedDate: string;
    blogId?: number;
}