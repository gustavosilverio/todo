import axios from "axios"

const commonHeaders = {
	"Content-Type": "application/json",
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:7000",
	headers: commonHeaders,
})
