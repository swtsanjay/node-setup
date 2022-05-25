const ToData = (req, res, next) => {
	if (req.method === 'GET') {
		req.data.params = { ...req.query, ...req.params, ...req.data.params };
	} else {
		req.data.params = { ...req.body, ...req.params, ...req.data.params };
	}

	next();
};

module.exports = ToData;