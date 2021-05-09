const express = require("express");

const Site = require("../model/site");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


router.post("/sites",  checkAuth,(req, res, next) => {


    const site = new Site({
        nom: req.body.nom,
        longitude : parseFloat(req.body.longitude),
        latitude : parseFloat(req.body.latitude),
        _regionId:req.body._regionId,
        isdmr : req.body.isDMR

    })
    site.save().then(createdSite => {
        res.status(201).json({
            message: "Site added successfully",
            siteId: createdSite._id
        });
    });
});
router.get("/sites", (req, res, next) => {
    Site.find().then(documents => {
        res.status(200).json({
            message: "Sites fetched successfully!",
            sites: documents
        })
    }) .catch(err=>{
        res.status(500).json({
            err: err
        })
    });


});

router.get('/sites/:id',(req,res)=> {
    Site.findOne({_id: req.params.id}, (err, document) => {
        if (err) res.status(500).send(err);
        else if (!document) res.status(404).send(`site with id ${req.params.id} not found`)
        else {
            res.status(200).json({
                message: 'region fitched successfully',
                site: document
            })
        }
    })
})
module.exports = router;
