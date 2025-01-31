install:
	npm ci && make -C frontend install

build: 
	npm run build

start:
	npm run start

start-frontend:
	cd frontend && npm start

develop:
	make start-backend & make start-frontend

lint:
	make -C frontend lint