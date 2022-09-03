module.exports = {
    mongoURI: "mongodb://localhost:27017/drlnet",
    secretOrKey: 'thisismysecret',
    EMAIL_CONFIG : {
        SMTP_HOST: undefined,
        SMTP_PORT: undefined,
        SECURE: false, // true for 465, false for other ports
        EMAIL: undefined,
        PASSWORD: undefined
    }
}
