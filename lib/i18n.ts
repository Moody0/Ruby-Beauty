import { cookies } from 'next/headers';
import en from '@/app/locales/en.json';
import ar from '@/app/locales/ar.json';

export async function getI18n() {
    const cookieStore = await cookies();
    const language = (cookieStore.get('language')?.value || 'ar') as 'en' | 'ar';
    const translations = language === 'ar' ? ar : en;
    const dir = (language === 'ar' ? 'rtl' : 'ltr') as 'rtl' | 'ltr';

    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations;

        for (const k of keys) {
            if (result && typeof result === 'object') {
                // Try exact match first
                if (k in result) {
                    result = result[k];
                } 
                // Fallback: search case-insensitively
                else {
                    const foundKey = Object.keys(result).find(
                        existingKey => existingKey.toLowerCase() === k.toLowerCase()
                    );
                    if (foundKey) {
                        result = result[foundKey];
                    } else {
                        return key;
                    }
                }
            } else {
                return key;
            }
        }

        return typeof result === 'string' ? result : key;
    };

    return { t, dir, language };
}
