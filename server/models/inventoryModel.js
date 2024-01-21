const mongoose=require('mongoose');

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: true,
        enum: ["in","out"]
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
  
    // if inventoryType is "out" then hospital will be set
    // if inventoryType is "in" then donor will be set
  
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
          return this.inventoryType === "out";
        },
    },
  
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: function () {
          return this.inventoryType === "in";
        },
    },

} , { timestamps:true} );

module.exports=mongoose.model("inventories",inventorySchema);