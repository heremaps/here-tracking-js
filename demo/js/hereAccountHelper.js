/**
 * HERE Account Helper
 *
 * Wraps a few methods to make sharing functionality across
 * multiple pages easier.
 */
function hereAccountHelper(tracking) {

    function login(email, password) {
            tracking.users.login(email, password)
                .then(saveLoginData)
                .then(refreshPage)
                .catch(function(err) {
                    console.log(err);
                    alert('invalid login');
                });

    }

    function isLoggedIn() {
        const token = localStorage.getItem('token');
        const expiry = localStorage.getItem('expiry');

        return token && +new Date() < expiry;
    }

    function getToken() {
        return localStorage.getItem('token');
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        window.location = window.location;
    }

    function saveLoginData(data) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refresh", data.refreshToken);
        localStorage.setItem("expiry", +new Date() + data.expiresIn * 1000);
    }

    function refreshPage() {
        window.location = window.location;
    }

    return {
        isLoggedIn,
        getToken,
        login,
        saveLoginData,
        logout
    };

}
