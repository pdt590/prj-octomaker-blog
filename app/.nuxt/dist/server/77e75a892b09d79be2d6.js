exports.ids=[16],exports.modules={61:function(e,t,r){"use strict";r.r(t);var l=r(8),o={middleware:"server-client-auth",computed:{...Object(l.mapGetters)(["user","queryLoading"]),userAvatarUrl(){return this.user?this.user.avatar?this.user.avatar.url:"/icon-user.png":void 0},userName(){return this.user?this.user.username:void 0}},async asyncData({store:e,error:t}){const r=await e.dispatch("loadOwnPosts");return e.getters.queryLoading&&(e.commit("setQueryLoading",!1),t({statusCode:500,message:"loadOwnPosts() Error"})),{loadedPersonalPosts:r}},methods:{onDelete(e){const t=this.loadedPersonalPosts.findIndex(t=>t.url===e);this.loadedPersonalPosts.splice(t,1)}},head(){return{title:this.$t("mgmt.head.title")}}},d=r(5),component=Object(d.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[e._ssrNode('<div class="columns">',"</div>",[e._ssrNode('<div class="column is-3">',"</div>",[e._ssrNode('<div style="position: sticky; top: 8rem;">',"</div>",[e._ssrNode('<div class="card">',"</div>",[e._ssrNode('<div class="card-content">',"</div>",[e._ssrNode('<div class="level">',"</div>",[e._ssrNode('<div class="level-item">',"</div>",[r("nuxt-link",{attrs:{to:e.localePath("/user/profile")}},[r("figure",[r("client-only",[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.userAvatarUrl,expression:"userAvatarUrl"}],staticClass:"_profile-avatar",staticStyle:{display:"none"},attrs:{onload:"this.style.display = 'block'",alt:"user_avatar"}})])],1)])],1)]),e._ssrNode(' <div class="has-text-centered"><h5 class="title is-size-5">'+e._ssrEscape(e._s(e.userName))+"</h5></div>")],2)])])]),e._ssrNode(" "),e._ssrNode('<div class="column is-9">',"</div>",[e._ssrNode('<div class="card">',"</div>",[e._ssrNode('<div class="card-content">',"</div>",[r("b-tabs",{attrs:{type:"is-boxed"}},[r("b-tab-item",[r("template",{slot:"header"},[r("div",{staticClass:"_align"},[r("b-icon",{attrs:{icon:"newspaper"}}),e._v(" "),r("span",[e._v(e._s(e.$t("mgmt.posts_label")))])],1)]),e._v(" "),e._l(e.loadedPersonalPosts,(function(t){return r("div",{key:t.url,staticStyle:{"padding-top":"1rem"}},[r("v-card-post-horizontal",{attrs:{value:t},on:{delete:e.onDelete}})],1)}))],2)],1)],1)])])],2)])}),[],!1,null,null,"0af953e8");t.default=component.exports}};