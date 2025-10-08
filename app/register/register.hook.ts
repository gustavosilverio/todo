import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from "./register.schema"
import { useCreateUser } from "@/api/controllers/user"
import { toast } from "sonner"
import { redirect } from "next/navigation"

export const useRegister = () => {
	const { mutateAsync: createUserAsync, isPending: createUserIsPending } = useCreateUser()

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
			redirect("/")
		})
	})

	return {
		control,
		onSubmit,
		createUserIsPending,
	}
}
