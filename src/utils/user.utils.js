import jwt from 'jsonwebtoken'
export const getUserId = (request) => {
    console.log("getUser", request.request.headers.authorization);
    const rawAuthorization = request.request.headers.authorization;
    const authorization = rawAuthorization.replace('Bearer ', '')
    // const decoded = jwt.verify(authorization, 'thisisasecret')
    // return decoded.userId
    try {
        const decoded = jwt.verify(authorization, 'thisisasecret')
        return decoded.userId

    } catch (error) {
        console.log("erro no token!")
        return null;
    }
}
