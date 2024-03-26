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

exports.getAllProducts= catchAsyncErrors(async(req,res,next)=>{
  // return next(new ErrorHander("This is my temp error",500));
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const ApiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await ApiFeature.query;
    res.status(201).json({
        status: "success",
        productsCount,
        products,
        resultPerPage,
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

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } 
    else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    // console.log(req.query.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });

  exports.deleteReview = catchAsyncErrors(async(req,res,next) => {
    const product= await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHander("Product Not found",404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString()!==req.query.id)

    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success:true,
    })
  })