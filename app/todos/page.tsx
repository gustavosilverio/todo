"use client"

import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import { Check, Pencil, Plus, Trash2, X } from "lucide-react"
import { ActionButtonProps, TodoProps } from "./todos.types"
import { useTodos } from "./todos.hook"
import { cn } from "@/lib/utils"
import { Tooltip } from "@/components/Tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { ControledInput } from "@/components/ControledInput"
import { ControledTextarea } from "@/components/ControledTextarea/ControledTextarea"
import { useDeleteTodo, useUpdateIsDoneTodo } from "@/api/controllers/todo"

export default function Todos() {
	const {
		enableDescription,
		setEnableDescription,
		todos,
		getTodosByUserIdIsPending,
		control,
		onSubmit,
		createTodoIsPending,
	} = useTodos()

	return (
		<Container.Centralized>
			<div className="flex flex-col gap-2.5 w-full max-w-[600px]">
				<h1 className="font-bold text-3xl">My todos ✅</h1>

				<form
					onSubmit={onSubmit}
					className={cn("flex flex-col", { "gap-2": enableDescription })}
				>
					<div className="flex gap-2 items-center">
						<ControledInput
							control={control}
							name="name"
							placeholder="Buy more milk..."
							className="h-12"
						/>

						<Button
							type="submit"
							variant="outline"
							className="w-12 h-12"
							loading={createTodoIsPending}
						>
							<Plus className="size-8" />
						</Button>
					</div>

					{enableDescription ? (
						<ControledTextarea
							control={control}
							name="description"
							placeholder="I need to buy some milk for my cat..."
							rows={4}
							className="max-h-32"
						/>
					) : (
						<Button
							onClick={() => {
								setEnableDescription(true)
							}}
							variant="link"
							className="p-0 w-max"
						>
							Description?
						</Button>
					)}
				</form>

				<div className="flex flex-col gap-2">
					{getTodosByUserIdIsPending ? (
						Array.from({ length: 3 }).map((_, i) => (
							<Skeleton
								className="w-full h-8"
								key={i}
							/>
						))
					) : todos?.length ? (
						todos.map((t) => (
							<Todo
								key={t.id}
								{...t}
							/>
						))
					) : (
						<p>No to-dos :/</p>
					)}
				</div>
			</div>
		</Container.Centralized>
	)
}

const Todo = ({ id, name, description, isDone }: TodoProps) => {
	const { mutateAsync: deleteTodo, isPending: deleteTodoIsPending } = useDeleteTodo()

	const { mutateAsync: updateIsDoneTodo, isPending: updateIsDoneTodoIsPending } = useUpdateIsDoneTodo()

	const handleChangeIsDone = async () => {
		await updateIsDoneTodo({
			idTodo: id,
			isDone: !isDone,
		})
	}

	return (
		<div className="flex items-center gap-2 justify-between">
			<Tooltip title={description}>
				<p className={cn("truncate", { "line-through": isDone })}>{name}</p>
			</Tooltip>

			<div className="flex gap-1">
				<ActionButton
					icon={<Pencil />}
					onClick={() => {
						console.log("edit")
					}}
				/>

				<ActionButton
					icon={isDone ? <X /> : <Check />}
					onClick={handleChangeIsDone}
					loading={updateIsDoneTodoIsPending}
				/>

				<ActionButton
					icon={<Trash2 />}
					onClick={() => {
						deleteTodo({ idTodo: id })
					}}
					loading={deleteTodoIsPending}
				/>
			</div>
		</div>
	)
}

const ActionButton = ({ icon, onClick, loading }: ActionButtonProps) => {
	return (
		<Button
			loading={loading}
			onClick={onClick}
			size="icon-sm"
			variant="ghost"
			className="cursor-pointer"
		>
			{icon}
		</Button>
	)
}
