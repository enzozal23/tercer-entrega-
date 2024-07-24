import { EError } from "../../service/errors/enums.js";
import { logger } from "../../utils/logger.js";

export const handleErrors = () => (error, req, res, next) => {
    logger.error(error.cause);
    switch (error.code) {
        case EError.INVALID_TYPES_ERROR:
            return res.send({ status: "error", error: error.name })
            break
        case EError.DATABASE_ERROR:
            return res.send({ status: "error", error: error.name })
            break
        case EError.ROUTING_ERROR:
            return res.send({ status: "error", error: error.name })
            break
        default:
            res.send({ status: "error", error: "Error no identificado" })
            break;
    }
}