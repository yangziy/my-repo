
function getBounds (arr, dim) {
	if (!arr || arr.length == null) throw Error('Argument should be an array')

	if (dim == null) dim = 1
	else dim = Math.floor(dim)

	var bounds = Array(dim * 2)

	for (var offset = 0; offset < dim; offset++) {
		var max = -Infinity, min = Infinity, i = offset, l = arr.length;

		for (; i < l; i+=dim) {
			if (arr[i] > max) max = arr[i];
			if (arr[i] < min) min = arr[i];
		}

		bounds[offset] = min
		bounds[dim + offset] = max
	}

	return bounds;
}

function normalize (arr, dim, bounds) {
	if (!arr || arr.length == null) throw Error('Argument should be an array')

	if (dim == null) dim = 1
	if (bounds == null) bounds = getBounds(arr, dim)

	for (var offset = 0; offset < dim; offset++) {
		var max = bounds[dim + offset], min = bounds[offset], i = offset, l = arr.length, range;

		if (max === Infinity && min === -Infinity) {
			for (i = offset; i < l; i+=dim) arr[i] = arr[i] === max ? 1 : arr[i] === min ? 0 : .5
		}
		else if (max === Infinity) {
			for (i = offset; i < l; i+=dim) arr[i] = arr[i] === max ? 1 : 0
		}
		else if (min === -Infinity) {
			for (i = offset; i < l; i+=dim) arr[i] = arr[i] === min ? 0 : 1
		}
		else if (min === max) {
			for (i = offset; i < l; i+=dim) if (!isNaN(arr[i])) arr[i] =  .5
		}
		else if (min === 0) {
			for (i = offset; i < l; i+=dim) arr[i] = arr[i] / max
		}
		else {
			for (i = offset, range = max - min; i < l; i+=dim) arr[i] = (arr[i] - min) / range
		}
	}

	return arr;
}