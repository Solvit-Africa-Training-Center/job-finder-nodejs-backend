import { DataTypes, Model, Sequelize } from 'sequelize';

export class Conversation extends Model {
  public id!: string;
  public participant1Id!: string;
  public participant2Id!: string;
  public lastMessageAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    }
  );

  // The Trick: Use a callback or a late binding approach
  // We use the internal sequelize.models to avoid passing undefined
  // We do this inside a setTimeout so it happens AFTER index.ts finishes
  setTimeout(() => {
    if (sequelize.models.Message) {
      Conversation.hasMany(sequelize.models.Message, {
        foreignKey: 'conversationId',
        as: 'messages',
        onDelete: 'CASCADE',
      });
    }
  }, 0);

  return Conversation;
};

export default Conversation;