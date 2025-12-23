import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { LikeAttributes } from '../../types/likes.interface';

class Like extends Model<LikeAttributes> implements LikeAttributes {
    public id!: number;
    public user_id!: number;
    public blogId!: number;
}

Like.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'likes',
        timestamps: false,
    }
);

export default Like;