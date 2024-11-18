class KongPlugin {
    constructor(config) {
        this.config = config;
    }

    async access(kong) {
        try {
            // Get request information
            const host = await kong.request.getHeader("host");
            const path = await kong.request.getPath();
            
            // Add custom header
            await kong.service.request.setHeader("x-custom-header", this.config.message);
            
            // Log
            kong.log.notice(`Processing request to ${host}${path}`);
        } catch (error) {
            kong.log.err(error.message);
        }
    }
}

module.exports = {
    Plugin: KongPlugin,
    Schema: [
        { message: { type: "string" } },
        { prefix: { type: "string" } }
    ],
    Version: '0.1.0',
    Priority: 0
}