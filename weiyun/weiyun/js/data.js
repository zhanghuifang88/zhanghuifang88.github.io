
/*
	第一层的id为 0
	
	每一个文件是一个对象，这个对象包含的是一个文件的信息

	{
		id:0,          文件的id
		pid:-1,        父数据的id
		title:"微云",  文件的名
		type:"file"    文件的类型
	}

*/



var data = {
	files:[
		{
			id:0,
			pid:-1,
			title:"微云",
			type:"file"
		},
		{
			id:1,
			pid:0,
			title:"我的文档",
			type:"file"
		},
		{
			id:600000,
			pid:0,
			title:"我的视频",
			type:"file"
		},
		{
			id:2,
			pid:0,
			title:"我的音乐",
			type:"file"
		},
		{
			id:3,
			pid:2,
			title:"周杰伦",
			type:"file"
		},
		{
			id:4000,
			pid:2,
			title:"王杰",
			type:"file"
		},
		{
			id:4,
			pid:3,
			title:"发如雪",
			type:"file"
		},
		{
			id:600,
			pid:3,
			title:"夜曲",
			type:"file"
		},
		{
			id:3000,
			pid:0,
			title:"我的相册",
			type:"file"
		},
		{
			id:9000,
			pid:3000,
			title:"初中时代"
		},
		{
			id:8000,
			pid:3000,
			title:"高中时代"
		},
		{
			id:984744,
			pid:3000,
			title:"大学时代"
		},
		{
			id:920485,
			pid:3000,
			title:"亲人"
		}
	]
}