export const pickField = (obj, allowedFields) => {
    return allowedFields.reduce((acc, field) => {
        if (obj[field] !== undefined) {
            acc[field] = obj[field];
        }
        return acc;
    }, {});
};