import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: 1000,
    message: {
        msn: `Se ha realizado muchos intendos, por favor de intentar mas tarde`
    }
});