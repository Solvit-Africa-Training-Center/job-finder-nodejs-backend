import { Request, Response } from 'express';
import { FAQService } from '../services';
import { successResponse, asyncHandler, AppError } from '../utils';

const faqService = new FAQService();

export class FAQController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const includeInactive = req.query.includeInactive === 'true';
    const faqs = await faqService.getAllFAQs(includeInactive);

    return successResponse(res, { data: faqs });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const faqs = await faqService.getFAQById(id);
    if (!faqs) {
      throw new AppError('FAQ not found', 404);
    }

    return successResponse(res, { data: faqs });
  });

  getByCategory = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.params;
    const includeInactive = req.query.includeInactive === 'true';
    const faq = await faqService.getFAQByCategory(category, includeInactive);

    return successResponse(res, { data: faq });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const { question, answer, category, displayOrder, isActive, createdBy } =
      req.body;
    if (!question || !answer) {
      throw new AppError('Question and answer are required', 400);
    }

    const faqData: any = {
      question,
      answer,
      category,
      isActive,
      createdBy,
    };

    if (displayOrder !== undefined) {
      faqData.displayOrder = displayOrder;
    }

    const faq = await faqService.createFAQ(faqData);

    return successResponse(res, {
      statusCode: 201,
      message: 'FAQ created successfully',
      data: faq,
    });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { question, answer, category, displayOrder, isActive, updatedBy } =
      req.body;

    const faq = await faqService.updateFAQ(id, {
      question,
      answer,
      category,
      displayOrder,
      isActive,
      updatedBy,
    });

    return successResponse(res, {
      message: 'FAQ updated successfully',
      data: faq,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await faqService.deleteFAQ(id);
    return successResponse(res, {
      message: result.message,
    });
  });

  reorder = asyncHandler(async (req: Request, res: Response) => {
    const { faqOrders } = req.body;

    if (!Array.isArray(faqOrders)) {
      throw new AppError('faqOrders must be an array', 400);
    }

    const result = await faqService.reorderFAQs(faqOrders);

    return successResponse(res, { message: result.message });
  });
}
