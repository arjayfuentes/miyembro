export const environment = {
    production: false,
    caching: true,
    auth: {
        issuer: 'https://extraxxx.xxxxx', // URL of the Identity Provider
        clientId: 'xxxxx', // Client ID
        postLogoutRedirectUri: 'https://localhost:4200/', // Redirect URL after logout
        redirectUri: window.location.origin + "/login/callback",
        silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html', // URL to redirect after silent refresh
        scope: 'openid profile logistack_apps authorization', // Scopes
        requireHttps: false,
        disableAtHashCheck: true,
        responseType: 'id_token token', // responseType
        preserveRequestedRoute: true, // preserve the requested route when redirecting
        oidc: true,
        showDebugInformation: true,
        clearHashAfterLogin: true,
        strictDiscoveryDocumentValidation: false,
      },
    apiUrl: 'http://ec2-13-53-224-124.eu-north-1.compute.amazonaws.com:8222/api/v1',
    countryUrl: 'https://api.countrystatecity.in/v1',
    jiraUrl: 'https://arjayprojects.atlassian.net/browse',
    jiraProfileUrl: 'https://arjayprojects.atlassian.net/jira/people',
    requireHttps : false
};
