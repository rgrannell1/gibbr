
"use strict"




const seedrandom = require('seedrandom')




const random = { }




random.fromCharSet = (charset, len) => {

	const out = [ ]

	for (let ith = 0; ith < len; ++ith) {
		out[ith] = charset[ Math.floor(random.number( ) * charset.length) ]
	}

	return out.join('')

}

const rng = seedrandom.xor4096( )

random.number = ( ) => {
	return rng( )
}




module.exports = random
