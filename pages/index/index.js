//index.js
//获取应用实例

var app = getApp()
var utils = require('../../utils/util.js')
var flag = true;
var type_t = 'found'
var serverName = app.globalData.serverName
var image_root_path = serverName +"/"
var Category = ['所有', '校园卡', '雨伞', '钱包']
Page({
  data: {
    swiper_url: [
      '../../images/index/swiper/1.jpg',
      '../../images/index/swiper/2.jpg',
      '../../images/index/swiper/3.jpg',
      '../../images/index/swiper/4.jpg'
    ],
    listofitem: [],
    listfound: [{ header: ' ' }],
    listlost: [{ header: ' ' },],
    cur_type:'所有',
    activeIndex:1,
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    refresh:0,
    plain: false,
    actionSheetHidden: true,
    actionSheetItems: Category


  },
  search: function (event) {
    wx.navigateTo({
      url: "../search/search"
    })
  },
  bind所有: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '所有',
      listofitem:[]
    })
    this.show_publish_infos(this.data.type_t, this.data.cur_type, this)
  },
  bind校园卡: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '校园卡',
      listofitem: []})
    this.show_publish_infos(this.data.type_t, this.data.cur_type, this)
  },
  bind钱包: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '钱包',
      listofitem: []
    })
    this.show_publish_infos(this.data.type_t, this.data.cur_type, this)
  },
  bind雨伞: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      cur_type: '雨伞',
      listofitem: []
    })
    this.show_publish_infos( this.data.type_t, this.data.cur_type, this)
  },
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  //事件处理函数
  refresh: function (e){
    while (this.data.listfound.length != 1)
      this.data.listfound.pop();
    console.log('清空');
    console.log(this.data.listfound);
    while (this.data.listlost.length != 1)
      this.data.listlost.pop();
    console.log(this.data.listlost);
    var that = this;
    console.log(this.data.activeIndex);
    this.index = 1
    if(this.data.activeIndex==1)
    this.setData({
      listofitem: this.data.listfound,
      cur_type: '所有'

    })
    else
      this.setData({
        listofitem: this.data.listlost,
              cur_type: '所有'
      })

    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    this.show_publish_infos(this.type_t, '所有', this)
  } ,

  stateswitch: function (e) {
    var that = this;
    var type = e.target.dataset.index;
    if (type == 0) {
      this.setData({
        listofitem: this.data.listlost,
        activeIndex:type,
        type_t:'lost',
        cur_type:'所有'
      })
      flag = false;

    }
    else {
      this.setData({
        listofitem: this.data.listfound,
        activeIndex: type,
        type_t:'found',
        cur_type: '所有'
      })
      flag = true;
    }
    this.show_publish_infos(this.data.type_t, this.data.cur_type, this)
    //console.log(that.data.publish_data);
  },

  bindViewTap: function (e) {

  },

  loadMore: function (e) {
  },
  getNextDate: function () {
    var now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  Loadmsg: function () {
    var that = this;
    while (this.data.listfound.length != 1)
      this.data.listfound.pop();
    while (this.data.listlost.length != 1)
      this.data.listlost.pop();
    var i = 0;
    for (i = 0; i < that.data.publish_data.length; i++) {
      var nickName = that.data.publish_data[i].nickName;
      var Msg = that.data.publish_data[i].msg;
      var user_id = that.data.publish_data[i].user_id;
      var Submission_time = that.data.publish_data[i].submission_time.substring(5, that.data.publish_data[i].submission_time.length - 3);
      var imageurl = '';
      var user_icon = that.data.publish_data[i].avatarUrl;
      // var nick_name = that.data.publish_data[i].nickName,
      // var avatarUrl = that.data.publish_data[i].avatarUrl,
      if (that.data.publish_data[i].image_exist == "1")
        imageurl = image_root_path + that.data.publish_data[i].image_url[0];
      if (that.data.publish_data[i].type == 'found')
        this.data.listfound.push({
          userid:user_id,username: nickName, text: Msg, image: imageurl, usericon: user_icon, sub_time: Submission_time
        })
      else
        this.data.listlost.push({ username: nickName, text: Msg, image: imageurl, usericon: user_icon, sub_time: Submission_time });
    }
    if (this.data.activeIndex == 1)
      this.setData({
        listofitem: this.data.listfound
      })
    else this.setData({
      listofitem: this.data.listlost
    })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
   // this.onLoad
  },
  onPullDownRefresh: function () {
    this.onload;
    this.refresh();
  },

  onLoad: function () {
    while(this.data.listfound.length!=1)
      this.data.listfound.pop();
    console.log('清空');
    console.log(this.data.listfound);
    while (this.data.listlost.length!= 1)
      this.data.listlost.pop();
    console.log(this.data.listlost);
    var that = this;

    this.index = 1
    if (this.data.activeIndex == 1)
    this.setData({
      listofitem: this.data.listfound
    })
    else this.setData({
      listofitem: this.data.listlost
    })

    
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    this.show_publish_infos('found', '所有', this)
    console.log(this.data)
  },
  
  //获取发布信息的接口，传入分类数据
  show_publish_infos: function(type_t, category,obj){
    wx.request({
      url: serverName + '/index/index_publish_info.php',
      data: {
        type_t: type_t,
        category: category,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        obj.setData({
          publish_data: res.data

        })
        console.log('当前数据库返回的publish记录')
        console.log(obj.data.publish_data)
        obj.Loadmsg()
      }
    })

  },
})
