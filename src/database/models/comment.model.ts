import { DataTypes, Model, ModelAttributes } from 'sequelize';
import type { CommentAttributes } from '../../types/comment.interface';

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: string;
  public user_id!: string;
  public username!: string;
  public comment!: string;
  public postedDate!: string;
  public blogId!: string;

  static getModelAttributes(): ModelAttributes<Comment> {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please add a comment',
          },
        },
      },
      postedDate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'posted_date',
      },
      blog_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'blogs',
          key: 'id',
        },
        field: 'blog_id',
      },
    };
  }
}

export default Comment;
