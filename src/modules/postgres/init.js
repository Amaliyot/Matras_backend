const { generateHash } = require("../bcrypt");

async function init(db){
    try {
        if(await db.admins.count() === 0){
            const a = await db.admins.create({
                admin_login: "admin",
                admin_password: generateHash("admin"),
            })
            console.log(a);
        }
    } catch (error) {
        console.log("INIT_ERROR", error);
    }
}

module.exports = init