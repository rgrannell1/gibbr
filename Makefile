
NODE           = node
DOCKER         = docker
CONTAINER_NAME = rpgen

ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json




TEST_RENAME_CONTAINER  = $(CONTAINER_NAME)-test-rename
TEST_INSTALL_CONTAINER = $(CONTAINER_NAME)-test-install





eslint:
	$(ESLINT) $(ESLINT_FLAGS) $(APP_PATH)

docker-test-rename-build:
	$(DOCKER) build --tag=$(TEST_NUMBERS_CONTAINER) -f dockerfiles/test-rename .

docker-test-rename-cleanbuild:
	$(DOCKER) build --no-cache=true --tag=$(TEST_NUMBERS_CONTAINER) -f dockerfiles/test-rename .

docker-test-numbers-run:
	$(DOCKER) run $(TEST_NUMBERS_CONTAINER)
