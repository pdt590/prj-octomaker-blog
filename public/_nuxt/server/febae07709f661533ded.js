exports.ids=[27],exports.modules={71:function(t,l,n){"use strict";n.r(l);n(14);var e=n(57),o={name:"v-modal-link",data:()=>({link:null}),validations:{link:{required:e.required,url:e.url}},methods:{onDraw(){this.$parent.close(),this.$emit("draw",this.link)}}},r=n(4),component=Object(r.a)(o,(function(){var t=this,l=t.$createElement,n=t._self._c||l;return n("div",{staticClass:"modal-card"},[t._ssrNode('<header class="modal-card-head"><p class="modal-card-title">'+t._ssrEscape(t._s(t.$t("modal_link.title")))+"</p></header> "),t._ssrNode('<section class="modal-card-body">',"</section>",[n("b-field",{attrs:{type:t.$v.link.$error?"is-danger":"",message:t.$v.link.$error?t.$t("modal_link.link_message"):""}},[n("b-input",{attrs:{type:"text",icon:"link"},on:{blur:function(l){return t.$v.link.$touch()}},model:{value:t.link,callback:function(l){t.link="string"==typeof l?l.trim():l},expression:"link"}})],1)],1),t._ssrNode(' <footer class="modal-card-foot"><div class="buttons"><button class="button is-info is-outlined">'+t._ssrEscape("\n        "+t._s(t.$t("modal_link.close_btn"))+"\n      ")+"</button> <button"+t._ssrAttr("disabled",t.$v.link.$invalid)+' class="button is-info is-outlined">'+t._ssrEscape("\n        "+t._s(t.$t("modal_link.insert_btn"))+"\n      ")+"</button></div></footer>")],2)}),[],!1,null,null,"35603026");l.default=component.exports}};