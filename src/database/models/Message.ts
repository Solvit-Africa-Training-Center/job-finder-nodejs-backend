import { DataTypes, Model, Sequelize } from 'sequelize';
import { Conversation } from './Conversation';

interface Models {
  Conversation: typeof Conversation;
}

export class Message extends Model {
  public id!: string;
  public conversationId!: string;
  public senderId!: string;
  public content!: string;
  public isRead!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Models) {
    if (models.Conversation) {
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversationId',
        as: 'conversation',
      });
    }
  }
}

export const initMessageModel = (sequelize: Sequelize) => {
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      conversationId: { type: DataTypes.UUID, allowNull: false },
      senderId: { type: DataTypes.UUID, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      tableName: 'messages',
      timestamps: true,
    },
  );

  return Message;
};

export default Message;
