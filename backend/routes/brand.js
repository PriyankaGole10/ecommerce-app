const express = require("express")
const router = express.Router()


const { getbrands, updatebrand,
    getbrandById, addbrand, deletebrand
} = require("../handlers/brand-handler")


router.get("", async(req,res)=>{
    let brands = await getbrands();
    res.send(brands)
})

router.post("",async (req,res)=>{
    let model = req.body;
    let result = await  addbrand(model);
    res.send(result);
})

router.get("/:id", async(req,res)=>{
    let id = req.params["id"];
    let result = await getbrandById(id);
    res.send(result)
})


router.put("/:id",async(req,res)=>{
 let id = req.params["id"];
 let model = req.body;
await updatebrand(id, model)
 res.send({msg:'Brand updated successfully'});
})

router.delete("/:id",async(req,res)=>{
    let id = req.params["id"];
    await deletebrand(id);
    res.send({msg:'Brand deleted successfully'})
})





module.exports = router;