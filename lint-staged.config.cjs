module.exports = {
	"*.{ts,tsx}": ["eslint --fix --cache", "prettier --write", () => "tsc --noEmit --project tsconfig.json"],
}
