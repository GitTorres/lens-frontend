up:
	docker compose up -d
down:
	docker compose down --remove-orphans
up prod:
	docker compose -f docker-compose.prod.yml up -d
bash:
	docker exec -it lens-front-dev bash
bash_prod:
	docker exec -it lens-front-prod bash