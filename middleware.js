let Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const{listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn =(req, res, next)=> {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
};

//  module.exports.saveRedirectUrl =(req, res, next)=> {
//     if(req.session.redirectUrl){
//       req.locals.redirectUrl = req.originalUrl;
//     }
//     next();
//  };

module.exports.isOwner = async(req, res, next)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if(!listing){
      req.flash("error","Listing not found");
      return res.redirect("/listiings");
    }
    if(!listing.owner || !listing.owner._id || !res.locals.currUser || !res.locals.currUser._id){
      req.flash("error","Unauthorized access");
       return res.redirect(`/listings/${id}`);
    }
   if(!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error","You are not the owner of this listing");
     return res.redirect(`/listings/${id}`);
   }
   next();

};

module.exports.validateListing =(req,res,next) => {
  let {error} = listingSchema.validate(req.body);
  
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  }else{
    next();
  }
};

module.exports.validateReview =(req,res,next) => {
  let {error} =reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  }else{
    next();
  }
};

module.exports.isReviewAuthor = async(req, res, next)=>{
 let{id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)) {
    req.flash("error","You are not the author of this review");
     return res.redirect(`/listings/${id}`);
   }
   next();

};
