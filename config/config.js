const env = process.env.NODE_ENV || 'development';

const development = {
    app: {
        port: 8700
    },
    db: {
        host: 'mongodb://root:root123@ds145356.mlab.com:45356/heroku_0js05q2b'
    }
};

const production = {
    app: {
        port: process.env.PORT || 8700
    },
    db: {
        host: process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelesDB'
    }
}

const config = {
    development,
    production
};

module.exports = config[env];