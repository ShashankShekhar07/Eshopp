const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.createProduct = catchAsyncErrors(async(req,res,next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        status: "success",
        product
    })
})

exports.getAllProducts= catchAsyncErrors(async(req,res)=>{
    const resultPerPage =5;
    const productCount = await Product.countDocuments();
    const ApiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await ApiFeature.query;
    res.status(201).json({
        status: "success",
        productCount,
        products
    })
})

exports.updateProduct = catchAsyncErrors(async(req,res,next)=> {
    let product= await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product Not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        status: "success",
        product
    })
})

exports.deleteProduct =catchAsyncErrors( async(req,res)=> {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Poduct not found"
        })
    }
    // await product.remove();
    await Product.deleteOne({_id: req.params.id} );
    res.status(200).json(
        {
            status: "success",
            message: "Product deleted successfully"
        }
    )
})

exports.getProductDetails =catchAsyncErrors( (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  }))