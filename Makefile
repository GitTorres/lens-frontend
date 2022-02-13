up_dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --no-deps -d
up_prod:
	docker compose  -f docker-compose.yml -f docker-compose.prod.yml up --no-deps -d
down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans || true
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down --remove-orphans || true
	docker compose -f docker-compose.yml -f docker-compose.deploy.yml down --remove-orphans || true
sh:
	docker exec -it react sh
remove:
	docker container rm lens-frontend_react:latest || true
	docker image rm lens-frontend_react:latest || true