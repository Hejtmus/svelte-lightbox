export const manifest = {
	appDir: "_app",
	assets: new Set([".nojekyll","bootstrap.css","bootstrap.css.map","bootstrap.min.css","bootstrap.min.css.map","favicon.png","img/test1.png","img/test2.png","img/test3.png"]),
	mimeTypes: {".css":"text/css",".map":"application/json",".png":"image/png"},
	_: {
		entry: {"file":"start-d854f25f.js","js":["start-d854f25f.js","chunks/index-93e59907.js","chunks/index-df832915.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
