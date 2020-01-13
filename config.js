export default {
    "API_SERVER_PORT": 8080,
    "ANGULAR_SERVER_PORT": 4200,

    "API_SALESMAN_BASE_PATH": "/salesmen",
    "API_SWAGGER_BASE_PATH": "/swagger-ui",

    "JWT_ALGORITHM": "HS256",
    "JWT_EXPIRES_IN_SEC": 3600,
    "JWT_SECRET": "Not very secure but it should do the Trick =)",
    "BCRYPT_ROUNDS": 10,

    "OPENCRX_BASE_PATH": "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX",
    "OPENCRX_CREDENTIALS": {
        "username": "guest",
        "password": "guest"
    },

    "ORANGEHRM_BASE_PATH": "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php",
    "ORANGEHRM_CREDENTIALS": {
        "client_id": 'tom',
        "client_secret": 'tom123'
    },

    "MONGO_CONNECTION_STRING": "mongodb://localhost:27017/supermongo"
}
