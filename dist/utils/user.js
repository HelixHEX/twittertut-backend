"use strict";
exports.__esModule = true;
exports.isLoggedIn = void 0;
function isLoggedIn(isloggedin, uuid, res) {
    if (isloggedin == "false" || uuid === '') {
        res.json({ session: 'user not logged in' }).status(400);
    }
}
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=user.js.map