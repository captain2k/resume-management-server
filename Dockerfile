# pnpm
FROM node:16-bullseye as pnpm
RUN npm install -g pnpm

# build
FROM pnpm as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

RUN pnpm prisma generate

COPY --chown=node:node . .
RUN pnpm build

# run
FROM pnpm as runner

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder --chown=node:node /home/node/prisma/ ./prisma

CMD ["pnpm", "start:migrate:prod"]