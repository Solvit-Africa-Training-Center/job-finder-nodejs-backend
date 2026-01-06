/**
 * AdminService
 * NOTE: Admin user model / management is not implemented in this repository yet.
 * These methods throw explicit errors to avoid accidental usage.
 * When an Admin user model is added, replace these implementations to call the model (e.g., AdminUser.create()).
 */
export class AdminService {
  static async createAdmin(_data: { email: string; password: string }) {
    throw new Error('createAdmin is not implemented: Admin user model is missing.');
  }

  static async getAdmins() {
    throw new Error('getAdmins is not implemented: Admin user model is missing.');
  }

  static async getAdminById(_id: string) {
    throw new Error('getAdminById is not implemented: Admin user model is missing.');
  }

  static async deactivateAdmin(_id: string) {
    throw new Error('deactivateAdmin is not implemented: Admin user model is missing.');
  }
}
