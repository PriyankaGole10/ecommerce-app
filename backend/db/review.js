const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    name: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String,
        required: true
    }

}, { timestamps: true });


// ONE REVIEW PER USER PER PRODUCT
reviewSchema.index(
    { productId: 1, userId: 1 },
    { unique: true }
);

module.exports = mongoose.model('reviews', reviewSchema);