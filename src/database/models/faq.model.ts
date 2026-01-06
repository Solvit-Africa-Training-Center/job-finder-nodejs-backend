import { DataTypes, Model, Sequelize } from 'sequelize';

interface FAQAttributes {
  id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
  isActive: boolean;
  createdBy?: number;
  updatedBy?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type FAQCreationAttributes = Omit<
  FAQAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  displayOrder?: number;
  isActive?: boolean;
  category?: string;
  createdBy?: number;
  updatedBy?: number;
};

export class FAQ
  extends Model<FAQAttributes, FAQCreationAttributes>
  implements FAQAttributes
{
  id!: string;
  question!: string;
  answer!: string;
  category?: string;
  displayOrder!: number;
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

export const initFAQModel = (sequelize: Sequelize): typeof FAQ => {
  FAQ.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'faqs',
      timestamps: true,
      paranoid: true,
    },
  );

  return FAQ;
};
