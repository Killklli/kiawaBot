// Startup script that runs both the bot and web server
const { spawn } = require('child_process');

console.log('Starting Kiara Bot services...');

// Start the web server
const webServer = spawn('node', ['webserver/server.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
});

webServer.stdout.on('data', (data) => {
    console.log(`[WebServer] ${data.toString().trim()}`);
});

webServer.stderr.on('data', (data) => {
    console.error(`[WebServer Error] ${data.toString().trim()}`);
});

webServer.on('close', (code) => {
    console.log(`[WebServer] Process exited with code ${code}`);
});

// Give web server a moment to start, then start the bot
setTimeout(() => {
    console.log('Starting Kiara Bot...');
    
    const bot = spawn('node', ['Kiara_bot.js'], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    bot.stdout.on('data', (data) => {
        console.log(`[Bot] ${data.toString().trim()}`);
    });

    bot.stderr.on('data', (data) => {
        console.error(`[Bot Error] ${data.toString().trim()}`);
    });

    bot.on('close', (code) => {
        console.log(`[Bot] Process exited with code ${code}`);
        // If bot exits, kill the web server too
        webServer.kill();
        process.exit(code);
    });

}, 2000);

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    webServer.kill();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    webServer.kill();
    process.exit(0);
});