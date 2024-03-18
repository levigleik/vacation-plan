# Vacation Planner

<img src="dashboard.png" alt="dashboard">

## 💻 Getting Started

First of all, you must install the dependencies using:

```bash
npm install
```

### 1) Creating a .env file

You must create a ```.env``` file in the root of the project with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

If you want to use Postgresql, you must add the following environment variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/vacation-plan
```

Remember to change the user and password to your own credentials.

You can also rename the ```.env.example``` to ```.env``` and change the values to your own credentials.


### If you want to simplify, you must follow the next step to use SQLite instead of Postgresql:

Go to ```./prisma/schema.prisma``` and remove this:

```
datasource db {
  provider = "postgresql"
  url      = env("NEXT_DATABASE_URL")
}
```
and add this:
```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### 2) Now you run the prisma migrations:

```bash
npm run prisma-migrate
```

### 3) To use a mocked data for testing you must run:

```
npm run seed
```

## 🚀 Running the project

You can start the project using:
```
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to it running.

## 🛠️ Testing

If you ran the seed command, you can use the following credentials to login:

```
email: alice@example.com
password: password123
```

If you don't, you can create a new account by clicking on the ```Register``` button.


## 📚 Documentation

You can find the documentation [https://vacation-plan-docs.netlify.app/](
https://vacation-plan-docs.netlify.app/)

<img src="documentation.png" alt="documentation">

You can run the following command to generate the documentation:

```
npm run build-storybook
```

And start it by running:

```
npm run storybook
```

Now you can open [http://localhost:6006](http://localhost:6006) with your browser to see the documentation.

## 🎉 Deployment
I've already deployed the project on Vercel, you can check it out [here](
https://vacation-plan.vercel.app/)
