
BIN          = ./node_modules/.bin

NODE         = node
NPM          = npm
NODE_FLAGS   = --harmony_destructuring --harmony_rest_parameters

# -- Mocha.

MOCHA         = $(BIN)/mocha
MOCHA_FLAGS   = $(NODE_FLAGS)

# -- eslint

ESLINT         = $(BIN)/eslint
ESLINT_FLAGS   = --config config/eslint.json

## -- Docker

DOCKER         = docker
APP_PATH       = node_modules/gibbr

CONTAINER_NAME = system-test-gibbr





eslint:
	$(ESLINT) $(ESLINT_FLAGS) $(APP_PATH)

npm-install:
	$(NPM) install .

docker-build:
	$(DOCKER) build --tag=$(CONTAINER_NAME) .

docker-cleanbuild:
	$(DOCKER) build --tag=$(CONTAINER_NAME) --no-cache=true .

docker-run:
	$(DOCKER) run $(CONTAINER_NAME)
