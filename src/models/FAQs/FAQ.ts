import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { UUID } from 'node:crypto';

interface FAQAttributes {
  id: UUID;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
  viewCount: number;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FAQCreationAttributes 
  extends Optional<FAQAttributes, 'id' | 'category' | 'displayOrder' | 'isActive' | 'viewCount' | 'deletedAt'> {}

class FAQ extends Model<FAQAttributes, FAQCreationAttributes>
  implements FAQAttributes {
  public id!: UUID;
  public question!: string;
  public answer!: string;
  public category!: string;
  public displayOrder!: number;
  public isActive!: boolean;
  public viewCount!: number;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FAQ.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
      allowNull: false,
      defaultValue: 'General',
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
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    indexes: [
      {
        name: 'idx_faqs_category',
        fields: ['category'],
      },
      {
        name: 'idx_faqs_active',
        fields: ['isActive'],
      },
      {
        name: 'idx_faqs_display_order',
        fields: ['displayOrder'],
      },
    ],
  }
);

export default FAQ;