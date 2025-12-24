import { Blog, Comment, Like } from '../database/models';
import { CreateBlogDTO, UpdateBlogDTO, CommentDTO } from '../types/blog.interface';
import { getCurrentDate } from '../utils/date.util';
import { MockUserService } from '../utils/mockUser.util';
import fs from 'fs';
import path from 'path';

export class BlogService {

    private deleteLocalImage(imageUrl: string): void {
        try {
            if (!imageUrl) return;

            const filePath = path.join(__dirname, '../../', imageUrl);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log('Image deleted:', filePath);
            }
        } catch (error) {
            console.error('Error deleting local image:', error);
        }
    }


    async getAllBlogs() {
        const blogs = await Blog.findAll({
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['id', 'username', 'comment', 'postedDate', 'user_id'],
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'user_id'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        return blogs;
    }


    async getBlogById(blogId: number) {
        const blog = await Blog.findByPk(blogId, {
            include: [
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['id', 'username', 'comment', 'postedDate', 'user_id'],
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['id', 'user_id'],
                },
            ],
        });

        if (!blog) {
            throw new Error('Blog not found');
        }

        return blog;
    }


    async createBlog(userId: number, data: CreateBlogDTO, file?: Express.Multer.File) {

        const user = MockUserService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (!MockUserService.isAdmin(userId)) {
            throw new Error('User not authorized. Only admins can create blogs.');
        }

        let imageUrl = '';
        if (file) {
            imageUrl = `/uploads/blogs/${file.filename}`;
        }

        const blog = await Blog.create({
            title: data.title,
            content: data.content,
            postedDate: getCurrentDate(),
            imageUrl,
        });

        return blog;
    }

    async updateBlog(
        userId: number,
        blogId: number,
        data: UpdateBlogDTO,
        file?: Express.Multer.File
    ) {

        const user = MockUserService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (!MockUserService.isAdmin(userId)) {
            throw new Error('User not authorized. Only admins can update blogs.');
        }

        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }

        if (data.title) blog.title = data.title;
        if (data.content) blog.content = data.content;

        if (file) {
            if (blog.imageUrl) {
                this.deleteLocalImage(blog.imageUrl);
            }
            blog.imageUrl = `/uploads/blogs/${file.filename}`;
        }

        await blog.save();
        return blog;
    }

    async deleteBlog(userId: number, blogId: number) {
        const user = MockUserService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (!MockUserService.isAdmin(userId)) {
            throw new Error('User not authorized. Only admins can delete blogs.');
        }

        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        if (blog.imageUrl) {
            this.deleteLocalImage(blog.imageUrl);
        }

        await Comment.destroy({ where: { blogId } });
        await Like.destroy({ where: { blogId } });

        await blog.destroy();
        return { message: 'Blog deleted successfully' };
    }


    async addComment(userId: number, blogId: number, data: CommentDTO) {
        const user = MockUserService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }

        const comment = await Comment.create({
            user_id: userId,
            username: user.username,
            comment: data.comment,
            postedDate: getCurrentDate(),
            blogId,
        });

        return comment;
    }


    async toggleLike(userId: number, blogId: number) {
        const user = MockUserService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }

        const existingLike = await Like.findOne({
            where: {
                user_id: userId,
                blogId,
            },
        });

        if (existingLike) {

            await existingLike.destroy();
            return { message: 'Blog unliked', liked: false };
        } else {

            await Like.create({
                user_id: userId,
                blogId,
            });
            return { message: 'Blog liked', liked: true };
        }
    }
}