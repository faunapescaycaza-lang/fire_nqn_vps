# Stage 1: Install dependencies and build the project
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with a minimal production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Set the PORT environment variable, default to 3000
ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]
