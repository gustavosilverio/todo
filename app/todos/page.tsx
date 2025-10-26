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
import { Edit } from "./Modals/Edit"
import { useDataModal } from "@/lib/hooks/useDataModal"
import { EditProps } from "./Modals/Edit/Edit.types"

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
						/>

						<Button
							type="submit"
							variant="outline"
							className="w-9 h-w-9"
							loading={createTodoIsPending}
						>
							<Plus className="size-6" />
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
							variant="link"
							className="p-0 w-max"
							onClick={() => {
								setEnableDescription(true)
							}}
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

			<div className="fixed w-full h-10 backdrop-blur-sm bottom-0 rounded-t-sm sm:p-3 sm:rounded-md sm:w-auto sm:top-4 sm:left-4">
				<div className="flex h-full items-center justify-center">
					<p className="text-sm">All the to-dos are removed monthly</p>
				</div>
			</div>
		</Container.Centralized>
	)
}

const Todo = ({ id, name, description, isDone }: TodoProps) => {
	const { dataModais, toggleDataModal } = useDataModal({
		edit: null as EditProps["data"] | null,
	})

	const { mutateAsync: deleteTodo, isPending: deleteTodoIsPending } = useDeleteTodo()

	const { mutateAsync: updateIsDoneTodo, isPending: updateIsDoneTodoIsPending } = useUpdateIsDoneTodo()

	const handleChangeIsDone = async () => {
		await updateIsDoneTodo({
			idTodo: id,
			isDone: !isDone,
		})
	}

	const handleEdit = () => {
		toggleDataModal("edit", {
			open: true,
			data: {
				id,
				description,
				name,
			},
		})
	}

	return (
		<>
			<div className="flex items-center gap-2 justify-between">
				<Tooltip title={description}>
					<p className={cn("truncate", { "line-through": isDone })}>{name}</p>
				</Tooltip>

				<div className="flex gap-1">
					<ActionButton
						icon={<Pencil />}
						onClick={handleEdit}
					/>

					<ActionButton
						icon={isDone ? <X /> : <Check />}
						onClick={handleChangeIsDone}
						loading={updateIsDoneTodoIsPending}
					/>

					<ActionButton
						icon={<Trash2 />}
						loading={deleteTodoIsPending}
						onClick={() => {
							deleteTodo({ idTodo: id })
						}}
					/>
				</div>
			</div>

			<Edit
				open={dataModais.edit.open}
				data={dataModais.edit.data}
				onClose={() => {
					toggleDataModal("edit", { open: false })
				}}
			/>
		</>
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
