import { DataTypes, Model, Sequelize } from 'sequelize';

interface staticPageAttributes {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isActive: boolean;
  createdBy?: number;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type staticPageCreationAttributes = Omit<
  staticPageAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  isActive?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdBy?: number;
  updatedBy?: number;
};

export class staticPage
  extends Model<staticPageAttributes, staticPageCreationAttributes>
  implements staticPageAttributes
{
  id!: string;
  slug!: string;
  title!: string;
  content!: string;
  metaTitle?: string;
  metaDescription?: string;
  isActive!: boolean;
  createdBy?: number;
  updatedBy?: number;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt?: Date;

  toJSON() {
    const values = { ...this.get() };
    if (!values.createdBy) delete values.createdBy;
    if (!values.updatedBy) delete values.updatedBy;
    delete values.deletedAt;
    return values;
  }
}

export const initStaticPageModel = (
  sequelize: Sequelize,
): typeof staticPage => {
  staticPage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
    },
  );

  return staticPage;
};
