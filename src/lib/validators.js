import {StatusCodes} from "http-status-codes";

export const validateFile = (file, rules = {}, messages={}) => {

    return new Promise((resolve, reject) => {
        const errors = [];

        if (rules.maxSize) {
            const sizeInKilobytes = (file.size / 1024);
            if (sizeInKilobytes  > rules.maxSize) {
                errors.push(messages['maxSize'] ?? `The file size may not exceed ${rules.maxSize}KB`);
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

export function validateImageFile(file, maxSize, messages={}) {
    return validateFile(file, {
            types: ['image/png', 'image/jpeg'],
            maxSize
        },
        messages
    );
}