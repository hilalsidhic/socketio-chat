const moment = require('moment')

function formatMessage(user, text) {
    return formattedMessage={
        user,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage