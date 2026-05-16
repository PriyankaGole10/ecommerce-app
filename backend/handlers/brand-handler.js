const brandDbModel = require("./../db/brand");
const productModel = require("./../db/product")

async function getbrands() {
   let brands = await brandDbModel.find();
   return brands.map((b) => b.toObject())
}

async function getbrandById(id) {
   let brand = await brandDbModel.findById(id);
   return brand.toObject();
}

async function getBrandsByCategoryId(categoryId) {
   let products = await productModel.find({ categoryId });
   let brandIds = [...new Set(products.flatMap(p => p.brandId))];

   let brands = await brandDbModel.find({
      _id: { $in: brandIds }
   });
   return brands.map((b) => b.toObject())

}

async function addbrand(model) {
   let brand = new brandDbModel({
      name: model.name,
   })
   await brand.save();
   return brand.toObject();
}


async function updatebrand(id, model) {
   await brandDbModel.findByIdAndUpdate(id, model)
}


async function deletebrand(id) {
   await brandDbModel.findByIdAndDelete(id);
}


module.exports = { getbrands, getbrandById, getBrandsByCategoryId, addbrand, updatebrand, deletebrand }
