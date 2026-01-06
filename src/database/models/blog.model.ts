import { DataTypes, Model, Optional } from 'sequelize';
import { BlogAttributes } from '../../types/blog.interface';
import { getCurrentDate } from '../../utils/date.util';

type BlogCreationAttributes = Optional<
  BlogAttributes,
  'id' | 'postedDate' | 'imageUrl'
>;

class Blog
  extends Model<BlogAttributes, BlogCreationAttributes>
  implements BlogAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
  public description?: string;
  public postedDate?: string;
  public imageUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static getModelAttributes() {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please add a title',
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please add content',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      postedDate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'posted_date',
        defaultValue: () => getCurrentDate(),
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'image_url',
      },
    } as const;
  }
}

export default Blog;
