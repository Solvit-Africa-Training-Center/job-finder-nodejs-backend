import AdminAuditLog from "../models/Adminmodels/AdminActionLog";

export const logAdminAction = async ({
  adminId,
  action,
  entity,
  entityId,
  metadata,
}: {
  adminId: string;
  action: string;
  entity: string;
  entityId: string;
  metadata?: object;
}) => {
    await AdminAuditLog.create({
    adminId: parseInt(adminId, 10),
    action,
    entityType: entity,
    entityId: parseInt(entityId, 10),
    newValues: metadata || null,
    
  });
};
