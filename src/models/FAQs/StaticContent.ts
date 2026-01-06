import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { UUID } from 'node:crypto';

interface StaticPageAttributes {
  id: UUID;
  title: string;
  slug: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StaticPageCreationAttributes 
  extends Optional<StaticPageAttributes, 'id' | 'metaTitle' | 'metaDescription' | 'metaKeywords' | 'isActive' | 'deletedAt'> {}

class StaticPage extends Model<StaticPageAttributes, StaticPageCreationAttributes>
  implements StaticPageAttributes {
  public id!: UUID;
  public title!: string;
  public slug!: string;
  public content!: string;
  public metaTitle!: string | null;
  public metaDescription!: string | null;
  public metaKeywords!: string | null;
  public isActive!: boolean;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StaticPage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metaTitle: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metaKeywords: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'static_pages',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'idx_static_pages_slug',
        unique: true,
        fields: ['slug'],
      },
      {
        name: 'idx_static_pages_active',
        fields: ['isActive'],
      },
    ],
  }
);

export default StaticPage;