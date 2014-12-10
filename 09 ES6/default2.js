module.exports = 
	(start, repeatCount = start.length) => 
		`${start}${"!".repeat(repeatCount)}`;