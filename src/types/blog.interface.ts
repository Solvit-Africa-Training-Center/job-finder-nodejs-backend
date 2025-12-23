export interface BlogAttributes {
    id: number;
    title: string;
    content: string;
    postedDate?: string;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}