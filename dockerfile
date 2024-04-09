FROM registry.cn-hangzhou.aliyuncs.com/kpublic/node:20-alpine
WORKDIR /app
COPY . .
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start"]