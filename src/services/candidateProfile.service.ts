import { AppError } from '../utils';
import {
  CandidateProfile,
  CandidateProfileCreationAttributes,
} from '../database/models/candidateProfile.model';
import { InferAttributes } from 'sequelize';
import { Education } from '../database/models/education.model';
import { Experience } from '../database/models/experience.model';
import { CandidateSkill } from '../database/models/candidateSkill.model';
import { Skill } from '../database/models/skill.model';

type CreateCandidateProfileData = CandidateProfileCreationAttributes;
type UpdateCandidateProfileData = Partial<InferAttributes<CandidateProfile>>;

export class CandidateProfileService {
  async createProfile(data: CreateCandidateProfileData) {
    const existingProfile = await CandidateProfile.findOne({
      where: { userId: data.userId },
    });

    if (existingProfile) {
      throw new AppError('Candidate profile already exists for this user', 400);
    }

    const profile = await CandidateProfile.create(data);
    await this.calculateAndUpdateCompletion(profile.id);
    return await this.getProfileById(profile.id);
  }

  async getProfileById(id: string) {
    const profile = await CandidateProfile.findByPk(id, {
      include: [
        {
          model: Education,
          as: 'education',
        },
        {
          model: Experience,
          as: 'experience',
        },
        {
          model: CandidateSkill,
          as: 'candidateSkills',
          include: [
            {
              model: Skill,
              as: 'skill',
            },
          ],
        },
      ],
    });

    return profile;
  }

  async getProfileByUserId(userId: string) {
    const profile = await CandidateProfile.findOne({
      where: { userId },
      include: [
        {
          model: Education,
          as: 'education',
        },
        {
          model: Experience,
          as: 'experience',
        },
        {
          model: CandidateSkill,
          as: 'candidateSkills',
          include: [
            {
              model: Skill,
              as: 'skill',
            },
          ],
        },
      ],
    });

    return profile;
  }

  async updateProfile(id: string, data: UpdateCandidateProfileData) {
    const profile = await CandidateProfile.findByPk(id);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    await profile.update(data);
    await this.calculateAndUpdateCompletion(id);
    return await this.getProfileById(id);
  }

  async deleteProfile(id: string) {
    const profile = await CandidateProfile.findByPk(id);
    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    await profile.destroy();
    return { message: 'Candidate profile deleted successfully' };
  }

  async getAllProfiles(filters: {
    city?: string;
    country?: string;
    availability?: string;
    limit?: number;
    offset?: number;
  }) {
    const whereClause: Record<string, unknown> = {};

    if (filters.city) whereClause.city = filters.city;
    if (filters.country) whereClause.country = filters.country;
    if (filters.availability) whereClause.availability = filters.availability;

    const limit = Math.min(filters.limit || 5, 100);
    const offset = filters.offset || 0;

    const { rows: profiles, count } = await CandidateProfile.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      include: [
        {
          model: CandidateSkill,
          as: 'candidateSkills',
          include: [
            {
              model: Skill,
              as: 'skill',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return {
      profiles,
      pagination: {
        total: count,
        limit,
        offset,
        totalPages: Math.ceil(count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        hasNextPage: offset + limit < count,
        hasPreviousPage: offset > 0,
      },
    };
  }

  async calculateAndUpdateCompletion(profileId: string) {
    const profile = await CandidateProfile.findByPk(profileId, {
      include: [
        { model: Education, as: 'education' },
        { model: Experience, as: 'experience' },
        { model: CandidateSkill, as: 'candidateSkills' },
      ],
    });

    if (!profile) {
      throw new AppError('Candidate profile not found', 404);
    }

    const profileData = profile.get({
      plain: true,
    }) as InferAttributes<CandidateProfile> & {
      education?: Education[];
      experience?: Experience[];
      candidateSkills?: CandidateSkill[];
    };

    let completionScore = 0;
    const fields = [
      'phoneNumber',
      'dateOfBirth',
      'city',
      'country',
      'bio',
      'availability',
    ];

    fields.forEach((field) => {
      if (profile[field as keyof CandidateProfile]) {
        completionScore += 8;
      }
    });

    if (profileData.education && profileData.education.length > 0) {
      completionScore += 15;
    }
    if (profileData.experience && profileData.experience.length > 0) {
      completionScore += 15;
    }
    if (profileData.candidateSkills && profileData.candidateSkills.length > 0) {
      completionScore += 22;
    }

    const isComplete = completionScore >= 80;

    await profile.update({
      profileCompletionPercentage: Math.min(completionScore, 100),
      isProfileComplete: isComplete,
    });

    return {
      percentage: Math.min(completionScore, 100),
      isComplete,
    };
  }
}
