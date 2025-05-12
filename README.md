# MeetUP

## Description

MeetUP is a social calendar application designed to make coordinating schedules with friends seamless and intuitive. It was created because it can be a hassle coordinating meetings between multiple friends and across different friend groups. MeetUP aims to simplify the process of finding mutual availability without endless back-and-forth messaging.

## Project Status

**Still in Development:** This project is actively under development. Core features are being built, and the application is not yet feature-complete or ready for production use.

## Features

### Implemented Features

- Core infrastructure setup in progress. No user-facing features are implemented yet.

### Planned Features (Roadmap)

- **Friendships:** Connect with friends to share calendars.
- **Group Calendars:** Create and manage shared calendars for groups.
- **iCal Import:** Import existing calendars from iCalendar (.ics) files.
- **iCal Export:** Export personal or shared calendars in iCalendar (.ics) format.
- **Email Notifications:** Receive email alerts for event bookings, reminders, and updates.
- **View Blocked Slots:** See when friends are busy without revealing event details.
- **Book Timeslots:** Request and confirm meeting times in friends' available slots.
- **SSO Compatibility:** Planning for Single Sign-On integration.

## Technologies Used

This project is built with a modern tech stack:

- **Package Manager:** [Yarn](https://yarnpkg.com/)
- **Framework:** [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing.
- **ORM:** [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
- **Authentication:** [Auth.js](https://authjs.dev/) (formerly NextAuth.js) - Authentication for Next.js.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
- **Containerization:** [Docker](https://www.docker.com/) (for planned self-hosting option)
- _(You can also list related tools here, e.g., ESLint, Prettier, testing libraries if you plan to use them)_

## Getting Started

**Prerequisites:**

- Node.js: Version is continually upgraded. It's recommended to use the latest LTS or a recent stable version. (Check `.nvmrc` if available).
- Yarn: Version is continually upgraded. (Check `package.json` engines field if specified).
- A database supported by Prisma (e.g., PostgreSQL, MySQL, SQLite). Ensure your database server is running.

**Installation & Running Locally:**

1.  **Clone the repository:**
    - Using SSH:
      ```bash
      git clone ssh://git@git.dominikstahl.dev/DHBW-WE/MeetUp.git
      ```
    - Or using HTTPS (recommended for most users):
      ```bash
      git clone [https://git.dominikstahl.dev/DHBW-WE/MeetUp.git](https://git.dominikstahl.dev/DHBW-WE/MeetUp.git)
      ```
    ```bash
    cd MeetUp
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
3.  **Set up environment variables:**

    - You will need to create an `AUTH_SECRET`. You can generate one using the following command:
      ```bash
      npx auth secret
      ```
    - Copy the `.env.example` file (if it exists) to `.env.local`. If not, create `.env.local`.
      ```bash
      # If .env.example exists:
      cp .env.example .env.local
      # Otherwise, create .env.local and add the following:
      ```
    - Ensure the following environment variables are set in your `.env.local` file. Adjust `DATABASE_URL` for your specific database provider and credentials.

      ```env
      # Database Connection String (Prisma)
      # Example for PostgreSQL: DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
      DATABASE_URL="your_database_connection_string"

      # Generated with npx auth secret
      AUTH_SECRET="your_generated_auth_secret"

      # Authentik SSO Variables (if you are using this provider)
      AUTH_AUTHENTIK_ID=
      AUTH_AUTHENTIK_SECRET=
      AUTH_AUTHENTIK_ISSUER=

      # Base URL of your application
      NEXT_PUBLIC_APP_URL="http://localhost:3000"

      # Development: Skip login flow (set to "true" to bypass authentication)
      # Ensure this is NOT set to "true" in production.
      MEETUP_SKIP_LOGIN="false"
      ```

4.  **Apply database migrations (Prisma):**

    - Ensure your Prisma schema (`prisma/schema.prisma`) is defined.
    - Run the following command to apply migrations and generate Prisma Client:
      ```bash
      npx prisma migrate dev
      # You might be prompted to name your first migration.
      ```
    - (Optional: If you need to generate Prisma Client without running migrations, use `npx prisma generate`)

5.  **Run the development server:**
    ```bash
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

**Self-Hosting with Docker (Planned):**

- A Docker image and `docker-compose.yml` file will be provided in the future to allow for easy self-hosting of the MeetUP application. This setup will also include database services. Instructions will be updated here once available.

## Contributing

Contributions are welcome! If you'd like to contribute, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b <action>/<issue#>-action_name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m '<action>: add some feature'`).
5.  Push to the branch (`git push origin <action>/<issue#>-action_name`).
6.  Open a Pull Request against the `main` branch.

Possible actions are:

    *feat* -> Feature added
    *fix* -> Fixed a bug
    *test* -> Modified or added tests
    *docs* -> Modified documentation
    *chore* -> changes to non code files (workflows, lock files, ...)
    *refactor* -> rewritten code without changing functionality
    *style* -> code style (yarn format)
    *revert* -> reverts a previous commit

Please ensure your code adheres to the project's coding standards (e.g., run linters/formatters if configured) and that any database schema changes are accompanied by a Prisma migration.

---

**(Optional Sections You Might Want to Add Later):**

- **Screenshots/Demo:** (Once you have UI to show)
- **API Reference:** (If you plan to expose an API)
- **Detailed Deployment Guides:** (For various platforms beyond Docker)
- **License:** (e.g., MIT, GPL - Important for open source projects)
- **Contact:** (How to get in touch with the maintainers)
- **Acknowledgements:** (Credit to any libraries, inspirations, or contributors)
