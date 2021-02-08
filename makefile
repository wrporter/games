mongo:
	docker run --name games-mongo -d -p 27017:27017 mongo:4.4
mongo-setup:
	docker cp server/database/setup.js games-mongo:/tmp/setup.js
	docker exec games-mongo bash -c "mongo < /tmp/setup.js"
