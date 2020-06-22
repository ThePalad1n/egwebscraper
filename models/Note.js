var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = mongoose.Schema({
	body: String,
	article: Schema.Types.ObjectId,
		// ref: "Article"
});


var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;