install:
	npm ci && make -C frontend install

build: 
	make install && npm run build

# Запустить сервер без обновленной папки dist
start:
	npm run start

# Обновить папку dist и запустить сервер
build-frontend-and-start:
	npm ci && npm run build && make start

lint:
	make -C frontend lint