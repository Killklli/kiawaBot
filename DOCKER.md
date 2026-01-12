# Docker Setup Guide for Kiara Bot

This guide will help you set up and run the Kiara Bot in a Docker container for continuous operation.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually included with Docker Desktop)

## Quick Start

1. **Clone and setup environment:**
   ```bash
   git clone <repository-url>
   cd kiawaBot
   cp .env.example .env
   ```

2. **Configure your environment:**
   Edit `.env` file with your actual Twitch credentials:
   ```env
   CLIENT_ID=your_twitch_client_id_here
   CLIENT_SECRET=your_twitch_client_secret_here
   BOT_ID=your_bot_user_id_here
   ```

3. **Build and run with Docker Compose (Recommended):**
   ```bash
   docker-compose up -d
   ```

## Docker Commands

### Using Docker Compose (Recommended)
```bash
# Start the bot (detached mode)
npm run compose:up

# Stop the bot
npm run compose:down

# View logs
npm run compose:logs

# Restart the bot
npm run compose:restart
```

### Using Docker directly
```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run

# View logs
npm run docker:logs

# Stop the container
npm run docker:stop
```

## Data Persistence

The bot's data is stored in the `./data` directory which is mounted as a Docker volume. This ensures:
- Quotes persist between restarts
- Streak data is maintained
- Custom commands are preserved

## Accessing the Bot

- **OAuth Setup**: The bot runs on port 3000 for Twitch OAuth callbacks
- **Logs**: Use `docker-compose logs -f` or `npm run compose:logs` to view real-time logs
- **Health Check**: The container includes health checks to monitor bot status

## Troubleshooting

1. **Port conflicts**: If port 3000 is already in use, modify the `docker-compose.yml` ports section
2. **Permission issues**: Ensure the `data` directory has proper write permissions
3. **Environment variables**: Double-check your `.env` file has correct Twitch credentials

## Production Deployment

For production deployment:

1. **Set up restart policies**: The docker-compose.yml already includes `restart: unless-stopped`
2. **Monitor logs**: Consider using a log management solution
3. **Backup data**: Regularly backup the `./data` directory
4. **Update strategy**: Use `docker-compose pull && docker-compose up -d` to update

## File Structure

```
kiawaBot/
├── Dockerfile              # Container definition
├── docker-compose.yml      # Multi-container setup
├── .env.example            # Environment template
├── .env                    # Your actual credentials (not in git)
├── data/                   # Persistent data (mounted volume)
│   ├── quotes.json
│   ├── streaks.json
│   └── command_List.json
└── ...                     # Other bot files
```

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique credentials for your Twitch application
- Consider running behind a reverse proxy for additional security
- Regularly update your Docker images and dependencies