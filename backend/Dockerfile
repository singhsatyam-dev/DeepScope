
FROM node:24-slim

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update && apt-get install -y openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy backend source code
COPY . .

# Provide a placeholder URL for Prisma generation at build time
ENV DATABASE_URL="postgresql://researchpilot:placeholder@localhost:5432/researchpilot?schema=public"

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
