# Vacation Planner

[<img src="dashboard.png" alt="dashboard">](https://vacation-plan.vercel.app/)
[https://vacation-plan.vercel.app/](https://vacation-plan.vercel.app/)
## 💻 Getting Started

Node.js and npm are required to run this project. You can download them [here](https://nodejs.org/en/download/)

Minimun version of Node.js: >=18.0.0

First of all, you must install the dependencies using:

```bash
npm install
```

### 1) Creating a .env file

To use Postgresql, you must add the following environment variables:

```
NEXT_DATABASE_URL=postgresql://user:password@localhost:5432/vacation-plan
```

Remember to change the user and password to your own credentials.

You can also rename the ```.env.example``` to ```.env``` and change the values to your own credentials.

### 2) Now you run the prisma migrations:

```bash
npm run prisma-migrate
```

### 3) To use a mocked data for testing you must run:

```
npm run seed
```

## 🚀 Running the project

You can start the development mode using:
```
npm run dev
```

Open dev in [http://localhost:3002](http://localhost:3002) with your browser to it running.



To get more performance, you can build the project using:
```
npm run build
```

And start it by running:
```
npm start
```

Now you can open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



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

[<img src="documentation.png" alt="documentation">](https://vacation-plan-docs.netlify.app/)

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

Watch this video to see the project in action:

[<img src="dashboard.png" alt="video">](
https://www.youtube.com/watch?v=q7zL-xDCuak)

[https://www.youtube.com/watch?v=q7zL-xDCuak](
https://www.youtube.com/watch?v=q7zL-xDCuak)
