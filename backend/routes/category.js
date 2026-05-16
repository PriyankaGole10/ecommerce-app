const express = require("express");
const router = express.Router();
const Category = require("./../db/category");
const { addCategory, deleteCategory,updateCategory, getCategories, getCategoryById } = require("./../handlers/category-handler")

router.post("", async (req, res) => {
    let model = req.body;
    let result = await addCategory(model);
    res.send(result);
})

router.get("", async (req, res) => {
    let result = await getCategories();
    res.send(result);
})


router.get("/:id",async(req,res)=>{
    let id = req.params["id"];
    let result = await getCategoryById(id);
    res.send(result);
})


router.put("/:id", async (req, res) => {
    let model = req.body;
    let id = req.params['id'];
    await updateCategory(id, model);
    res.send({ msg: 'category updated' });
})


 router.delete("/:id",async(req,res)=>{
    let id = req.params["id"];
    await deleteCategory(id);
    res.send({msg:"Category deleted"})
 })


module.exports = router;