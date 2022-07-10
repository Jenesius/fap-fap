// getting-started.js
const mongoose = require('mongoose');

main()
.then(() => {
	console.log('Connected.')
})
.catch(err => console.log(err));

async function main() {
	const url = process.env.MONGO_URL ?
		process.env.MONGO_URL :
		'mongodb://localhost:27017';
	console.log('Mongo url:', url);		
	await mongoose.connect(url + '/fapfap');
}
