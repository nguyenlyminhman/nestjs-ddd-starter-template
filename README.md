# 🚀 NestJS DDD Starter Template

A **production-ready NestJS template** following **Domain-Driven Design (DDD)** principles, preconfigured with common backend essentials to help you **bootstrap projects fast** and keep architecture clean.

> Suitable for real-world backend systems, microservices, and scalable APIs.

---

## ✨ Features

- ⚙️ **NestJS** (Latest)
- 🧱 **Domain-Driven Design (DDD)** structure
- 🔐 **Authentication & Authorization**
  - JWT-based auth
  - User module ready
- 📚 **Swagger (OpenAPI)**
  - Auto-generated API docs
- 🌍 **Internationalization (i18n)**
  - Multi-language support
- ✅ **Config management**
  - Environment-based configuration
- 🧪 Ready for testing (unit / e2e)
- 🧩 Clean & extensible architecture

---

## 🏗️ Project Structure (DDD)

```
src/
├── main.ts
├── app.module.ts
│
├── config/
│
├── modules/
│   ├── auth/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── auth.module.ts
│   │
│   ├── users/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── users.module.ts
│
├── shared/
│   ├── decorators/
│   ├── guards/
│   ├── filters/
│   ├── interceptors/
│   └── utils/
│
└── i18n/
    ├── en/
    └── vi/
```

---

## 📦 Installation

```bash
git clone https://github.com/nguyenlyminhman/template-nest-swagger.git
cd template-nest-swagger
npm install
```

---

## ▶️ Running the App

```bash
npm run start:dev
```

---

## 📖 Swagger API Docs

```
http://localhost:3000/api
```

---

## 📄 License

MIT License
