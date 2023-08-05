const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registeringUser(req, res) {
    try {
        const { firstName, lastName, email, password, age, gender, role } = req.body;

        const userRole = role || "customer";

        if (!firstName || !lastName || !age || !gender || !email || !password) {
            return res
                .status(400)
                .json({
                    error:
                        "Please provide firstName, lastName, email, password, age, and gender for the user",
                });
        }
        
    } catch (error) {

    }
}


module.exports = { registeringUser }