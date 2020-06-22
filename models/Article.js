var mongoose = require('mongoose');
var Note = require('./Note');

var Schema = mongoose.Schema;

var ArticleSchema = mongoose.Schema({
	title: String,
	summary:String,
	link: String,
	saved: Boolean,
	notes: Schema.Types.ObjectId
		// ref:"Note"
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;