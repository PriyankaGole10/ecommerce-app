const productDbModel = require("./../db/product")



async function addProduct(model) {
    let product = new productDbModel({
        ...model
    })
    await product.save();
    return product.toObject();
}


async function getallProducts() {
    let products = await productDbModel.find();
    return products.map((p => p.toObject()))
}

async function getProductById(id) {
    let product = await productDbModel.findById(id);
    return product.toObject();
}

async function updateProduct(id, model) {
    await productDbModel.findByIdAndUpdate(id, model)
}

async function deleteProduct(id) {
    await productDbModel.findByIdAndDelete(id)
}

async function getNewProducts() {
    let newProducts = await productDbModel.find({ isNewProduct: true });
    return newProducts.map((m => m.toObject()))
}


async function getFeaturedProducts() {
    let featuredProducts = await productDbModel.find({ isFeatured: true });
    return featuredProducts.map((m => m.toObject()))
}


async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId) {
    if (!sortBy) {
        sortBy = 'price'
    }
    if (!sortOrder) {
        sortOrder = -1
    }

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    if (!page || page < 1) page = 1;
    if (!pageSize || pageSize < 1) pageSize = 10;

    let queryFilter = {};
    if (searchTerm) {
        queryFilter.$or = [
            {
                name: { $regex: searchTerm, $options: 'i' }
            },
            {
                shortDescription: { $regex: searchTerm, $options: 'i' }
            }
        ];
    }

    if (categoryId) {
        queryFilter.categoryId = categoryId
    }

    if (brandId) {
        queryFilter.brandId = brandId
    }
    const skip = (+page - 1) * +pageSize;
      const totalProducts = await productDbModel.countDocuments(queryFilter);

    const products = await productDbModel.find(queryFilter)
        .sort({
            [sortBy]: +sortOrder,
            _id: 1
        })
        .skip(skip)
        .limit(+pageSize);

    
    return {
    products: products.map(x => x.toObject()),
    totalProducts,
    page,
    pageSize,
    totalPages: Math.ceil(totalProducts / pageSize)
  };

}

module.exports = {
    addProduct, getallProducts, getProductById, updateProduct, getNewProducts,
    deleteProduct, getFeaturedProducts, getProductForListing
}