import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { CommentAttributes } from '../../types/comment.interface';

class Comment extends Model<CommentAttributes> implements CommentAttributes {
    public id!: number;
    public user_id!: number;
    public username!: string;
    public comment!: string;
    public postedDate!: string;
    public blogId!: number;
}

Comment.init(
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
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'comments',
        timestamps: false,
    }
);

export default Comment;