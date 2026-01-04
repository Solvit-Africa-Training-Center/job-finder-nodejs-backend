import { DataTypes, Model, Sequelize } from 'sequelize';

export class Message extends Model {
  public id!: string;
  public conversationId!: string;
  public senderId!: string;
  public content!: string;
  public isRead!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    }
  );

  // Use a timeout to ensure Conversation is fully initialized in the index.ts flow
  setTimeout(() => {
    if (sequelize.models.Conversation) {
      Message.belongsTo(sequelize.models.Conversation, {
        foreignKey: 'conversationId',
        as: 'conversation',
      });
    }
  }, 0);

  return Message;
};

export default Message;