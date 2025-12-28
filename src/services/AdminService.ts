import Admin from '../models/Admin';

export class AdminService {
  static async createAdmin(data: { email: string; password: string }) {
    const admin = await Admin.create(data);
    return admin;
  }

  static async getAdmins() {
    const admins = await Admin.findAll();
    return admins;
  }

  static async getAdminById(id: string) {
    const admin = await Admin.findByPk(id);
    return admin;
  }

  static async deactivateAdmin(id: string) {
    await Admin.update({ isActive: false }, { where: { id } });
  }
}
