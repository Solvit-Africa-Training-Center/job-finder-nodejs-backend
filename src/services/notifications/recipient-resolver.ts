import { SampleUser } from '../../database/models/sampleuser';

/**
 * Resolve recipient to userId and user object
 */
export async function resolveRecipient(to: number | string) {
    let userId: number;
    let user: any = null;

    if (typeof to === 'number') {
        userId = to;
        user = await SampleUser.findByPk(userId);
    } else if (typeof to === 'string') {
        user = await SampleUser.findOne({ where: { email: to } });
        userId = user ? user.id : 0;
    } else {
        throw new Error('Invalid recipient: must be userId (number) or email (string)');
    }

    return { userId, user };
}
