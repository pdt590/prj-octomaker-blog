exports.ids=[17],exports.modules={58:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));const r=[{id:"iot",name:"IoT",icon:"broadcast-tower"},{id:"ai",name:"AI",icon:"robot"},{id:"web",name:"Web",icon:"file-code"},{id:"misc",name:"Misc",icon:"comment-dots"}],o=["An Giang","Bà Rịa–Vũng Tàu","Bắc Giang","Bắc Kạn","Bạc Liêu","Bắc Ninh","Bến Tre","Bình Định","Bình Dương","Bình Phước","Bình Thuận","Cà Mau","Cần Thơ","Cao Bằng","Đà Nẵng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Nội","Hà Tĩnh","Hải Dương","Hải Phòng","Hậu Giang","Hồ Chí Minh","Hòa Bình","Hưng Yên","Khánh Hòa","Kiên Giang","Kon Tum","Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Phú Yên","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La","Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên–Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái"]},82:function(e,t,n){"use strict";n.r(t);var r=n(14),o=n(3),l=n(58),d=n(57),c={middleware:"server-client-auth",created(){this.oldAvatar=this.user.avatar,this.oldEmail=this.user.email,this.oldUserContent={username:this.user.username,fullname:this.user.fullname?this.user.fullname:null,website:this.user.website?this.user.website:null,phone:this.user.phone?this.user.phone:null,address:this.user.address?this.user.address:null,province:this.user.province?this.user.province:"Hà Nội"},this.newUserContent=this.oldUserContent},computed:{...Object(r.mapGetters)({user:"user/user",authLoading:"user/authLoading"}),userAvatarUrl(){return this.user?this.user.avatar?this.user.avatar.url:"/icon-user.png":""},userName(){return this.user?this.user.username:""},isAvatarChanged(){return!!this.user&&(this.user.avatar?!this.oldAvatar:!!this.newAvatar)}},data:()=>({oldUserContent:{},newUserContent:{},provinces:l.b,oldEmail:null,newEmail:null,confirmPasswordForNewEmail:null,newPassword:null,confirmNewPassword:null,confirmPasswordForNewPassword:null,oldAvatar:null,newAvatar:null,previewAvatar:null,acceptedImages:o.a,confirmPasswordForDeleting:null}),validations:{newUserContent:{username:{required:d.required,minLen:Object(d.minLength)(6)},fullname:{},website:{url:d.url},phone:{numeric:d.numeric},address:{}},newEmail:{required:d.required,email:d.email,isChanged:Object(d.not)(Object(d.sameAs)((function(){return this.oldEmail})))},confirmPasswordForNewEmail:{required:d.required,minLen:Object(d.minLength)(6)},confirmPasswordForNewPassword:{required:d.required,minLen:Object(d.minLength)(6)},newPassword:{required:d.required,minLen:Object(d.minLength)(6)},confirmNewPassword:{isValidPassword:Object(d.sameAs)("newPassword")},confirmPasswordForDeleting:{required:d.required,minLen:Object(d.minLength)(6)}},methods:{async onUpdateContent(){await this.$store.dispatch("user/updateUserContent",this.newUserContent),this.authLoading?(this.$store.commit("user/setAuthLoading",!1),this.$buefy.toast.open({duration:3e3,message:"onUpdateContent() Error",type:"is-danger"})):this.$buefy.toast.open({duration:3e3,message:this.$t("profile.info.success_message"),type:"is-success"})},async onUpdateEmail(){await this.$store.dispatch("user/updateUserEmail",{confirmPassword:this.confirmPasswordForNewEmail,newEmail:this.newEmail}),this.authLoading?(this.$store.commit("user/setAuthLoading",!1),this.$buefy.toast.open({duration:3e3,message:"[auth] error",type:"is-danger"})):this.$buefy.toast.open({duration:3e3,message:this.$t("profile.email.announce_message"),type:"is-warning"})},async onUpdatePassword(){await this.$store.dispatch("user/updateUserPassword",{confirmPassword:this.confirmPasswordForNewPassword,newPassword:this.newPassword}),this.authLoading?(this.$store.commit("user/setAuthLoading",!1),this.$buefy.toast.open({duration:3e3,message:"[auth] error",type:"is-danger"})):this.$buefy.toast.open({duration:3e3,message:this.$t("profile.password.success_message"),type:"is-success"})},async onUpdateAvatar(){await this.$store.dispatch("user/updateUserAvatar",this.newAvatar),this.authLoading?(this.$store.commit("user/setAuthLoading",!1),this.$buefy.toast.open({duration:3e3,message:"onUpdateAvatar() Error",type:"is-danger"})):this.$buefy.toast.open({duration:3e3,message:this.$t("profile.avatar.success_message"),type:"is-success"})},onDelete(){this.$buefy.dialog.confirm({title:this.$t("profile.delete.dialog.title"),message:this.$t("profile.delete.dialog.message"),confirmText:this.$t("profile.delete.dialog.confirm_text"),cancelText:this.$t("profile.delete.dialog.cancel_text"),type:"is-danger",hasIcon:!0,onConfirm:async()=>{await this.$store.dispatch("user/deleteUser",this.confirmPasswordForDeleting),this.authLoading?(this.$store.commit("user/setAuthLoading",!1),this.$buefy.toast.open({duration:3e3,message:"[auth] error",type:"is-danger"})):this.$router.push(this.localePath("/"))}})},onAvatarChange(){this.previewAvatar=null,this.previewAvatar={url:URL.createObjectURL(this.newAvatar),size:this.newAvatar.size}}},head(){return{title:this.$t("profile.head.title")}}},m=n(4),component=Object(m.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[e._ssrNode('<div class="columns">',"</div>",[e._ssrNode('<div class="column is-3">',"</div>",[e._ssrNode('<div style="position: sticky; top: 8rem;">',"</div>",[e._ssrNode('<div class="card">',"</div>",[e._ssrNode('<div class="card-content">',"</div>",[e._ssrNode('<div class="level">',"</div>",[e._ssrNode('<div class="level-item">',"</div>",[e._ssrNode("<figure>","</figure>",[n("client-only",[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.userAvatarUrl,expression:"userAvatarUrl"}],staticClass:"_profile-avatar",staticStyle:{display:"none"},attrs:{onload:"this.style.display = 'block'",alt:"user_avatar"}})])],1)])]),e._ssrNode(' <div class="has-text-centered"><h5 class="title is-size-5">'+e._ssrEscape(e._s(e.userName))+"</h5></div>")],2)])])]),e._ssrNode(" "),e._ssrNode('<div class="column is-9">',"</div>",[e._ssrNode('<div class="card">',"</div>",[e._ssrNode('<div class="card-content">',"</div>",[n("b-tabs",{attrs:{type:"is-boxed"}},[n("b-tab-item",{attrs:{label:e.$t("profile.info.title")}},[n("form",[n("div",{staticStyle:{"padding-top":"1rem","padding-bottom":"2rem"}},[n("b-field",{attrs:{label:e.$t("profile.info.username_label"),type:e.$v.newUserContent.username.$error?"is-danger":"",message:e.$v.newUserContent.username.minLen?"":e.$t("profile.info.username_message")}},[n("b-input",{attrs:{icon:"user-circle"},on:{blur:function(t){return e.$v.newUserContent.username.$touch()}},model:{value:e.newUserContent.username,callback:function(t){e.$set(e.newUserContent,"username","string"==typeof t?t.trim():t)},expression:"newUserContent.username"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.info.fullname_label"),type:e.$v.newUserContent.fullname.$error?"is-danger":""}},[n("b-input",{attrs:{icon:"id-card"},on:{blur:function(t){return e.$v.newUserContent.fullname.$touch()}},model:{value:e.newUserContent.fullname,callback:function(t){e.$set(e.newUserContent,"fullname","string"==typeof t?t.trim():t)},expression:"newUserContent.fullname"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.info.website_label"),type:e.$v.newUserContent.website.$error?"is-danger":"",message:e.$v.newUserContent.website.url?"":e.$t("profile.info.website_message")}},[n("b-input",{attrs:{icon:"link"},on:{blur:function(t){return e.$v.newUserContent.website.$touch()}},model:{value:e.newUserContent.website,callback:function(t){e.$set(e.newUserContent,"website","string"==typeof t?t.trim():t)},expression:"newUserContent.website"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.info.phone_label"),type:e.$v.newUserContent.phone.$error?"is-danger":"",message:e.$v.newUserContent.phone.numeric?"":e.$t("profile.info.phone_message")}},[n("b-input",{attrs:{type:"tel",icon:"phone-square-alt"},on:{blur:function(t){return e.$v.newUserContent.phone.$touch()}},model:{value:e.newUserContent.phone,callback:function(t){e.$set(e.newUserContent,"phone","string"==typeof t?t.trim():t)},expression:"newUserContent.phone"}})],1),e._v(" "),n("b-field",{attrs:{grouped:""}},[n("b-field",{attrs:{label:e.$t("profile.info.address_label"),type:e.$v.newUserContent.address.$error?"is-danger":"",expanded:""}},[n("b-input",{attrs:{icon:"map-marker-alt"},on:{blur:function(t){return e.$v.newUserContent.address.$touch()}},model:{value:e.newUserContent.address,callback:function(t){e.$set(e.newUserContent,"address","string"==typeof t?t.trim():t)},expression:"newUserContent.address"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.info.province_label")}},[n("b-select",{model:{value:e.newUserContent.province,callback:function(t){e.$set(e.newUserContent,"province",t)},expression:"newUserContent.province"}},e._l(e.provinces,(function(t,i){return n("option",{key:i},[e._v(e._s(t))])})),0)],1)],1)],1),e._v(" "),n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"}),e._v(" "),n("div",{staticClass:"level-right"},[n("button",{staticClass:"button is-info is-outlined",class:{"is-loading":e.authLoading},attrs:{disabled:e.$v.newUserContent.$invalid},on:{click:function(t){return t.preventDefault(),e.onUpdateContent(t)}}},[e._v("\n                      "+e._s(e.$t("profile.info.save_btn"))+"\n                    ")])])])])]),e._v(" "),n("b-tab-item",{attrs:{label:e.$t("profile.email.title")}},[n("form",[n("div",{staticStyle:{"padding-top":"1rem","padding-bottom":"2rem"}},[n("b-field",{attrs:{label:e.$t("profile.email.old_email_label")}},[n("b-input",{attrs:{type:"email",value:e.oldEmail,disabled:"",icon:"envelope"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.email.new_email_label"),type:e.$v.newEmail.$error?"is-danger":"",message:e.$v.newEmail.email?e.$v.newEmail.isChanged?"":e.$t("profile.email.warning_email_message"):e.$t("profile.email.new_email_message")}},[n("b-input",{attrs:{type:"email",icon:"envelope"},on:{blur:function(t){return e.$v.newEmail.$touch()}},model:{value:e.newEmail,callback:function(t){e.newEmail="string"==typeof t?t.trim():t},expression:"newEmail"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.email.confirm_password_label"),type:e.$v.confirmPasswordForNewEmail.$error?"is-danger":"",message:e.$v.confirmPasswordForNewEmail.minLen?"":e.$t("profile.email.confirm_password_message")}},[n("b-input",{attrs:{type:"password","password-reveal":"",icon:"unlock-alt"},on:{blur:function(t){return e.$v.confirmPasswordForNewEmail.$touch()}},model:{value:e.confirmPasswordForNewEmail,callback:function(t){e.confirmPasswordForNewEmail="string"==typeof t?t.trim():t},expression:"confirmPasswordForNewEmail"}})],1)],1),e._v(" "),n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"}),e._v(" "),n("div",{staticClass:"level-right"},[n("button",{staticClass:"button is-info is-outlined",class:{"is-loading":e.authLoading},attrs:{disabled:e.$v.newEmail.$invalid||e.$v.confirmPasswordForNewEmail.$invalid},on:{click:function(t){return t.preventDefault(),e.onUpdateEmail(t)}}},[e._v("\n                      "+e._s(e.$t("profile.email.save_btn"))+"\n                    ")])])])])]),e._v(" "),n("b-tab-item",{attrs:{label:e.$t("profile.password.title")}},[n("form",[n("div",{staticStyle:{"padding-top":"1rem","padding-bottom":"2rem"}},[n("b-field",{attrs:{label:e.$t("profile.password.password_label"),type:e.$v.confirmPasswordForNewPassword.$error?"is-danger":"",message:e.$v.confirmPasswordForNewPassword.minLen?"":e.$t("profile.password.password_message")}},[n("b-input",{attrs:{type:"password","password-reveal":"",icon:"unlock-alt"},on:{blur:function(t){return e.$v.confirmPasswordForNewPassword.$touch()}},model:{value:e.confirmPasswordForNewPassword,callback:function(t){e.confirmPasswordForNewPassword="string"==typeof t?t.trim():t},expression:"confirmPasswordForNewPassword"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.password.new_password_label"),type:e.$v.newPassword.$error?"is-danger":"",message:e.$v.newPassword.minLen?"":e.$t("profile.password.new_password_message")}},[n("b-input",{attrs:{type:"password","password-reveal":"",icon:"key"},on:{blur:function(t){return e.$v.newPassword.$touch()}},model:{value:e.newPassword,callback:function(t){e.newPassword="string"==typeof t?t.trim():t},expression:"newPassword"}})],1),e._v(" "),n("b-field",{attrs:{label:e.$t("profile.password.confirm_new_password_label"),type:e.$v.confirmNewPassword.$error?"is-danger":"",message:e.$v.confirmNewPassword.$error?e.$t("profile.password.confirm_new_password_error_message"):""}},[n("b-input",{attrs:{type:"password","password-reveal":"",icon:"key"},on:{blur:function(t){return e.$v.confirmNewPassword.$touch()}},model:{value:e.confirmNewPassword,callback:function(t){e.confirmNewPassword="string"==typeof t?t.trim():t},expression:"confirmNewPassword"}})],1)],1),e._v(" "),n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"}),e._v(" "),n("div",{staticClass:"level-right"},[n("button",{staticClass:"button is-info is-outlined",class:{"is-loading":e.authLoading},attrs:{disabled:e.$v.confirmPasswordForNewPassword.$invalid||e.$v.newPassword.$invalid||e.$v.confirmNewPassword.$invalid},on:{click:function(t){return t.preventDefault(),e.onUpdatePassword(t)}}},[e._v("\n                      "+e._s(e.$t("profile.password.save_btn"))+"\n                    ")])])])])]),e._v(" "),n("b-tab-item",{attrs:{label:e.$t("profile.avatar.title")}},[n("form",[n("div",{staticStyle:{"padding-top":"1rem","padding-bottom":"2rem"}},[n("b-field",{attrs:{label:e.$t("profile.avatar.avatar_label")}},[n("div",{staticClass:"level"},[n("div",{staticClass:"level-item"},[n("b-upload",{attrs:{"drag-drop":"",accept:e.acceptedImages},on:{input:e.onAvatarChange},model:{value:e.newAvatar,callback:function(t){e.newAvatar=t},expression:"newAvatar"}},[n("section",{staticClass:"section"},[n("div",{staticClass:"content has-text-centered"},[n("p",[n("b-icon",{attrs:{icon:"upload"}})],1),e._v(" "),n("p",[e._v(e._s(e.$t("profile.avatar.placeholder")))])])])])],1)])]),e._v(" "),n("div",{staticClass:"level"},[e.oldAvatar?n("div",{staticClass:"level-item"},[n("figure",{staticClass:"image is-128x128 _image-avatar-frame"},[n("client-only",[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.oldAvatar.url,expression:"oldAvatar.url"}],staticClass:"_image-avatar-preview",staticStyle:{display:"none"},attrs:{onload:"this.style.display = 'block'",alt:"user_avatar"}})]),e._v(" "),n("span",{staticClass:"_image-avatar-size"},[e._v(e._s(e._f("fmBytes")(e.oldAvatar.metadata.size)))]),e._v(" "),n("a",{staticClass:"delete _image-avatar-button-delete",on:{click:function(t){t.preventDefault(),e.oldAvatar=null}}})],1)]):e.newAvatar?n("div",{staticClass:"level-item"},[n("figure",{staticClass:"image is-128x128 _image-avatar-frame"},[n("client-only",[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.previewAvatar.url,expression:"previewAvatar.url"}],staticClass:"_image-avatar-preview",staticStyle:{display:"none"},attrs:{onload:"this.style.display = 'block'",alt:"preview_avatar"}})]),e._v(" "),n("span",{staticClass:"_image-avatar-size"},[e._v(e._s(e._f("fmBytes")(e.previewAvatar.size)))]),e._v(" "),n("a",{staticClass:"delete _image-avatar-button-delete",on:{click:function(t){t.preventDefault(),e.previewAvatar=null,e.newAvatar=null}}})],1)]):e._e()])],1),e._v(" "),n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"}),e._v(" "),n("div",{staticClass:"level-right"},[n("button",{staticClass:"button is-info is-outlined",class:{"is-loading":e.authLoading},attrs:{disabled:!e.isAvatarChanged},on:{click:function(t){return t.preventDefault(),e.onUpdateAvatar(t)}}},[e._v("\n                      "+e._s(e.$t("profile.avatar.save_btn"))+"\n                    ")])])])])]),e._v(" "),n("b-tab-item",{attrs:{label:e.$t("profile.delete.title")}},[n("form",[n("div",{staticStyle:{"padding-top":"1rem","padding-bottom":"2rem"}},[n("b-field",{attrs:{label:e.$t("profile.delete.confirm_password_label"),type:e.$v.confirmPasswordForDeleting.$error?"is-danger":"",message:e.$v.confirmPasswordForDeleting.minLen?"":e.$t("profile.delete.confirm_password_message")}},[n("b-input",{attrs:{type:"password","password-reveal":"",icon:"key"},on:{blur:function(t){return e.$v.confirmPasswordForDeleting.$touch()}},model:{value:e.confirmPasswordForDeleting,callback:function(t){e.confirmPasswordForDeleting="string"==typeof t?t.trim():t},expression:"confirmPasswordForDeleting"}})],1)],1),e._v(" "),n("div",{staticClass:"level"},[n("div",{staticClass:"level-left"}),e._v(" "),n("div",{staticClass:"level-right"},[n("button",{staticClass:"button is-danger",class:{"is-loading":e.authLoading},attrs:{disabled:e.$v.confirmPasswordForDeleting.$invalid},on:{click:function(t){return t.preventDefault(),e.onDelete(t)}}},[e._v("\n                      "+e._s(e.$t("profile.delete.delete_btn"))+"\n                    ")])])])])])],1)],1)])])],2)])}),[],!1,null,null,"61d6ba32");t.default=component.exports}};