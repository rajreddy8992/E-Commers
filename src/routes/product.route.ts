
const productController = require("../Controller/product.controller");

router.post("/product", productController.productDetails);

module.exports = router;
