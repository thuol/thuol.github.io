// 查看大图
function big_picture(big_pic) {
    var imgsrc = big_pic;
    console.log(imgsrc);
    var opacityBottom = '<div class="opacityBottom" style = "display:none"><img class="bigImg" src="' + imgsrc + '"></div>';
    $(document.body).append(opacityBottom);
    toBigImg();//变大函数
}

function toBigImg() {
    $(".opacityBottom").addClass("opacityBottom");//添加遮罩层
    $(".opacityBottom").show();
    $("html,body").addClass("none-scroll");//下层不可滑动
    $(".bigImg").addClass("bigImg");//添加图片样式
    $(".opacityBottom").click(function () {//点击关闭
        $("html,body").removeClass("none-scroll");
        $(".opacityBottom").remove();
    })
}
let is_photo_data = true
let page = 1  // 第几页
// 初始化加载
$(function () {
    create_page(page)
})
// 监听滑动
$(window).on("resize scroll", function () {
    if(!is_photo_data){
        // console.log('无数据')
        return false
    }

    var windowHeight = $(window).height();//当前窗口的高度
    var scrollTop = $(window).scrollTop();//当前滚动条从上往下滚动的距离
    var docHeight = $(document).height(); //当前文档的高度
    // console.log(scrollTop, windowHeight, docHeight);
    //当 滚动条距底部的距离 + 滚动条滚动的距离 >= 文档的高度 - 窗口的高度
    //换句话说：（滚动条滚动的距离 + 窗口的高度 = 文档的高度）  这个是基本的公式
    if (scrollTop + windowHeight >= docHeight - 15) {
        // console.log("===加载更多数据===", page);
        create_page()
    }
});

// 创造页面初始化数据
function create_page() {
    let data = get_list(page)
    if (data.length > 0) {
        let str = ``;
        for (v of data) {
            // 居中裁剪 ?imageView2/1/w/640/h/480/q/100
            // 缩放不裁剪 ?imageView2/2/w/1920/q/100
            let small_pic = v.url + '?imageView2/1/w/480/h/360/q/80';   //小图
            let big_pic = v.url + '?imageView2/2/w/1920/q/80';         //大图
            str += `<li class="pic_li" onclick="big_picture('${big_pic}')" style="background-image: url('${small_pic}')">
                        <div class="describe">
                            <span class="title">${v.title}</span><br/>
                            <span>ISO：${v.iso}</span><br/>
                            <span>光圈：${v.f}</span>
                            <span style="float: right">${v.equipment}</span><br/>
                            <span>快门：${v.s} s </span>
                            <span style="float: right">${v.time} </span><br/>
                        </div>
                    </li>`
        }

        $("#photo").append(str)
        page += 1
    } else {
        console.log('无数据')
        is_photo_data = false
        $('#is_load').hide()
    }
}

// 获取数据
function get_list(page = 1) {
    console.log('获取第' + page + '页数据')
    // console.log('原始', photo_data)
    const pagesize = 20 // 每页条数

    let start = (page - 1) * pagesize;  // 开始位置
    let end = (page - 1) * pagesize + pagesize;  // 结束位置
    let data = photo_data.slice(start, end);

    // console.log('page', page)
    // console.log('开始位置下标', start)
    // console.log('结束位置下标', end)
    // console.log('分页数据', data)
    return data;

}

