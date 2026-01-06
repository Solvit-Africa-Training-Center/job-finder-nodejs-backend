import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

export interface NotificationAttributes {
    id: number;
    userId: number;
    title: string;
    message: string;
    type: string; // 'message', 'application_status', 'job_alert', etc.
    isRead: boolean;
    readAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id'> { }

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
    public id!: number;
    public userId!: number;
    public title!: string;
    public message!: string;
    public type!: string;
    public isRead!: boolean;
    public readAt?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const NotificationModel = (sequelize: Sequelize) => {
    Notification.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isRead: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            readAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'notifications',
        }
    );

    return Notification;
};
