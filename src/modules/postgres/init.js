const { generateHash } = require("../bcrypt");

async function init(db){
    try {
        if(await db.admins.count() === 0){
            db.admins.create({
                admin_login: "admin",
                admin_password: generateHash("admin"),
            })
        }
    } catch (error) {
        console.log("INIT_ERROR", error);
    }
}