// Exports the Fandango Api credentials
module.exports = {
    // Stores the FANDANGO_API_KEY environment variable
    apiKey: process.env.FANDANGO_API_KEY,

    // Stores the FANDANGO_API_SECRET environment variable
    apiSecret: process.env.FANDANGO_API_SECRET,

    // Stores the CALLBACK_URL environment variable
    callbackUrl: process.env.CALLBACK_URL
}