# Constant Variables
NPX := pnpm dlx

# Commands
.PHONY: list
list:
	@echo "📋 Available commands:"
	@awk -F':.*?## ' '/^[a-zA-Z0-9_-]+:/ && !/^[[:blank:]]*list:/ { if ($$2 == "") { printf "   • %s\n", $$1 } else { printf "   • %-20s %s\n", $$1, $$2 } }' $(MAKEFILE_LIST)

.PHONY: dev 
dev: ## 💠 Starts NextJS dev environment
	pnpm dev

.PHONY: generate
generate: ## 🧩 Generates prisma files
	@echo "🧩 Generating prisma files"
	$(NPX) prisma generate

.PHONY: db-push
db-push: ## 📤 Pushes genrated prisma files to database
	@echo "📤 Pushing to database"
	$(NPX) prisma db push

.PHONY: reset
reset:  ## 🧨 Resets the database
	@echo "🧨 WARNING: This action will reset the database. Are you sure you want to proceed? [y/N]"
	@read -p "" confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo "Resetting database..."; \
		$(NPX) prisma migrate reset; \
	else \
		echo "Database reset aborted."; \
	fi
