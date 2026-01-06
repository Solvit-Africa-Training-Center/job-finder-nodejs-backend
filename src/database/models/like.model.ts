import { DataTypes, Model, ModelAttributes } from 'sequelize';
import { LikesAttributes } from '../../types/likes.interface';

class Like extends Model<LikesAttributes> implements LikesAttributes {
  public id!: string;
  public user_id!: string;
  public blogId!: string;

  static getModelAttributes(): ModelAttributes<Like> {
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

export default Like;
