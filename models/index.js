var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beer');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var beerSchema = mongoose.Schema({
	drinker: {type: String},
	brand: {type: String, required: true},
	name: {type: String, required: true, unique: true}
});

// beerSchema.virtual('tagLine').get(function() {
// 	return this.brand+" is what's for dinner!";
// })

var drinkerSchema = mongoose.Schema({
	personName: {type: String, required: true},
	beer: {type: mongoose.Schema.Types.ObjectId, ref: 'Beer'},
	beerName: {type: String, required: true}
})

drinkerSchema.pre('validate', function(next) {
	var that = this;
	Beer.findOne({name: this.beerName}).then(function (beerMatch) {
		console.log('beerMatched:' + beerMatch);
		that.beer = beerMatch._id;
		console.log('beer:', that.beer);
		next();
	});
})

var Beer = mongoose.model('Beer', beerSchema);
var Drinkers = mongoose.model('Drinkers', drinkerSchema);



module.exports = {
	Beer: Beer,
	Drinkers: Drinkers
}

// Beer.add{brand: Budweiser, name: Budlite}).then(function(), function())





























// var mongoose = require('mongoose');
// var marked = require('marked');
// mongoose.connect('mongodb://localhost/wikistack');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'mongodb connection error: '));

// var pageSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     urlTitle: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['open', 'closed']
//     },
//     date:     {
//         type: Date,
//         default: Date.now
//     },
//     author:   {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     tags: {
//         type: [String]
//     }
// });

// pageSchema.virtual('route').get(function () {
//     return '/wiki/' + this.urlTitle;
// });

// pageSchema.virtual('renderedContent').get(function () {
//     return marked(this.content);
// });

// pageSchema.pre('validate', function (next) {
//     if (this.title) {
//         this.urlTitle = this.title.replace(/\s/g, '_').replace(/\W/g, '');
//     } else {
//         this.urlTitle = Math.random().toString(36).substring(2, 7);
//     }
//     next();
// });

// pageSchema.statics.findByTag = function (tag) {

//     return Page.find({
//         tags: {
//             $in: [tag]
//         }
//     }).exec();

// };

// pageSchema.methods.findSimilar = function () {

//     return Page.find({
//         tags: {
//             $in: this.tags
//         },
//         _id: {
//             $ne: this._id
//         }
//     }).exec();

// };

// var userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }
// });

// userSchema.statics.findOrCreate = function (userInfo) {

//     var self = this;

//     return this.findOne({ email: userInfo.email }).exec()
//         .then(function (user) {
//             if (user === null) {
//                 return self.create(userInfo);
//             } else {
//                 return user;
//             }
//         });

// };

// var Page = mongoose.model('Page', pageSchema);
// var User = mongoose.model('User', userSchema);

// module.exports = {
//     Page: Page,
//     User: User
// };