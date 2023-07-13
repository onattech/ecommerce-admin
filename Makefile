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
db-push: ## 📤 Pushes generated prisma files to database
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

.PHONY: encrypt-env
encrypt-env: ## 🔒 Encrypts the .env file
	@stty -echo; \
	read -p "Enter passphrase: " passphrase && echo; \
	stty echo; \
	openssl enc -aes-256-cbc -salt -in .env -out .env.enc -pass pass:$$passphrase -pbkdf2
	@echo "🔒 .env encrypted and saved to .env.enc"

.PHONY: decrypt-env
decrypt-env: ## 🔐 Decrypts the .env.enc file
	@echo "This will overwrite the .env file. Are you sure?[y/N]"
	@read -p "" confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		stty -echo; \
		read -p "Enter passphrase: " passphrase && echo; \
		stty echo; \
		if openssl enc -aes-256-cbc -d -in .env.enc -out .env -pass pass:$$passphrase -pbkdf2; then \
			echo "🔐 .env.enc successfully decrypted and saved to .env"; \
		else \
			echo "⛔️ Decryption failed. Please check the passphrase and try again."; \
			rm -f .env; \
		fi; \
	else \
		echo "Database reset aborted."; \
	fi
