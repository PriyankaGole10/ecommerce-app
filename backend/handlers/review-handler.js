const reviewDb = require("./../db/review");


async function getAllReviewsOfOneProduct(productId, userId) {
    // let productId = req.params.productId;
    try {
        let reviews = await reviewDb.find({
            productId: productId
        }).sort({ createdAt: -1 });

        let myReview = await reviewDb.findOne({
            productId,
            userId
        });

        const avgRating = reviews.reduce((sum, r) =>
            sum + r.rating, 0) / (reviews.length || 1)

        return {
            reviews: reviews.map(r => r.toObject()),
            myReview: myReview ? myReview.toObject() : null,
            averageRating: avgRating.toFixed(1),
            total: reviews.length
        };

    } catch (error) {
        // res.status(500).json({ message: error.message })
        return {
            error: error.message
        };
    }
}

async function addReview(req) {

    try {
        const { productId, rating, comment } = req.body;

        const userId = req.user.id;
        const name = req.user.name;
// console.log('userId1',userId)
// console.log('user',req.user)
        if (!productId || !rating || !comment) {
            return {
                error: "All fields required"
            }
        }

        const existingReview = await reviewDb.findOne({
            productId,
            userId
        })

        if (existingReview) {

            existingReview.rating = rating;
            existingReview.comment = comment;

            await existingReview.save();

            return {
                message: "Review updated",
                review: existingReview.toObject()
            };
        }


        const review = new reviewDb({
            productId,
            userId,
            name,
            rating,
            comment
        });
        // console.log('review',review)
        // console.log('userId',userId)
        // console.log('review',review)

        await review.save();

        return {
            message: "Review added",
            review: review.toObject()
        };

    } catch (err) {
        error: err.message
    }
}

async function getReviewById(reviewId) {
    let review = await reviewDb.findById(reviewId);
    return review.toObject();
}

async function updateReview(id, model) {
    await reviewDb.findByIdAndUpdate(id, model);
}

async function deleteReview(id) {
    await reviewDb.findByIdAndDelete(id);
}


module.exports = { getAllReviewsOfOneProduct, addReview, getReviewById, updateReview, deleteReview }