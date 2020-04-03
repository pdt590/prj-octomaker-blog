exports.ids=[8],exports.modules={58:function(t,e,o){"use strict";o.d(e,"a",(function(){return n})),o.d(e,"b",(function(){return d}));const n=[{id:"iot",name:"IoT",icon:"broadcast-tower"},{id:"ai",name:"AI",icon:"robot"},{id:"web",name:"Web",icon:"file-code"},{id:"misc",name:"Misc",icon:"comment-dots"}],d=["An Giang","Bà Rịa–Vũng Tàu","Bắc Giang","Bắc Kạn","Bạc Liêu","Bắc Ninh","Bến Tre","Bình Định","Bình Dương","Bình Phước","Bình Thuận","Cà Mau","Cần Thơ","Cao Bằng","Đà Nẵng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Nội","Hà Tĩnh","Hải Dương","Hải Phòng","Hậu Giang","Hồ Chí Minh","Hòa Bình","Hưng Yên","Khánh Hòa","Kiên Giang","Kon Tum","Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Phú Yên","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La","Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên–Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái"]},79:function(t,e,o){"use strict";o.r(e);var n=o(14),d=o(58),l=o(57),r=o(3),h=o(19),c=o.n(h),m={middleware:["server-client-auth"],created(){},computed:{...Object(n.mapGetters)({loadedPost:"post/loadedPost",postLoading:"post/postLoading"}),simplemde(){return this.$refs.editor.simplemde},postImages(){return this.loadedPost&&this.loadedPost.images?this.loadedPost.images:[]}},data:()=>({categories:d.a,postTitle:"",postContent:{category:"iot",tags:["code"],mode:"private",markdown:"",html:""},isTitleAdded:!1,loadEvent:""}),validations:{postTitle:{required:l.required},postContent:{category:{required:l.required},tags:{required:l.required}}},methods:{async onChangeTitle(){this.loadEvent="onChangeTitle",this.$v.postTitle.$touch(),this.$v.postTitle.$invalid||(this.isTitleAdded?await this.$store.dispatch("post/updatePostTitle",this.postTitle):(await this.$store.dispatch("post/addPostTitle",this.postTitle),!this.postLoading&&(this.isTitleAdded=!0))),this.postLoading&&(this.$store.commit("post/setPostLoading",!1),this.$buefy.toast.open({duration:3e3,message:"onChangeTitle() Error",type:"is-danger"})),this.loadEvent=""},async onBlur(){this.postContent.html=c()(this.postContent.markdown,{renderer:Object(r.l)()}),await this.$store.dispatch("post/addPostContent",this.postContent),this.postLoading&&this.$store.commit("post/setPostLoading",!1)},async onPublish(){if(this.loadEvent="onPublish",this.postContent.html=c()(this.postContent.markdown,{renderer:Object(r.l)()}),await this.$store.dispatch("post/addPostContent",this.postContent),this.postLoading)this.$store.commit("post/setPostLoading",!1),this.$buefy.toast.open({duration:3e3,message:"onPublish() Error",type:"is-danger"});else{const t=this.loadedPost.url;this.$router.push(this.localePath(`/posts/${t}`))}this.loadEvent=""},onDelete(){this.$buefy.dialog.confirm({title:this.$t("new_post.dialog.title"),message:this.$t("new_post.dialog.message"),confirmText:this.$t("new_post.dialog.confirm_text"),cancelText:this.$t("new_post.dialog.cancel_text"),type:"is-danger",hasIcon:!0,onConfirm:async()=>{await this.$store.dispatch("post/deletePost"),this.postLoading?(this.$store.commit("post/setPostLoading",!1),this.$buefy.toast.open({duration:3e3,message:"onDiscard() Error",type:"is-danger"})):this.$router.push(this.localePath("/"))}})}},head(){return{title:this.$t("new_post.head.title")}}},v=o(4),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"_fullscreen"},[t._ssrNode('<div class="container">',"</div>",[o("b-field",{attrs:{grouped:""}},[o("b-field",{attrs:{type:t.$v.postTitle.$error?"is-danger":"",expanded:""}},[o("b-input",{attrs:{placeholder:t.$t("new_post.title_placeholder"),type:"text",icon:"newspaper",loading:t.postLoading&&"onChangeTitle"===t.loadEvent},on:{blur:t.onChangeTitle},model:{value:t.postTitle,callback:function(e){t.postTitle=e},expression:"postTitle"}})],1),t._v(" "),o("b-field",{attrs:{expanded:""}},[o("b-select",{attrs:{placeholder:t.$t("new_post.category_placeholder"),expanded:"",disabled:t.$v.postTitle.$invalid||!t.isTitleAdded,icon:"list"},model:{value:t.postContent.category,callback:function(e){t.$set(t.postContent,"category",e)},expression:"postContent.category"}},t._l(t.categories,(function(e,i){return o("option",{key:i,domProps:{value:e.id}},[t._v(t._s(e.name))])})),0)],1)],1),t._ssrNode(" "),o("b-field",[o("b-taginput",{attrs:{placeholder:t.$t("new_post.tag_placeholder"),maxtags:"3","has-counter":!1,disabled:t.$v.postTitle.$invalid||!t.isTitleAdded,icon:"tag"},model:{value:t.postContent.tags,callback:function(e){t.$set(t.postContent,"tags",e)},expression:"postContent.tags"}})],1),t._ssrNode(" "),o("b-field",[o("client-only",{attrs:{placeholder:"Loading ..."}},[o("v-editor",{ref:"editor",attrs:{images:t.postImages,disabled:t.$v.postTitle.$invalid||t.$v.postContent.$invalid,location:"new-post"},on:{blur:t.onBlur},model:{value:t.postContent.markdown,callback:function(e){t.$set(t.postContent,"markdown",e)},expression:"postContent.markdown"}})],1)],1),t._ssrNode(" "),t._ssrNode('<div class="level">',"</div>",[t._ssrNode('<div class="level-left">',"</div>",[t._ssrNode('<div class="block">',"</div>",[o("b-radio",{attrs:{type:"is-info","native-value":"public",disabled:t.$v.postTitle.$invalid||!t.isTitleAdded},model:{value:t.postContent.mode,callback:function(e){t.$set(t.postContent,"mode",e)},expression:"postContent.mode"}},[t._v(t._s(t.$t("new_post.public_radio")))]),t._ssrNode(" "),o("b-radio",{attrs:{type:"is-info","native-value":"private",disabled:t.$v.postTitle.$invalid||!t.isTitleAdded},model:{value:t.postContent.mode,callback:function(e){t.$set(t.postContent,"mode",e)},expression:"postContent.mode"}},[t._v(t._s(t.$t("new_post.private_radio")))])],2)]),t._ssrNode(' <div class="level-right"><button type="submit"'+t._ssrAttr("disabled",t.$v.postTitle.$invalid||t.$v.postContent.$invalid)+t._ssrClass("level-item button is-info is-outlined",{"is-loading":t.postLoading&&"onPublish"===t.loadEvent})+">"+t._ssrEscape("\n          "+t._s(t.$t("new_post.publish_btn"))+"\n        ")+"</button> <button"+t._ssrAttr("disabled",t.$v.postTitle.$invalid||t.$v.postContent.$invalid)+' class="level-item button is-info is-outlined">'+t._ssrEscape("\n          "+t._s(t.$t("new_post.delete_btn"))+"\n        ")+"</button></div>")],2)],2)])}),[],!1,null,null,"bcaffca0");e.default=component.exports}};