# go.down

## Setting up environment

```
git clone https://github.com/DarkGuy10/go-down && cd go-down
nix develop
```

The development environment provides `bun` and `vercel-cli`.

## Running dev server

If you don't have Nix, you need to install [bun](https://bun.sh/) and add it to your PATH

> [!IMPORTANT]  
> You need to populate the .env.local file first

```
bun run dev
```

## Building

```
bun run build
# bun start
```

## Deploying

If you don't have Nix, you need to install [vercel-cli](https://vercel.com/docs/cli) and add it to your PATH

```
# vercel login
# vercel whoami

# Setup env secrets using vercel env

vercel --prod
```
