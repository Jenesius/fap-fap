// getting-started.js
const mongoose = require('mongoose');

main()
.then(() => {
	console.log('Connected.')
})
.catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb://localhost:27017/fapfap');
}
