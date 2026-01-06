import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { UUID } from 'node:crypto';

interface EmailTemplateAttributes {
  id: UUID;
  name: string;
  slug: string;
  subject: string;
  htmlContent: string;
  textContent: string | null;
  variables: string[] | null;
  category: string;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EmailTemplateCreationAttributes 
  extends Optional<EmailTemplateAttributes, 'id' | 'textContent' | 'variables' | 'category' | 'isActive' | 'deletedAt'> {}

class EmailTemplate extends Model<EmailTemplateAttributes, EmailTemplateCreationAttributes>
  implements EmailTemplateAttributes {
  public id!: UUID;
  public name!: string;
  public slug!: string;
  public subject!: string;
  public htmlContent!: string;
  public textContent!: string | null;
  public variables!: string[] | null;
  public category!: string;
  public isActive!: boolean;
  public deletedAt!: Date | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EmailTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    htmlContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    textContent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    variables: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'General',
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
    tableName: 'email_templates',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'idx_email_templates_slug',
        unique: true,
        fields: ['slug'],
      },
      {
        name: 'idx_email_templates_category',
        fields: ['category'],
      },
      {
        name: 'idx_email_templates_active',
        fields: ['isActive'],
      },
    ],
  }
);

export default EmailTemplate;