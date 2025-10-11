import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "./login.schema"
import { useLoginUser } from "@/api/controllers/auth"
import { toast } from "sonner"
import { useReduxSelector } from "@/lib/hooks/useReduxSelector"
import { useEffect } from "react"
import { redirect } from "next/navigation"

export const useLogin = () => {
	const userCredentials = useReduxSelector("credentials")
	const { mutateAsync: loginUserAsync, isPending: loginUserIsPending } = useLoginUser()

	const { control, handleSubmit } = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		const loginRequest = loginUserAsync({
			email: values.email,
			password: values.password,
		})

		toast.promise(async () => loginRequest, {
			loading: "Verifying your credentials...",
			error: () => "Verify your credentials and try again.",
			success: () => {
				return {
					message: "login successful",
					description: "Welcome back!",
				}
			},
		})
	})

	useEffect(() => {
		if (userCredentials) redirect("/todos")
	}, [userCredentials])

	return {
		control,
		onSubmit,
		loginUserIsPending,
	}
}
