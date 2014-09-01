var fs = require('fs')
var util = require('util')
var jsonld = require('jsonld')

var input = require('./input.json')
var context = require('./context.json')
input['@context'] = context

function inspect(err, data) {
	if (err) console.error(err)
	else console.log(util.inspect(data, false, 32, true))

	fs.writeFileSync('./output.json', util.inspect(data, false, 32))
}

var Post = {
	//insertedTime: {},
	category: {
		'@explicit': true,
		id: {},
		//name: {},
	},
	city: {
		'@explicit': true,
		englishName: {},
		//name: {},
	},
	areaNames: { '@container': '@list' },
	'具体地点': {},
}
var CpmPost = Object.create(Post)
CpmPost.cpmSign = {}

var frame = {
	'@context': context,
	//'@type': {},
	//pinnedPosts: Post,
	//regularPosts: Post,
	//cpmPosts: CpmPost,
}

//console.log(JSON.stringify(Post))
jsonld.flatten(input, {
	"xsd": "http://www.w3.org/2001/XMLSchema#",
	"bx": "http://graph.baixing.com/vocab/",
	"pinnedPosts": {
		"@id": "bx:pinned-posts",
		"@container": "@list"
	},
	"cpmPosts": {
		"@id": "bx:smart-posts",
		"@container": "@list"
	},
	"regularPosts": {
		"@id": "bx:regular-posts",
		"@container": "@list",
		'@type': '@id',

	},
	"id": "bx:id",
	"englishName": "bx:englishName",
	"title": "bx:title",
	"content": "bx:content",
	"createdTime": "bx:createdTime",
	"imageFlag": "bx:imageFlag",
	"images": {"@id": "bx:images", "@container": "@list"},
	"category": {'@id':'bx:Category',  '@embeded': false},
	"city": "bx:City",
	"areaNames": "bx:areaNames",
	"urgent": {"@id": "bx:urgent" },
	"cpmSign": "bx:cpmSign"	
}, inspect)
//jsonld.frame(input, frame, {}, inspect)