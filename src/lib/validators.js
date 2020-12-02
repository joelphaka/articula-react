import {StatusCodes} from "http-status-codes";

export const validateFile = (file, rules = {}, messages={}) => {

    return new Promise((resolve, reject) => {
        const errors = [];

        if (rules.maxSize) {
            if ((file.size / 1024)  > rules.maxSize) {
                errors.push(messages['maxSize'] ?? `Incorrect file type`);
            }
        }

        if (rules.types && rules.types.length) {
              const matchedTypes = rules.types.filter(t => new RegExp(t, 'i').test(file.type));

              if (!matchedTypes.length) {
                  errors.push(messages['types'] ?? `Incorrect file type`);
              }
        }

        return errors.length === 0
            ? resolve(true)
            : reject({
                errors,
                status: StatusCodes.UNPROCESSABLE_ENTITY,
                isValidation: true
            })
    })
}