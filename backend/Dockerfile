# Gunakan Node.js sebagai base image
FROM node:18

# Set work directory
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=optional

# Copy seluruh kode backend
COPY . .

# Ekspos port untuk container
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]