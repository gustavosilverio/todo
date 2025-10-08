import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "./login.schema"
import { useLoginUser } from "@/api/controllers/auth"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const useLogin = () => {
	const searchParams = useSearchParams()

	const { mutateAsync: loginUserAsync, isPending: loginUserIsPending } = useLoginUser()

	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		const response = await loginUserAsync({
			email: values.email,
			password: values.password,
		})

		if (response.success) toast.success(`Hello ${response.data.userCredentials.name}!`)
	})

	useEffect(() => {
		const queryEmail = searchParams.get("email")

		if (queryEmail)
			reset({
				email: queryEmail,
			})
	}, [reset, searchParams])

	return {
		control,
		onSubmit,
		loginUserIsPending,
	}
}
