exports.ids=[18],exports.modules={63:function(e,t,r){"use strict";r.r(t);var o=r(8),d=r(51),l=r(3),n={validate:({store:e})=>!e.getters.user,computed:{...Object(o.mapGetters)(["authError","authLoading"])},data:()=>({formData:{email:null}}),validations:{formData:{email:{required:d.required,email:d.email}}},methods:{async onResetPassword(){await this.$store.dispatch("resetUserPassword",this.formData.email),this.authLoading?(this.$store.commit("setAuthLoading",!1),this.$buefy.toast.open({duration:3e3,message:Object(l.b)(this.authError),type:"is-danger"})):(this.$buefy.toast.open({duration:3e3,message:this.$t("resetpassword.toast.message"),type:"is-warning"}),this.$router.push(this.localePath("/user/join")))}},head(){return{title:this.$t("resetpassword.head.title")}}},m=r(5),component=Object(m.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[e._ssrNode('<div class="columns">',"</div>",[e._ssrNode('<div class="column is-4 is-offset-4">',"</div>",[e._ssrNode('<form class="card _card-input">',"</form>",[e._ssrNode('<header class="card-header"><p class="card-header-title is-size-4">'+e._ssrEscape("\n            "+e._s(e.$t("resetpassword.title"))+"\n          ")+"</p></header> "),e._ssrNode('<div class="card-content">',"</div>",[r("b-field",{attrs:{label:"Email",type:e.$v.formData.email.$error?"is-danger":"",message:e.$v.formData.email.email?"":e.$t("resetpassword.email_message")}},[r("b-input",{attrs:{type:"email",placeholder:e.$t("resetpassword.email_placeholder")},on:{blur:function(t){return e.$v.formData.email.$touch()}},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email","string"==typeof t?t.trim():t)},expression:"formData.email"}})],1)],1),e._ssrNode(' <footer class="card-footer" style="border-top: none"><div class="card-footer-item"><button'+e._ssrAttr("disabled",e.$v.formData.$invalid)+e._ssrClass("button is-info is-outlined",{"is-loading":e.authLoading})+">"+e._ssrEscape("\n              "+e._s(e.$t("resetpassword.send_btn"))+"\n            ")+"</button></div></footer>")],2)])])])}),[],!1,null,null,"02623273");t.default=component.exports}};