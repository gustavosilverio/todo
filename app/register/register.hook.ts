import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from "./register.schema"
import { useCreateUser } from "@/api/controllers/user"
import { toast } from "sonner"
import { useLoginUser } from "@/api/controllers/auth"
import { useReduxSelector } from "@/lib/hooks/useReduxSelector"
import { useEffect } from "react"
import { redirect } from "next/navigation"

export const useRegister = () => {
	const userCredentials = useReduxSelector("credentials")
	const { mutateAsync: createUserAsync, isPending: createUserIsPending } = useCreateUser()
	const { mutateAsync: loginUserAsync, isPending: loginUserIsPending } = useLoginUser()

	const { control, handleSubmit } = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		await createUserAsync({ ...values }).then(() => {
			toast.success("User created successfully!")
		})

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
		createUserIsPending,
		loginUserIsPending,
	}
}
