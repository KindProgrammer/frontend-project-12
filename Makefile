install:
	npm ci && make -C frontend install

build: 
	make install && npm run build

start:
	npm run start

start-with-frontend:
	make start && cd frontend && npm start

lint:
	make -C frontend lint