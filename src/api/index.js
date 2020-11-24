import request from '@/utils/request'

//   注意：这里需要登陆的接口都需加上参数auth:true



//传进来的是国际时间转换时间格式, 传入的是十三位的时间戳或者utc	2020-02-15T09:48:38.685Z
export function dataType(payload) {
    const dateMat = new Date(payload);
    const year = dateMat.getFullYear();
    var month = dateMat.getMonth() + 1;
    if (month < 10) {
        month = "0" + month
    }
    var day = dateMat.getDate();
    if (day < 10) {
        day = "0" + day
    }
    var hh = dateMat.getHours();
    if (hh < 10) {
        hh = "0" + hh
    }
    var mm = dateMat.getMinutes();
    if (mm < 10) {
        mm = "0" + mm
    }
    var ss = dateMat.getSeconds();
    if (ss < 10) {
        ss = "0" + ss
    }
    var timeFormat =
        year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
    return timeFormat;
}


//获取轮播图
export function banner() {
    return request({
        url: "/banner",
        method: 'get'
    })
}


export function Personal(payload) {
    return request({
        url: "/personalized",
        method: 'get',
        params: {
            // auth: true
        }

    })
}
//获取精选碟
export function playlist(payload) {
    return request({
        url: "/top/playlist",
        method: 'get',
        params: {
            ...payload
        }
    })
}


//个性化推荐     需要登录
export function resource(payload) {
    return request({
        url: "/recommend/resource",
        method: 'get',

    })
}

//新碟上架 首页
export function newAlbum(payload) {
    return request({
        url: "/album/newest",
        method: 'get',
        params: {
            ...payload
        }
    })
}

//新碟上架 
export function newTopAlbum(payload) {
    return request({
        url: "/top/album",
        method: 'get',
        params: {
            ...payload
        }
    })
}


//新碟详情
export function newAlbumDetail(payload) {
    return request({
        url: "/album",
        method: 'get',
        params: {
            ...payload
        }
    })
}

//所有榜单的摘要主要就是方便查看歌单ID
export function topList(payload) {
    return request({
        url: "/toplist/detail",
        method: 'get',
    })
}

//歌单分类
export function playListCat(payload) {
    return request({
        url: "/playlist/catlist",
        method: 'get',
    })
}

//传参选择歌单类型
export function playListCats(payload) {
    return request({
        url: "/top/playlist",
        method: 'get',
        params: {
            ...payload
        }
    })
}

//获取歌单详情
export function playlistDetail(payload) {
    return request({
        url: "/playlist/detail",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}


//毫秒变分钟
export function millisToMinutesAndSeconds(millis) {

    var hours = Math.floor(millis / (60000 * 60))
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (hours > 0 ? minutes : '') + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' : '') + seconds;
}

//查看音乐是否可用
export function AuthSongId(payload) {
    return request({
        url: "/check/music",
        method: 'get',
        params: {
            id: payload,
            auth: true
        }
    })
}

//获取歌曲详情  说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
export function SongDetail(payload) {
    return request({
        url: "/song/detail",
        method: 'get',
        params: {
            ids: payload,
            auth: true
        }
    })
}

//获取音乐详情，获取连接，播放音乐
export function PlayOneSong(payload) {
    return request({
        url: "/song/url",
        method: 'get',
        params: {
            id: payload,
            auth: true
        }
    })
}

//获取歌词，需要音乐 
export function SongLyric(payload) {
    return request({
        url: "/lyric",
        method: 'get',
        params: {
            id: payload,
            auth: true
        }
    })
}

//歌手排行榜首页
export function SingerLeader(payload) {
    return request({
        url: "/toplist/artist",
        method: 'get',

    })
}

//歌手分类
export function CatSingers(payload) {
    return request({
        url: "/artist/list",
        method: 'get',
        params: {
            ...payload
        }
    })
}

//获取歌手单曲  说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲

export function SingersOne(payload) {
    return request({
        url: "/artists",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}


//获取歌手的MV
export function SingersAlbum(payload) {
    return request({
        url: "/artist/album",
        method: 'get',
        params: {
            ...payload
        }
    })
}

//获取歌手的MV
export function SingersMv(payload) {
    return request({
        url: "/artist/mv",
        method: 'get',
        params: {
            ...payload
        }
    })
}
//获取歌手的MV地址
export function MvUrl(payload) {
    return request({
        url: "/mv/url",
        method: 'get',
        params: {
            ...payload
        }
    })
}



//获取MV数据
export function MvData(payload) {
    return request({
        url: "/mv/detail",
        method: 'get',
        params: {
            ...payload
        }
    })
}

//获取歌手描述
export function SingersDesc(payload) {
    return request({
        url: "/artist/desc",
        method: 'get',
        params: {
            ...payload
        }
    })
}


//搜索建议，就是搜索的时候，下面弹出的列表/search/suggest?keywords= 海阔天空 /search/suggest?keywords= 海阔天空&type=mobile

export function SearchSug(payload) {
    return request({
        url: "/search/suggest",
        method: 'get',
        params: {
            "keywords": payload
        }
    })
}


//默认搜索关键词
export function DefSearch(payload) {
    return request({
        url: "/search/default",
        method: 'get',
    })
}
//热搜列表（简单）
export function HotSearch(payload) {
    return request({
        url: "/search/hot",
        method: 'get',
    })
}





//说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
export function Search(payload) {
    return request({
        url: "/search",
        method: 'get',
        params: {
            ...payload
        }
    })
}


//获取歌曲评论，包括精彩评论和最新评论
export function MusicComment(payload) {
    return request({
        url: "/comment/music",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}



//获取歌单评论，包括精彩评论和最新评论
export function PlayListComment(payload) {
    return request({
        url: "/comment/playlist",
        method: 'get',
        params: {
            ...payload
        }
    })
}



//获取专辑评论，包括精彩评论和最新评论
export function AlbumComment(payload) {
    return request({
        url: "/comment/album",
        method: 'get',
        params: {
            ...payload
        }
    })
}


//获取mv评论，包括精彩评论和最新评论
export function MvComment(payload) {
    return request({
        url: "/comment/mv",
        method: 'get',
        params: {
            ...payload
        }
    })
}








/*登录篇 */

// 手机登录
export function Login(payload) {
    return request({
        url: "/login/cellphone",
        method: 'get',
        params: {
            ...payload
        }
    })
}

//获取我的歌单
export function UserPlaylist(payload) {
    return request({
        url: "/user/playlist",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}



//给评论点赞
export function CommentLike(payload) {
    return request({
        url: "/comment/like",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}
//给评论取消点赞
export function CommentUnLike(payload) {
    return request({
        url: "/comment/like",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}
//给评论回复
export function ReplyComment(payload) {
    return request({
        url: "/comment",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}

//收藏/取消歌单
export function SubPlaylist(payload) {
    return request({
        url: "/playlist/subscribe",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}

//收藏/取消  歌手
export function SubArtist(payload) {
    return request({
        url: "/artist/sub",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}


//收藏/取消  MV
export function SubMv(payload) {
    return request({
        url: "/mv/sub",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}


//收藏/取消  专辑
export function SubAlbum(payload) {
    return request({
        url: "/album/sub",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}



//喜欢音乐
export function LoveMusic(payload) {
    return request({
        url: "/like",
        method: 'get',
        params: {
            ...payload,
            auth: true
        }
    })
}




//下载音乐  需要传入音乐ID
export function DownLoadMusic(payload) {
    return request({
        url: "/download",
        method: 'get',
        params: {
            "id": payload
        }
    })
}