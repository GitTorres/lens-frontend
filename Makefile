up:
	docker compose up -d
down:
	docker compose down --remove-orphans
prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
bash:
	docker exec -it ts-react-app-dev bash
bash_prod:
	docker exec -it ts-react-app-prod bash