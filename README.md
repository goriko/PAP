# Registration System Web App

The registration system for the PAP Conference.

## Local Development

### Environment variables
The following environment variables are needed:
1. `DB_URL` - specifies the URL of the database to connect to
2. `REDIS_URL` - specifies the URL of the Redis instance to connect to
3. `BETTER_AUTH_SECRET` - used to encrypt and generate hashes
4. `BETTER_AUTH_URL` - base URL of the API with `/auth` as the path (ie. `api.pap.com/auth`)
5. `RESEND_API_KEY` - API key for the Resend service to send emails
6. `RESEND_FROM_EMAIL` - email address used to send emails via Resend
7. `NEXT_PUBLIC_BASE_URL` - base URL of the client (Next.js)
8. `NEXT_PUBLIC_API_BASE_URL` - base URL of the server (Node.js)
9. `NEXT_PUBLIC_QR_ENCRYPTION_SECRET` - secret key used for AES encryption of user data into QR code
10. `REMOTE_PATTERNS` - valid URL wildcard matchers, delimited by commas, for external images via `<Image />` outside of our domain
    - ex. `https://external-domain/images/*,https://s3.aws.services/bucket/papcon/images/*`
### Getting the app to run

First, clone the repository

```bash
git clone https://github.com/PAPCon-Registration-System/web-app.git
```

Then, install the dependencies


```bash
pnpm install
```

Finally, run the application in dev mode

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setting up the local database

To start with the local database, run the following script

```bash
pnpm run db:up
```

To push schema changes, run

```bash
pnpm run db:push
```

To view the database, run

```bash
pnpm run db:studio
```

To stop the database, run

```bash
pnpm run db:down
```

> [!important]
> When experimenting with schema changes, **do not generate migrations**. Just push the changes directly to the local database. The migration generation. To sync your local database schema with the schema of prod, just pull from main and push the schema changes to your db.

## Deployment

### Prerequisites

> [!Caution]
> Ensure you have the following resources set up before deploying the app.

1. A Redis database with a publicly-accessible URL.
2. A PostgreSQL database with a publicly-accessible URL.

### App Deployment Steps

1. Create a Coolify Docker Compose app and use `docker-compose.yaml` to build the app.
2. Set `Custom Start Command` to `docker compose up -d`.
3. Set these environment variables:

```bash
BETTER_AUTH_SECRET=secret # change this to a strong secret generated via `openssl rand -base64 32`
BETTER_AUTH_URL=https://api.pap.com/auth # the path to the Better Auth endpoint
RESEND_API_KEY= # your Resend API key that is verified with your domain 
RESEND_FROM_EMAIL= # the email address you want to use for sending emails, e.g. authenticate@pap.com
DB_URL= # your publicly accessible PostgreSQL database URL
NEXT_PUBLIC_API_BASE_URL=https://api.pap.com # the API subdomain of the website
NEXT_PUBLIC_BASE_URL=https://pap.com # the domain of the website
NEXT_PUBLIC_QR_ENCRYPTION_SECRET= # any secret key you want to use for QR code generation
REDIS_URL= # your publicly accessible Redis database URL
REMOTE_PATTERNS= # if you're using images outside of NEXT_PUBLIC_BASE_URL, add a comma-delimited pattern list like: https://randomuser.me/api/portraits/men/*,https://randomuser.me/api/portraits/women/*
```

- mark `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_BASE_URL`, and `NEXT_PUBLIC_QR_ENCRYPTION_SECRET` as `Is Build Variable?` in the Coolify configuration page.


4. Set the `Domains for App` in Coolify to `https://pap.com:3000,https://api.pap.com:6969`
   - replace the domains according to your environment variables
5. Deploy the app.