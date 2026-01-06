import {
  staticPage,
  staticPageCreationAttributes,
} from '../database/models/staticPage.model';
import { InferAttributes } from 'sequelize';
import { AppError } from '../utils';

type createStaticPageData = staticPageCreationAttributes;
type UpdateStaticPageData = Partial<InferAttributes<staticPage>>;

export class staticPageService {
  async getAllPages(includeInactive = false) {
    const WhereClause = includeInactive ? {} : { isActive: true };
    return await staticPage.findAll({
      where: WhereClause,
      order: [['createdAt', 'DESC']],
    });
  }

  async getPageById(id: string) {
    return await staticPage.findByPk(id);
  }

  async getPageBySlug(slug: string) {
    return await staticPage.findOne({
      where: { slug, isActive: true },
    });
  }

  async createPage(data: createStaticPageData) {
    const existingPage = await staticPage.findOne({
      where: { slug: data.slug },
    });
    if (existingPage) {
      throw new AppError('A page with this slug already exists', 409);
    }
    return await staticPage.create(data);
  }

  async updatePage(id: string, data: UpdateStaticPageData) {
    const page = await staticPage.findByPk(id);
    if (!page) {
      throw new AppError('Page not found', 404);
    }
    if (data.slug && data.slug !== page.slug) {
      const existingPage = await staticPage.findOne({
        where: { slug: data.slug },
      });

      if (existingPage) {
        throw new AppError('A page with this slug already exists', 409);
      }
    }

    return await page.update(data);
  }

  async deletePage(id: string) {
    const page = await staticPage.findByPk(id);
    if (!page) {
      throw new AppError('Page not found', 404);
    }
    await page.destroy();
    return { message: 'Page deleted successfully' };
  }
}
