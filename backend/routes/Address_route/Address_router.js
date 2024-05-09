const express = require("express");
const router = express.Router();

const {
    getPronvinces,
    getAmphoeByProvinceID,
    getTambonByAmphoeID,
    getAddressesByGeo,
    getNearBKK,
    getAmphoeInBKK
} = require("../../controllers/Address/AddressController");

router.get("/pronvinces", getPronvinces);
router.get("/amphoe/:ProvinceID", getAmphoeByProvinceID);
router.get("/tambon/:AmphoeID", getTambonByAmphoeID);
router.get("/geo/:geocode", getAddressesByGeo);
router.get("/nearbkk", getNearBKK);
router.get("/amphoeinbkk", getAmphoeInBKK);




module.exports = router;
