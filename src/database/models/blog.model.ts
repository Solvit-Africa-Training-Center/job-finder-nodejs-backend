import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/database';
import { BlogAttributes } from '../../types/blog.interface';

interface BlogCreationAttributes extends Optional<BlogAttributes, 'id' | 'postedDate' | 'imageUrl'> { }

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
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
      type: DataTypes.INTEGER,
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
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // Now uses the named import
    tableName: 'blogs',
    timestamps: true,
  }
);

export default Blog;