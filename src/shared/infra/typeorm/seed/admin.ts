import createConnection from "../index";
import {v4 as uuidV4} from "uuid";
import { hash } from "bcryptjs";

async function create() {
    const connection = await createConnection("localhost");
    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`
    INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES ('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXX-XXXX')
    `);
    await connection.close();
}

create().then(() => console.log("User admin created!"));