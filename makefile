# Constant Variables
NPX := pnpm dlx

# Commands
.PHONY: dev
dev: 
	pnpm dev

.PHONY: generate
generate:
	@echo "🧩 Generating prisma files"
	$(NPX) prisma generate

.PHONY: push
push:
	@echo "📤 Pushing to database"
	$(NPX) prisma db push

