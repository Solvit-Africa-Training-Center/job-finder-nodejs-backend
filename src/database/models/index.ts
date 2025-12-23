import { Sequelize } from 'sequelize';
import Blog from './blog.model';
import Comment from './comment.model';
import Like from './like.model';

export const allModel = (sequelizeInstance?: Sequelize) => {
 
  Blog.hasMany(Comment, {
    foreignKey: 'blogId',
    as: 'comments',
    onDelete: 'CASCADE',
  });

  Blog.hasMany(Like, {
    foreignKey: 'blogId',
    as: 'likes',
    onDelete: 'CASCADE',
  });

  Comment.belongsTo(Blog, {
    foreignKey: 'blogId',
    as: 'blog',
  });

  Like.belongsTo(Blog, {
    foreignKey: 'blogId',
    as: 'blog',
  });

  return {
    Blog,
    Comment,
    Like
  };
};

export { Blog };
export default allModel;