import { DataTypes, Model, Sequelize } from 'sequelize';
import { Message } from './Message';

interface Models {
  Message: typeof Message;
}

export class Conversation extends Model {
  public id!: string;
  public participant1Id!: string;
  public participant2Id!: string;
  public lastMessageAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: Models) {
    if (models.Message) {
      Conversation.hasMany(models.Message, {
        foreignKey: 'conversationId',
        as: 'messages',
        onDelete: 'CASCADE',
      });
    }
  }
}

export const initConversationModel = (sequelize: Sequelize) => {
  Conversation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      participant1Id: { type: DataTypes.UUID, allowNull: false },
      participant2Id: { type: DataTypes.UUID, allowNull: false },
      lastMessageAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      tableName: 'conversations',
      timestamps: true,
    },
  );

  return Conversation;
};

export default Conversation;
