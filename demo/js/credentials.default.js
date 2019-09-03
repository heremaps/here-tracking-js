/**
 * Save this file as `credentials.js`
 *
 * A valid app_id and app_code are required to show map tiles.
 *
 * Get them from https://developer.here.com/
 */
const credentials = {
    app_id: 'DEVELOPER_APP_ID',
    app_code: 'DEVELOPER_APP_CODE',
    environment: 'production',
    embed: { // Only needed if you want to use the 'embed.html' demo
      email: "user.email@example.com",
      password: "password",
      trackingId: "HERE-...",
      ui: {
        header: true,
        info: true,
        buttons: true
      }
    }
};
