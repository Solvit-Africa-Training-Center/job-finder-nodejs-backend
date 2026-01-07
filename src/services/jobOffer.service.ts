import { AppError } from '../utils';
import {
  JobOffer,
  JobOfferCreationAttributes,
} from '../database/models/jobOffer.model';
import { JobOfferStatus } from '../database/models/enums';

type CreateJobOfferData = JobOfferCreationAttributes;

export class JobOfferService {
  async createOffer(data: CreateJobOfferData) {
    return await JobOffer.create(data);
  }

  async getOfferById(id: string) {
    return await JobOffer.findByPk(id);
  }

  async getCandidateOffers(candidateProfileId: string) {
    const offers = await JobOffer.findAll({
      where: { candidateProfileId },
      order: [['offerDate', 'DESC']],
      limit: 50,
    });

    return offers;
  }

  async updateOfferStatus(id: string, status: JobOfferStatus) {
    const offer = await JobOffer.findByPk(id);
    if (!offer) {
      throw new AppError('Job offer not found', 404);
    }

    await offer.update({ status });
    return offer;
  }

  async updateOffer(id: string, data: Partial<JobOffer>) {
    const offer = await JobOffer.findByPk(id);
    if (!offer) {
      throw new AppError('Job offer not found', 404);
    }

    await offer.update(data);
    return offer;
  }

  async getOfferHistory(candidateProfileId: string) {
    const offers = await JobOffer.findAll({
      where: { candidateProfileId },
      order: [['offerDate', 'DESC']],
      limit: 100,
    });

    return offers;
  }

  async deleteOffer(id: string) {
    const offer = await JobOffer.findByPk(id);
    if (!offer) {
      throw new AppError('Job offer not found', 404);
    }

    await offer.destroy();
    return { message: 'Job offer deleted successfully' };
  }
}
