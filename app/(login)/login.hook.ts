import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "./login.schema"
import { useLoginUser } from "@/api/controllers/auth"
import { toast } from "sonner"

export const useLogin = () => {
	const { mutateAsync: loginUserAsync, isPending: loginUserIsPending } = useLoginUser()

	const { control, handleSubmit } = useForm({
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

	return {
		control,
		onSubmit,
		loginUserIsPending,
	}
}
