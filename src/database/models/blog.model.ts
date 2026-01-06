import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';
import { BlogAttributes } from '../../types/blog.interface';
import { getCurrentDate } from '../../utils/date.util';

// Use Optional directly in the Model generic
class Blog extends Model<BlogAttributes, Optional<BlogAttributes, 'id' | 'postedDate' | 'imageUrl'>> implements BlogAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public postedDate?: string;
  public imageUrl?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
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
  },
  {
    sequelize,
    tableName: 'blogs',
    timestamps: true,
    underscored: true,
  }
);

export default Blog;