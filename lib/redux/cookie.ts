import Cookies from "js-cookie"

export enum Cookie {
	Credentials = "credentials",
}

/**
 * Sets a session cookie that expires when the browser is closed.
 */
export const createTempCookie = <T>(cookie: Cookie, value: T) => {
	Cookies.set(cookie, JSON.stringify(value))
}

/**
 * Sets a persistent cookie that does not expire when the browser is closed.
 */
export const createPersistentCookie = <T>(cookie: Cookie, value: T) => {
	Cookies.set(cookie, JSON.stringify(value), { expires: 365 })
}

/**
 * 	Get a cookie
 */
export const getCookie = <T = string>(cookie: Cookie) => {
	const storedCookie = Cookies.get(cookie)
	if (!storedCookie) return null
	return JSON.parse(storedCookie) as T
}

/**
 * Remove a specific stored cookie, temporary or persistent
 */
export const removeCookie = (cookie: Cookie) => {
	Cookies.remove(cookie, { expires: 0 })
}

/**
 * Clean all the stored cookies
 */
export const removeAllCookies = () => {
	Object.values(Cookie).forEach((cookie) => {
		Cookies.remove(cookie, { expires: 0 })
	})
}
