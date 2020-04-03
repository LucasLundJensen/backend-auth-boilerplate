const User = require('../models/user.model');

async function getUser(req, res) {
    try {
        const id = req.params.id;
    
        const user = await User.findOne({where: { id }});
        if (!user) {
            res.status(404).json({ message: 'No user found. '});
        } else {
            res.status(200).json({ user });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUser
}