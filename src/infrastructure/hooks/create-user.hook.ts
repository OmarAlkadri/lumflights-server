// src/modules/users/hooks/create-user.hook.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserHook {
    async beforeCreate(userData: any) {

        if (!userData.email) {
            throw new Error('البريد الإلكتروني مطلوب');
        }
        const userExists = await this.checkIfUserExists(userData.email);
        if (userExists) {
            throw new Error('المستخدم موجود بالفعل');
        }
        console.log('تحققنا من البيانات بنجاح قبل إنشاء المستخدم');
    }

    private async checkIfUserExists(email: string): Promise<boolean> {
        return false;
    }

    async afterCreate(userData: any) {
        console.log(`تم إنشاء المستخدم بنجاح: ${userData.email}`);
        await this.sendWelcomeEmail(userData);
    }

    private async sendWelcomeEmail(userData: any) {
        console.log(`إرسال بريد الترحيب إلى: ${userData.email}`);
    }

    async onError(error: any) {
        console.error(`حدث خطأ أثناء إنشاء المستخدم: ${error.message}`);
    }
}
