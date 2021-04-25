const environment = {
    name: "development",
    app: {
        port: 3000,
        apiUrl: "http://localhost:3000/api",
        frontUrl:"http://localhost:4200"
    },
    db: {
        host: '127.0.0.1',
        user : 'root',
        password: 'root',
        database: 'mysql_alfred',
        port: 3307
    },
    smtp:{
        host: "localhost",
        port: 1025,
        secure: false,
    },
    mail:{
        from_adresse: "contact@jdelm.com",
        from_name: "Alfred"
    },
    token:{
        secret: 'Localhost_Secret',
        issuer: 'localhost'
    }
};

export default environment