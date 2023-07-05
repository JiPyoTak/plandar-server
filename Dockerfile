FROM node AS build

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install"]

COPY ["tsconfig.build.json", "tsconfig.json", "./"]
COPY ["nest-cli.json", "./"]
COPY ["src/", "./src/"]
COPY [".env", "./"]
RUN ["npm", "run", "build"]

RUN ["/bin/sh", "-c", "find . ! -name dist ! -name node_modules ! -name .env -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"]

FROM node

WORKDIR /app

COPY --from=build /app .

ENV NODE_ENV production
EXPOSE 4000/tcp

ENTRYPOINT ["node", "./dist/main"]