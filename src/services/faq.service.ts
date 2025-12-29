import { AppError } from '../utils';
import { FAQ, FAQCreationAttributes } from '../database/models/faq.model';
import { InferAttributes } from 'sequelize';

type createFAQData = FAQCreationAttributes;
type UpdateFAQData = Partial<InferAttributes<FAQ>>;

export class FAQService {
  async getAllFAQs(includeInactive = false) {
    const WhereClause = includeInactive ? {} : { isActive: true };
    return await FAQ.findAll({
      where: WhereClause,
      order: [
        ['displayOrder', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
  }

  async getFAQById(id: string) {
    return await FAQ.findByPk(id);
  }

  async getFAQByCategory(category: string, includeInactive = false) {
    const WhereClause: Record<string, unknown> = { category };
    if (!includeInactive) {
      WhereClause.isActive = true;
    }
    return await FAQ.findAll({
      where: WhereClause,
      order: [['displayOrder', 'ASC']],
    });
  }

  async createFAQ(data: createFAQData) {
    if (data.displayOrder === undefined || data.displayOrder === 0) {
      const maxOrderFAQ = await FAQ.findOne({
        order: [['displayOrder', 'DESC']],
        attributes: ['displayOrder'],
      });
      data.displayOrder = maxOrderFAQ ? maxOrderFAQ.displayOrder + 1 : 1;
    }
    return await FAQ.create(data);
  }

  async updateFAQ(id: string, data: UpdateFAQData) {
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }
    return await faq.update(data);
  }

  async deleteFAQ(id: string) {
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }
    await faq.destroy();
    return { message: 'FAQ deleted successfully' };
  }

  async reorderFAQs(faqOrders: { id: string; displayOrder: number }[]) {
    const updatePromises = faqOrders.map(({ id, displayOrder }) => {
      FAQ.update({ displayOrder }, { where: { id } });
    });
    await Promise.all(updatePromises);
    return { message: 'FAQs reordered successfully' };
  }
}
