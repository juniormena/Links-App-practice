const { format } = require('timeago.js')

const helpers={};

helpers.timeago = (timestamp) =>{
    return format(timestamp);
}

//exportando el objet que va ser utilizado en la vista para poder presentar la fecha
module.exports = helpers;