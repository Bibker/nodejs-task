const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    permissions:[
        {
            permission_name: String,
            permission_value:[String]
        }
    ]
})

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;