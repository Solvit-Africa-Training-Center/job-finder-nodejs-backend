export interface JobCategoryTree {
  id: string;
  name: string;
  slug: string;
  children: JobCategoryTree[];
}
