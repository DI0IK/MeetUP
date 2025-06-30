# MeetUP

## Table of contents

- [Description](#description)
- [Project Status](#project-status)
- [Features](#features)
  - [Implemented Features](#implemented-features)
  - [Planned Features](#planned-features-roadmap)
- [Technologies Used](#technologies-used)
- [Development environment setup](#development-environment-setup)
  - [Without Docker](#without-docker)
  - [With Docker](#with-docker)
- [Production Deployment using Docker](#production-deployment-using-docker)
- [Contributing](#contributing)

## Description

MeetUP is a social calendar application designed to make coordinating schedules with friends seamless and intuitive. It was created because it can be a hassle coordinating meetings between multiple friends and across different friend groups. MeetUP aims to simplify the process of finding mutual availability without endless back-and-forth messaging.

## Project Status

**Still in Development:** This project is actively under development. Core features are being built, and the application is not yet feature-complete or ready for production use.

## Features

### Implemented Features

- Event creation, deletion, and editing
- SSO and credentials login and signup
- Participant invitation and status
- Calendar of your own events
- Calendar of other users' availability (only in event creation form)

### Planned Features (Roadmap)

- Friendships
- Group calendars
- iCal import and export
- Notifications (in-app and external/mail)

## Technologies Used

This project is built with a modern tech stack:

- **Package Manager:** [Yarn](https://yarnpkg.com/)
- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Auth.js](https://authjs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Containerization:** [Docker](https://www.docker.com/)
- **API Docs:** [Swagger](https://swagger.io/)
- **React hook API client:** [orval](https://orval.dev/)

## Development environment setup

### Without Docker

**Prerequisites:**

- **Node.js**: version 22+
- **corepack**: enable using `corepack enable`

**Installation & Running:**

1.  **Clone the repository:**
    - Using HTTPS:
      ```bash
      git clone https://git.dominikstahl.dev/DHBW-WE/MeetUp.git
      ```
    - Or using SSH:
      ```bash
      git clone ssh://git@git.dominikstahl.dev/DHBW-WE/MeetUp.git
      ```
    ```bash
    cd MeetUp
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Set up environment variables:**
    You will need to create an `AUTH_SECRET`. You can generate one using the following command:

    ```bash
    npx auth secret
    ```

    Add any additional needed environment variables into the generated `.env.local` file.
    Example variables can be found in the `.env.example` file. The following variables are required:

    ```env
    # Generated with npx auth secret
    AUTH_SECRET="your_generated_auth_secret"

    DATABASE_URL="file:./dev.db"
    ```

4.  **Apply database migrations (Prisma):**
    Set up/update the database with these commands:

    ```bash
    yarn prisma:generate
    ```

    ```bash
    yarn prisma:db:push
    ```

    Tip: You can open the Prisma database UI with `yarn prisma:studio`

5.  **Generate needed TypeScript files:**
    Generate the `swagger.json` file and the API client using:

    ```bash
    yarn swagger:generate
    yarn orval:generate
    ```

6.  **Run the development server:**

    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### With Docker

**Prerequisites:**

- **Docker**
- **Docker Compose**

**Running:**

```bash
yarn dev_container
```

## Production Deployment using Docker

The application can be hosted using the [Docker container](https://git.dominikstahl.dev/DHBW-WE/-/packages/container/meetup/main).

There is an example Docker Compose file provided [here](https://git.dominikstahl.dev/DHBW-WE/MeetUp/src/branch/main/docker-compose.yml).

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch:

    ```bash
    git checkout -b <type>/<issueNum>-<short_description>
    ```

    - Example: `feat/42-add_login_form`

3.  Make your changes.
4.  Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
    - The commit message should be structured as follows:

      ```
      <type>(optional scope): <short description>
      ```

      - Example: `feat(auth): add login form`
      - Example: `fix(events): correct event time calculation`
      - Example: `docs: update README with setup instructions`

    - Used types:
      - `feat`: Feature added
      - `fix`: Bug fix
      - `test`: Add or modify tests
      - `docs`: Documentation changes
      - `chore`: Changes to non-code files (workflows, lock files, etc.)
      - `refactor`: Code refactoring without changing functionality
      - `style`: Code style changes (formatting, etc.)
      - `revert`: Revert a previous commit

5.  Push to your branch:
    ```bash
    git push origin <type>/<issue#>-<short_description>
    ```
6.  Open a Pull Request against the `main` branch.

Please ensure your code adheres to the project's coding standards (run `yarn format`) and that any database schema changes are accompanied by a Prisma migration.
