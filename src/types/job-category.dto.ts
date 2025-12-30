export interface CreateJobCategoryDto {
  name: string;
  parentId?: string | null;
}

export interface UpdateJobCategoryDto {
  name?: string;
  parentId?: string | null;
  isActive?: boolean;
}
