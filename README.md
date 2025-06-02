# Vacation Planner

[<img src="dashboard.png" alt="dashboard">](https://vacation-plan.vercel.app/)
[https://vacation-plan.vercel.app/](https://vacation-plan.vercel.app/)

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime & package manager
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Query](https://tanstack.com/query/latest) - Data fetching and caching
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Biome](https://biomejs.dev/) - Linting and formatting
- [Storybook](https://storybook.js.org/) - UI component documentation
- [PostgreSQL](https://www.postgresql.org/) - Database

## 💻 Getting Started

Bun is required to run this project. You can install it by running:

```bash
curl -fsSL https://bun.sh/install | bash
```

Minimum requirements:
- Bun >= 1.0.0
- Node.js >= 18.0.0

First, install the dependencies:

```bash
bun install
```

### 1) Creating a .env file

To use PostgreSQL, you must add the following environment variables:

```
NEXT_DATABASE_URL=postgresql://user:password@localhost:5432/vacation-plan
```

Remember to change the user and password to your own credentials.

You can also rename the `.env.example` to `.env` and change the values.

### 2) Run the database migrations:

```bash
bun run prisma-migrate
```

### 3) Seed the database (optional):

```bash
bun run seed
```

## 🚀 Running the project

Start the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For production:
```bash
bun run build
bun start
```

## 🧪 Testing

If you ran the seed command, use these credentials:

```
email: alice@example.com
password: password123
```

Or create a new account through the Register page.

## 📚 Documentation

Our components are documented with Storybook. View the documentation at [https://vacation-plan-docs.netlify.app/](https://vacation-plan-docs.netlify.app/)

[<img src="documentation.png" alt="documentation">](https://vacation-plan-docs.netlify.app/)

Run Storybook locally:

```bash
bun run storybook
```

Visit [http://localhost:6006](http://localhost:6006) to view the documentation.

## 🎉 Deployment

Check out the live project at [https://vacation-plan.vercel.app/](https://vacation-plan.vercel.app/)

Watch the demo:

[<img src="dashboard.png" alt="video">](https://www.youtube.com/watch?v=q7zL-xDCuak)
[https://www.youtube.com/watch?v=q7zL-xDCuak](https://www.youtube.com/watch?v=q7zL-xDCuak)
