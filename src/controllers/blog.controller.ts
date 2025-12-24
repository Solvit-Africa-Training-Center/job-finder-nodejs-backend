import { Response } from 'express';
import { BlogService } from '../services/blog.service';
import { AuthRequest } from '../middlewares/mockAuth.middleware';
import { ApiResponse } from '../utils/response.util';
import {
    createBlogSchema,
    updateBlogSchema,
    commentSchema
} from '../validators/blog.validator';

const blogService = new BlogService();

export class BlogController {

    async getAllBlogs(req: AuthRequest, res: Response) {
        try {
            const blogs = await blogService.getAllBlogs();
            return ApiResponse.success(res, blogs, 'Blogs fetched successfully');
        } catch (error: any) {
            console.error('Error fetching blogs:', error);
            return ApiResponse.error(res, 'Failed to fetch blogs', 500, error.message);
        }
    }
    async getBlogById(req: AuthRequest, res: Response) {
        try {
            const blogId = parseInt(req.params.id);

            if (isNaN(blogId)) {
                return ApiResponse.error(res, 'Invalid blog ID', 400);
            }

            const blog = await blogService.getBlogById(blogId);
            return ApiResponse.success(res, blog, 'Blog fetched successfully');
        } catch (error: any) {
            if (error.message === 'Blog not found') {
                return ApiResponse.notFound(res, error.message);
            }
            console.error('Error fetching blog:', error);
            return ApiResponse.error(res, 'Failed to fetch blog', 500, error.message);
        }
    }

    async createBlog(req: AuthRequest, res: Response) {
        try {

            const validationResult = await createBlogSchema.validateAsync(req.body);


            if (!req.user || !req.user.id) {
                return ApiResponse.unauthorized(res, 'Authentication required');
            }

            const blog = await blogService.createBlog(
                req.user.id,
                validationResult,
                req.file
            );

            return ApiResponse.success(res, blog, 'Blog created successfully', 201);
        } catch (error: any) {
            if (error.isJoi) {
                return ApiResponse.error(
                    res,
                    'Validation error',
                    400,
                    error.details.map((d: any) => d.message)
                );
            }
            if (error.message === 'User not found') {
                return ApiResponse.notFound(res, error.message);
            }
            if (error.message.includes('not authorized')) {
                return ApiResponse.unauthorized(res, error.message);
            }
            console.error('Error creating blog:', error);
            return ApiResponse.error(res, 'Failed to create blog', 500, error.message);
        }
    }


    async updateBlog(req: AuthRequest, res: Response) {
        try {
            const blogId = parseInt(req.params.id);

            if (isNaN(blogId)) {
                return ApiResponse.error(res, 'Invalid blog ID', 400);
            }

            const validationResult = await updateBlogSchema.validateAsync(req.body);

            if (!req.user || !req.user.id) {
                return ApiResponse.unauthorized(res, 'Authentication required');
            }

            const blog = await blogService.updateBlog(
                req.user.id,
                blogId,
                validationResult,
                req.file
            );

            return ApiResponse.success(res, blog, 'Blog updated successfully');
        } catch (error: any) {
            if (error.isJoi) {
                return ApiResponse.error(
                    res,
                    'Validation error',
                    400,
                    error.details.map((d: any) => d.message)
                );
            }
            if (error.message === 'User not found') {
                return ApiResponse.notFound(res, 'User not found');
            }
            if (error.message.includes('not authorized')) {
                return ApiResponse.unauthorized(res, error.message);
            }
            if (error.message === 'Blog not found') {
                return ApiResponse.notFound(res, error.message);
            }
            console.error('Error updating blog:', error);
            return ApiResponse.error(res, 'Failed to update blog', 500, error.message);
        }
    }

    async deleteBlog(req: AuthRequest, res: Response) {
        try {
            const blogId = parseInt(req.params.id);

            if (isNaN(blogId)) {
                return ApiResponse.error(res, 'Invalid blog ID', 400);
            }

            if (!req.user || !req.user.id) {
                return ApiResponse.unauthorized(res, 'Authentication required');
            }

            const result = await blogService.deleteBlog(req.user.id, blogId);

            return ApiResponse.success(res, result, 'Blog deleted successfully');
        } catch (error: any) {
            if (error.message === 'User not found') {
                return ApiResponse.notFound(res, 'User not found');
            }
            if (error.message.includes('not authorized')) {
                return ApiResponse.unauthorized(res, error.message);
            }
            if (error.message === 'Blog not found') {
                return ApiResponse.notFound(res, error.message);
            }
            console.error('Error deleting blog:', error);
            return ApiResponse.error(res, 'Failed to delete blog', 500, error.message);
        }
    }


    async addComment(req: AuthRequest, res: Response) {
        try {
            const blogId = parseInt(req.params.id);

            if (isNaN(blogId)) {
                return ApiResponse.error(res, 'Invalid blog ID', 400);
            }

            const validationResult = await commentSchema.validateAsync(req.body);

            if (!req.user || !req.user.id) {
                return ApiResponse.unauthorized(res, 'Authentication required');
            }

            const comment = await blogService.addComment(
                req.user.id,
                blogId,
                validationResult
            );

            return ApiResponse.success(res, comment, 'Comment added successfully', 201);
        } catch (error: any) {
            if (error.isJoi) {
                return ApiResponse.error(
                    res,
                    'Validation error',
                    400,
                    error.details.map((d: any) => d.message)
                );
            }
            if (error.message === 'User not found') {
                return ApiResponse.notFound(res, 'User not found');
            }
            if (error.message === 'Blog not found') {
                return ApiResponse.notFound(res, error.message);
            }
            console.error('Error adding comment:', error);
            return ApiResponse.error(res, 'Failed to add comment', 500, error.message);
        }
    }

    async toggleLike(req: AuthRequest, res: Response) {
        try {
            const blogId = parseInt(req.params.id);

            if (isNaN(blogId)) {
                return ApiResponse.error(res, 'Invalid blog ID', 400);
            }

            if (!req.user || !req.user.id) {
                return ApiResponse.unauthorized(res, 'Authentication required');
            }

            const result = await blogService.toggleLike(req.user.id, blogId);

            return ApiResponse.success(res, result, result.message);
        } catch (error: any) {
            if (error.message === 'User not found') {
                return ApiResponse.notFound(res, 'User not found');
            }
            if (error.message === 'Blog not found') {
                return ApiResponse.notFound(res, error.message);
            }
            console.error('Error toggling like:', error);
            return ApiResponse.error(res, 'Failed to toggle like', 500, error.message);
        }
    }
}


export default BlogController;