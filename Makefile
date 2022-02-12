up_dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --no-deps -d
down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans || true
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down --remove-orphans || true
	docker compose -f docker-compose.yml -f docker-compose.deploy.yml down --remove-orphans || true
up_prod:
	docker compose -f docker-compose.prod.yml up -d
bash:
	docker exec -it react bash
bash_prod:
	docker exec -it lens-front-prod bash
remove:
	docker container rm lens-frontend_react:latest || true
	docker image rm lens-frontend_react:latest || true