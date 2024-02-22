const ClientErrorCodes = Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    NOT_FOUND: 404
});

const ServerErrorCodes = Object.freeze({
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLMENETED: 501,

});

const SucessCodes = Object.freeze({
    CREATED: 201,
    OK: 200

});


module.exports = {
    ClientErrorCodes,
    ServerErrorCodes,
    SucessCodes
}