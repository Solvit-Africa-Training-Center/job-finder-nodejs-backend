import { UserActivityLog } from '../database/models/useractivitylog.model';
import { AppError } from '../utils';

export type AuditAction =
  | 'role_change'
  | 'activate'
  | 'deactivate'
  | 'block'
  | 'unblock'
  | 'account_update'
  | 'profile_update';

export interface AuditLogPayload {
  userId: number;
  adminId: number;
  action: AuditAction;
  details?: Record<string, unknown>;
}

export class AuditService {
  async logAction(payload: AuditLogPayload): Promise<UserActivityLog> {
    try {
      const log = await UserActivityLog.create({
        userId: payload.userId,
        adminId: payload.adminId,
        action: payload.action,
        details: payload.details,
      });

      return log;
    } catch (error) {
      throw new AppError(
        'Failed to log audit action: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
        500,
      );
    }
  }

  async getUserActivityLog(
    userId: number,
    limit = 20,
    offset = 0,
  ): Promise<{
    total: number;
    limit: number;
    offset: number;
    data: UserActivityLog[];
  }> {
    const { count, rows } = await UserActivityLog.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      total: count,
      limit,
      offset,
      data: rows,
    };
  }

  async getAllActivityLogs(
    limit = 50,
    offset = 0,
  ): Promise<{
    total: number;
    limit: number;
    offset: number;
    data: UserActivityLog[];
  }> {
    const { count, rows } = await UserActivityLog.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      total: count,
      limit,
      offset,
      data: rows,
    };
  }
}
