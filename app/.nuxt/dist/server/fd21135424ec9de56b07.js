exports.ids=[19],exports.modules={52:function(n,t,e){"use strict";e.d(t,"a",(function(){return r})),e.d(t,"b",(function(){return o}));const r=[{id:"iot",name:"IoT",icon:"broadcast-tower"},{id:"ai",name:"AI",icon:"robot"},{id:"web",name:"Web",icon:"file-code"}],o=["An Giang","Bà Rịa–Vũng Tàu","Bắc Giang","Bắc Kạn","Bạc Liêu","Bắc Ninh","Bến Tre","Bình Định","Bình Dương","Bình Phước","Bình Thuận","Cà Mau","Cần Thơ","Cao Bằng","Đà Nẵng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Nội","Hà Tĩnh","Hải Dương","Hải Phòng","Hậu Giang","Hồ Chí Minh","Hòa Bình","Hưng Yên","Khánh Hòa","Kiên Giang","Kon Tum","Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Phú Yên","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La","Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên–Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái"]},71:function(n,t,e){"use strict";e.r(t);e(8);var r=e(3),o=e(52),c={name:"v-card-post",props:{value:{type:Object,required:!0}},computed:{postUrl(){return this.value.url},postTitle(){return this.value.title},postMode(){return this.value.mode},postCategory(){return o.a.find(n=>n.id===this.value.category).name},postTags(){return this.value.tags},postDescription(){return Object(r.e)(this.value.html)},postUpdatedDate(){return this.value.updatedDate},postThumbnail(){return this.value.images?this.value.images[0].url:"/icon-photo.png"},creatorAvatar(){return this.value.creator.avatar?this.value.creator.avatar.url:"/icon-user.png"},creatorUsername(){return this.value.creator.username}}},l=e(5),component=Object(l.a)(c,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"card _card"},[n._ssrNode('<div class="card-image _card-image">',"</div>",[e("nuxt-link",{attrs:{to:n.localePath("/posts/"+n.postUrl)}},[e("figure",{staticClass:"image is-4by3"},[e("client-only",[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.postThumbnail,expression:"postThumbnail"}],staticClass:"_thumbnail-image",staticStyle:{display:"none"},attrs:{onload:"this.style.display = 'block'",alt:"post_thumbnail"}})])],1)]),n._ssrNode(" "),n._ssrNode('<figure class="_card-avatar">',"</figure>",[e("client-only",[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.creatorAvatar,expression:"creatorAvatar"}],staticClass:"_creator-avatar",staticStyle:{display:"none"},attrs:{onload:"this.style.display = 'block'",alt:"creator_avatar"}})])],1)],2),n._ssrNode(" "),n._ssrNode('<div class="card-content _card-content">',"</div>",[n._ssrNode('<div class="content">',"</div>",[n._ssrNode('<div class="media"><div class="media-content"><p class="title is-4">'+n._ssrEscape(n._s(n.postTitle))+"</p></div></div> "),n._ssrNode("<p>","</p>",[n._ssrNode(n._ssrEscape("\n        "+n._s(n._f("fmString")(n.postDescription,120))+"\n        ")),n._ssrNode('<span class="_align">',"</span>",[e("b-icon",{attrs:{pack:"far",icon:"clock",size:"is-small"}}),n._ssrNode('\n           \n          <span class="is-size-7">'+n._ssrEscape(n._s(n._f("fmDate")(n.postUpdatedDate)))+"</span>")],2)],2),n._ssrNode(' <div class="tags"><span class="tag is-info is-small">'+n._ssrEscape(n._s(n.postCategory))+"</span> "+n._ssrList(n.postTags,(function(t,e){return'<span class="tag is-warning is-small">'+n._ssrEscape(n._s(t))+"</span>"}))+"</div>")],2)])],2)}),[],!1,null,null,"1cb93c4e");t.default=component.exports}};