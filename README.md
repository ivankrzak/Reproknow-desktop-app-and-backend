This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Prerequisites

Before you can work with this NextJS template, ensure that you have the following requirements set up on your system:

1. **Node.js**: This project requires Node.js version 18. You can download it from the [official Node.js website](https://nodejs.org/).

   Alternatively, we recommend using Node Version Manager (NVM) for managing multiple active Node.js versions. To install NVM, you can use the install script using cURL:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   ```

   Or with Wget:

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   ```

   After installing NVM, you can install and use the required Node.js version by running:

   ```bash
   nvm install 18
   nvm use 18
   ```

   We have also included a `.nvmrc` file in the repository to help ensure that everyone working on the project is using the same version of Node.js. Once you have NVM installed, you can simply run `nvm use` in the project directory to switch to the correct Node.js version.

2. **Docker**: This project uses Docker for providing a consistent development environment. You can download Docker from the [official Docker website](https://www.docker.com/). Follow their instructions for installation on your specific operating system.

Remember to verify that your installations were successful by checking the versions of Node.js and Docker:

```bash
node --version
docker --version
```

With these prerequisites satisfied, you are ready to work with this NextJS template repository!

# Getting Started

Here are the step-by-step instructions to set up the project locally:

## Step 1: Install Node.js Dependencies

The specific version of Next.js that we are using supports a wide range of Node.js versions. To ensure compatibility, we highly recommend utilizing [fnm](https://github.com/Schniz/fnm), which is a fast Node.js version manager. To utilize the appropriate Node.js version, navigate to the root directory and run the command `fnm use`. This will switch to the version specified in the `.nvmrc` file.

In addition, you can configure fnm to automatically switch to the appropriate Node.js version when changing directories or opening a project. More information on how to accomplish this can be found [here](https://github.com/Schniz/fnm#zsh).

Next, install the project dependencies. While you can use npm, this project prefers `yarn` for managing dependencies. If you don't have `yarn` installed, you can install it with the following command:

```bash
npm install --global yarn
```

Once you have `yarn` installed, you can install the project dependencies with the following command:

```bash
yarn install
```

This command reads the `package.json` file and installs all the necessary dependencies.

## Step 2: Start the Development Server

With the dependencies installed, you can now start the development server. This command also starts up the Next.js application:

```bash
yarn dev
```

Next.js application should now be running! Open your web browser and navigate to `http://localhost:3000` to see your application in action.

With these steps, you've successfully set up the NextJS template on your local machine. Happy coding!

## Step 3: Create database in docker

run

```bash
docker compose up --build -d
```

## Step 4: Run database migrations

```bash
yarn db:generate
yarn db:migrate
```
