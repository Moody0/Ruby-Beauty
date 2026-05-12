import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: string
            canManageBrands: boolean
            canDeleteBrands: boolean
            canManageProducts: boolean
            canDeleteProducts: boolean
            canManageCategories: boolean
            canDeleteCategories: boolean
            canManageBanners: boolean
            canDeleteBanners: boolean
            canManageOrders: boolean
            canDeleteOrders: boolean
            canManagePromoCodes: boolean
            canDeletePromoCodes: boolean
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        role: string
        canManageBrands: boolean
        canDeleteBrands: boolean
        canManageProducts: boolean
        canDeleteProducts: boolean
        canManageCategories: boolean
        canDeleteCategories: boolean
        canManageBanners: boolean
        canDeleteBanners: boolean
        canManageOrders: boolean
        canDeleteOrders: boolean
        canManagePromoCodes: boolean
        canDeletePromoCodes: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: string
        canManageBrands: boolean
        canDeleteBrands: boolean
        canManageProducts: boolean
        canDeleteProducts: boolean
        canManageCategories: boolean
        canDeleteCategories: boolean
        canManageBanners: boolean
        canDeleteBanners: boolean
        canManageOrders: boolean
        canDeleteOrders: boolean
        canManagePromoCodes: boolean
        canDeletePromoCodes: boolean
    }
}
