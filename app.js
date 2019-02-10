var express = require("express");
var app = express();
var EMXPuzzle = require('./app/Models/EMXPuzzle');

let QAmap = new Map();
QAmap.set('Ping', 'OK');
QAmap.set('Name', 'Jin Hou');
QAmap.set('Email Address', 'jinphou@gmail.com');
QAmap.set('Phone', '312-877-0261');
QAmap.set('Position', 'Software Engineer');
QAmap.set('Years', '4');
QAmap.set('Referrer', 'Linkedin');
QAmap.set('Degree', 'BA');
QAmap.set('Resume', 'https://drive.google.com/file/d/1Xkf81OzaRZ9WFtV9VZ4G0ZeqIPNHiZjN/view?usp=sharing');
QAmap.set('Source', 'github');
QAmap.set('Status', 'Yes');

function getAnswer(query) {
	if (query.q === 'Puzzle') {
		let arry = query.d.split('\n').slice(2, 6);
		let p = new EMXPuzzle(arry);
		return p.getMatrixString();
	}
	return QAmap.get(query.q);
}

app.get("/question", (req, res, next) => {
	res.send(getAnswer(req.query));
 });

app.listen(3000, '0.0.0.0', () => {
	console.log("Server running on port 3000");
});
