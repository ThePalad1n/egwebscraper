var Article = require('../models/Article');
var cheerio = require("cheerio");
var request = require('request');
var exphbs = require('express-handlebars');
const { Mongoose } = require('mongoose');


module.exports = (app) => {

app.get("/", function(req,res){
	Article.find({"saved": false}).limit(20).exec(function(error,data){
		var hbsObject = {
			article: data
		};
		console.log(hbsObject);
		res.render("home", hbsObject);
	});
});

app.get("/saved", function(req,res){
	Article.find({"saved": true}).populate("notes").exec(function(error, articles){
		var hbsObject = {
			article: articles
		};
		res.render("saved", hbsObject);
	});
});

app.get("/scrape", function(req,res){
	request("https://www.nytimes.com/", function(error,response, html){
		var $ = cheerio.load(html);
		$("article").each(function(i,element){
			var result = {};
			result.title = $(this).children("h2").text();
			result.summary = $(this).children(".summary").text();
			result.link = $(this).children("h2").children("a").attr("href");

			var entry = new Article(result);

			entry.save(function(err, doc){
				if(err){
					console.log(err);
				}
				else{
					console.log(doc);
				}
			});
		});
		res.send("Scrape Complete");
	});
});

app.get("/articles", function(req,res){
	Article.find({}).limit(20).exec(function(error, doc){
		if(error){
			console.log(error);
		}
		else{
			res.json(doc);
		}
	});
});

app.get("/articles/:id", function(req,res){
	Article.findOne({ "_id": req.params.id})
	.populate("note")
	.exec(function(error, doc){
		if(error){
			console.log(error);
		}
		else{
			res.json(doc);
		}
	});
});

// app.post("/scrape", (req,res,next) => {
// 	const article = new Article({
// 		_id: new Mongoose.Types.ObjectId(),
// 		title: req.body.title,
// 		summary: req.body.summary,
// 		link: req.body.link
// 	})
// })

app.post("/articles/save/:id", function(req,res){
	Article.findOneAndUpdate({ "_id": req.params.id}, {"saved": true})
	.exec(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.send(doc);
		}
	});
});

app.post("/articles/delete/:id", function(req,res){
	Article.findOneAndUpdate({ "_id": req.params.id}, {"saved": false, "notes":[]})
	.exec(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.send(doc);
		}
	});
});
}