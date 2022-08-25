// calculate a^b % m
const moduloExp = (a, b, m) => {
	let s = 1;
	let r = a;
	while (b > 0){
		let tmp = b & 1;
		if (tmp == 1) {
			s= (s * r) % m;
		}
		r = (r * r) % m;
		b = b >> 1;
	}
	return s;
}

function test() {
	var p = 191;
	var g = 17;

	var a = 13; // the secret
	var pkA = moduloExp(g, a, p);
	console.log('public key=', pkA);

	var k = 2423;
	var h = moduloExp(g, k, p);
	console.log('h=', h);

	var c = 15;
	var s = a*c+k;
	console.log('s=', s);
	
	var isValid = moduloExp(g, s, p) == (moduloExp(pkA, c, p) * h) % p;
	console.log('Verifying: ', isValid);
}