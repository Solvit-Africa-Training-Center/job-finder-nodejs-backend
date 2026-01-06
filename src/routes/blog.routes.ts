import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { mockAuthMiddleware } from '../middlewares/mockAuth.middleware';
import { upload } from '../middlewares/upload';

const BlogRouter = Router();
const blogController = new BlogController();

BlogRouter.get('/', blogController.getAllBlogs.bind(blogController));
BlogRouter.get('/:id', blogController.getBlogById.bind(blogController));

BlogRouter.post(
  '/',
  mockAuthMiddleware,
  upload.single('image'),
  blogController.createBlog.bind(blogController),
);

BlogRouter.put(
  '/:id',
  mockAuthMiddleware,
  upload.single('image'),
  blogController.updateBlog.bind(blogController),
);

BlogRouter.delete(
  '/:id',
  mockAuthMiddleware,
  blogController.deleteBlog.bind(blogController),
);

BlogRouter.post(
  '/:id/comments',
  mockAuthMiddleware,
  blogController.addComment.bind(blogController),
);

BlogRouter.post(
  '/:id/like',
  mockAuthMiddleware,
  blogController.toggleLike.bind(blogController),
);

export default BlogRouter;
