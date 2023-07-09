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

.PHONY: db-push
db-push:
	@echo "📤 Pushing to database"
	$(NPX) prisma db push

.PHONY: reset
reset:
	@echo "🧨 WARNING: This action will reset the database. Are you sure you want to proceed? [y/N]"
	@read -p "" confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo "Resetting database..."; \
		$(NPX) prisma migrate reset; \
	else \
		echo "Database reset aborted."; \
	fi

