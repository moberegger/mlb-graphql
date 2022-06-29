.PHONY: clean
.PHONY: start

build:
	docker build -t mlb-graphql -f Dockerfile.local .

clean:
	rm -rf dist

start:
	docker run --rm -it -p 4000:4000 --name mlb-graphql-api mlb-graphql