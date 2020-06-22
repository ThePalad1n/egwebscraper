var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var NoteSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	body: String,
	article: mongoose.Types.ObjectId,
		// ref: "Article"
});


var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;