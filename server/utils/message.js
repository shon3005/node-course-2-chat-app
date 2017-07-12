var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: newDate().getTime()
    }
};

module.exports = {generateMessage};
