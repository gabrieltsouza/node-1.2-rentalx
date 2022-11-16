import {Connection, createConnection, getConnectionOptions} from "typeorm";

/*
interface IOptions {
    host: string;
}

getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = 'database_rentx'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    createConnection({
        ...options,
    });
})
Substituido pelo de baixo*/

export default async(host = "database_rentx"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return createConnection(Object.assign(defaultOptions,{host}));
}