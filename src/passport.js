import passport from "passport"; 
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use("google", 
    new GoogleStrategy (
        {
        clientID: "1079491619055-4f63l94qot4egaas8vbe0pd340u1bdva.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/api/session/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                const userDB = await usersManager.findByEmail(profile._json.email);
                if (userDB) {
                    return done(null, userDB);
                    } 
                
                const cart = await cartManager.createOne();

                const infoUser = {
                    name: profile._json.given_name,
                    lastName: profile._json.family_name,
                    email: profile._json.email,
                    password: " ",
                    cartId: cart._id,                };
                const createdUser = await usersManager.createOne(infoUser);
                done(null, createdUser);
                } catch (error) {
                done(error);
                }
        }
    )
);
const fromCookies = (req) => {
    return req.cookies.token;
}