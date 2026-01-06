import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface NotificationPreferenceAttributes {
    id: number;
    userId: number;
    emailEnabled: boolean;
    pushEnabled: boolean;
    smsEnabled: boolean;
    dailyDigest: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotificationPreferenceCreationAttributes extends Optional<NotificationPreferenceAttributes, 'id'> { }

export class NotificationPreference extends Model<NotificationPreferenceAttributes, NotificationPreferenceCreationAttributes> implements NotificationPreferenceAttributes {
    public id!: number;
    public userId!: number;
    public emailEnabled!: boolean;
    public pushEnabled!: boolean;
    public smsEnabled!: boolean;
    public dailyDigest!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const NotificationPreferenceModel = (sequelize: Sequelize) => {
    NotificationPreference.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            emailEnabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            pushEnabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            smsEnabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            dailyDigest: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'NotificationPreference',
            tableName: 'notification_preferences',
        }
    );

    return NotificationPreference;
};
