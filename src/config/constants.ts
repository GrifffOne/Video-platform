export const accentColor = '#E30B13'
export const bgColor = '#191B1F'


export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'

export const IS_PRODUCTION = process.env.APP_ENV === 'production'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}
