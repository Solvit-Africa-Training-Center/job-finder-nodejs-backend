import { Sequelize } from 'sequelize';
import { initFAQModel } from './faq.model';
import { initStaticPageModel } from './staticPage.model';
import { SampleUser, SampleUserModel } from './sampleuser';
import Blog from './blog.model';
import Like from './like.model';
import Comment from './comment.model';

interface Models {
  FAQ: ReturnType<typeof initFAQModel>;
  StaticPage: ReturnType<typeof initStaticPageModel>;
  SampleUser: typeof SampleUser;
  Blog: typeof Blog;
  Like: typeof Like;
  Comment: typeof Comment;
}

export const allModel = (sequelize: Sequelize): Models => {
  const FAQ = initFAQModel(sequelize);
  const StaticPage = initStaticPageModel(sequelize);
  const SampleUser = SampleUserModel(sequelize);

  const BlogModel = Blog.init(Blog.getModelAttributes(), {
    sequelize,
    tableName: 'blogs',
    timestamps: true,
    underscored: true,
  });

  const LikeModel = Like.init(Like.getModelAttributes(), {
    sequelize,
    tableName: 'likes',
    timestamps: true,
    underscored: true,
  });

  const CommentModel = Comment.init(Comment.getModelAttributes(), {
    sequelize,
    tableName: 'comments',
    timestamps: true,
    underscored: true,
  });

  // Define associations
  BlogModel.hasMany(CommentModel, {
    foreignKey: 'blog_id',
    as: 'comments',
  });
  CommentModel.belongsTo(BlogModel, {
    foreignKey: 'blog_id',
    as: 'blog',
  });

  BlogModel.hasMany(LikeModel, {
    foreignKey: 'blog_id',
    as: 'likes',
  });
  LikeModel.belongsTo(BlogModel, {
    foreignKey: 'blog_id',
    as: 'blog',
  });

  return {
    FAQ,
    StaticPage,
    SampleUser,
    Blog: BlogModel,
    Like: LikeModel,
    Comment: CommentModel,
  };
};

export default allModel;
