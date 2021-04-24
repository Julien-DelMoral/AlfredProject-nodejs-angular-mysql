const environment = {
    name: "development",
    app: {
        port: 3000,
        apiUrl: "http://localhost:3000/api",
        frontUrl:"http://localhost:4200"
    },
    db: {
        host: '127.0.0.1',
        user : 'dev',
        password: 'dev',
        database: 'mysql_alfred'
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