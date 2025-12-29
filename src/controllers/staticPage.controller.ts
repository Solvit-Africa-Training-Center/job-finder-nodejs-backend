import { Request, Response } from 'express';
import { staticPageService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const StaticPageService = new staticPageService();

export class StaticPageController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const includeInactive = req.query.includeInactive === 'true';
    const pages = await StaticPageService.getAllPages(includeInactive);

    return successResponse(res, { data: pages });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const pages = await StaticPageService.getPageById(id);

    if (!pages) {
      throw new AppError('Page not found', 404);
    }

    return successResponse(res, { data: pages });
  });

  getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const page = await StaticPageService.getPageBySlug(slug);

    if (!page) {
      throw new AppError('Page not found', 404);
    }

    return successResponse(res, { data: page });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const {
      slug,
      title,
      content,
      metaTitle,
      metaDescription,
      isActive,
      createdBy,
    } = req.body;
    if (!slug || !title || !content) {
      throw new AppError('Slug, title and content are required', 400);
    }

    const page = await StaticPageService.createPage({
      slug,
      title,
      content,
      metaTitle,
      metaDescription,
      isActive,
      createdBy,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Page created successfully',
      data: page,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      slug,
      title,
      content,
      metaTitle,
      metaDescription,
      isActive,
      updatedBy,
    } = req.body;
    const page = await StaticPageService.updatePage(id, {
      slug,
      title,
      content,
      metaTitle,
      metaDescription,
      isActive,
      updatedBy,
    });

    return successResponse(res, {
      message: 'Page updated successfully',
      data: page,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await StaticPageService.deletePage(id);

    return successResponse(res, { message: result.message });
  });
}
