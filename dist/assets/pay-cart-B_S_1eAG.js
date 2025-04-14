import{B as de,o as l,c as d,m as C,a as r,d as ue,i as be,g as ge,F as N,x as B,z as o,u as j,v as ke,b as I,E as R,aL as M,aM as se,N as Z,y as A,I as P,J as S,n as Y,K as $e,_ as Q,A as h,C as ae,W as re,w as ee,aN as we,O as xe,aO as Se,P as te,af as Ie,aA as Ce,t as Pe,$ as X,aF as le,Z as pe,aG as Te,X as Ee,U as Le,G as Ve,V as je}from"./index-CdbKeSxe.js";import{s as De}from"./index-CDcS4ChB.js";import{u as me}from"./useLocationService-CvLxJEp9.js";import{u as Ne}from"./useUserService-KWgwavVN.js";import{u as Me}from"./usePaymentTypes-B6k8Iph-.js";import{u as qe}from"./useOrderService-C57ztokW.js";var Ae=function(e){var t=e.dt;return`
.p-progressspinner {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    display: inline-block;
}

.p-progressspinner::before {
    content: "";
    display: block;
    padding-top: 100%;
}

.p-progressspinner-spin {
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    animation: p-progressspinner-rotate 2s linear infinite;
}

.p-progressspinner-circle {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: 0;
    stroke: `.concat(t("progressspinner.color.1"),`;
    animation: p-progressspinner-dash 1.5s ease-in-out infinite, p-progressspinner-color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes p-progressspinner-rotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes p-progressspinner-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
@keyframes p-progressspinner-color {
    100%,
    0% {
        stroke: `).concat(t("progressspinner.color.1"),`;
    }
    40% {
        stroke: `).concat(t("progressspinner.color.2"),`;
    }
    66% {
        stroke: `).concat(t("progressspinner.color.3"),`;
    }
    80%,
    90% {
        stroke: `).concat(t("progressspinner.color.4"),`;
    }
}
`)},Oe={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},Fe=de.extend({name:"progressspinner",theme:Ae,classes:Oe}),Be={name:"BaseProgressSpinner",extends:ue,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:Fe,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},ne={name:"ProgressSpinner",extends:Be,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},Re=["fill","stroke-width"];function Ue(n,e,t,i,p,a){return l(),d("div",C({class:n.cx("root"),role:"progressbar"},n.ptmi("root")),[(l(),d("svg",C({class:n.cx("spin"),viewBox:"25 25 50 50",style:a.svgStyle},n.ptm("spin")),[r("circle",C({class:n.cx("circle"),cx:"50",cy:"50",r:"20",fill:n.fill,"stroke-width":n.strokeWidth,strokeMiterlimit:"10"},n.ptm("circle")),null,16,Re)],16))],16)}ne.render=Ue;var ze=function(e){var t=e.dt;return`
.p-steps {
    position: relative;
}

.p-steps-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
}

.p-steps-item {
    position: relative;
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
}

.p-steps-item.p-disabled,
.p-steps-item.p-disabled * {
    opacity: 1;
    pointer-events: auto;
    user-select: auto;
    cursor: auto;
}

.p-steps-item:before {
    content: " ";
    border-top: 2px solid `.concat(t("steps.separator.background"),`;
    width: 100%;
    top: 50%;
    left: 0;
    display: block;
    position: absolute;
    margin-top: calc(-1rem + 1px);
}

.p-steps-item:first-child::before {
    width: calc(50% + 1rem);
    transform: translateX(100%);
}

.p-steps-item:last-child::before {
    width: 50%;
}

.p-steps-item-link {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    text-decoration: none;
    transition: outline-color `).concat(t("steps.transition.duration"),", box-shadow ").concat(t("steps.transition.duration"),`;
    border-radius: `).concat(t("steps.item.link.border.radius"),`;
    outline-color: transparent;
    gap: `).concat(t("steps.item.link.gap"),`;
}

.p-steps-item-link:not(.p-disabled):focus-visible {
    box-shadow: `).concat(t("steps.item.link.focus.ring.shadow"),`;
    outline: `).concat(t("steps.item.link.focus.ring.width")," ").concat(t("steps.item.link.focus.ring.style")," ").concat(t("steps.item.link.focus.ring.color"),`;
    outline-offset: `).concat(t("steps.item.link.focus.ring.offset"),`;
}

.p-steps-item-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    color: `).concat(t("steps.item.label.color"),`;
    display: block;
    font-weight: `).concat(t("steps.item.label.font.weight"),`;
}

.p-steps-item-number {
    display: flex;
    align-items: center;
    justify-content: center;
    color: `).concat(t("steps.item.number.color"),`;
    border: 2px solid `).concat(t("steps.item.number.border.color"),`;
    background: `).concat(t("steps.item.number.background"),`;
    min-width: `).concat(t("steps.item.number.size"),`;
    height: `).concat(t("steps.item.number.size"),`;
    line-height: `).concat(t("steps.item.number.size"),`;
    font-size: `).concat(t("steps.item.number.font.size"),`;
    z-index: 1;
    border-radius: `).concat(t("steps.item.number.border.radius"),`;
    position: relative;
    font-weight: `).concat(t("steps.item.number.font.weight"),`;
}

.p-steps-item-number::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: `).concat(t("steps.item.number.border.radius"),`;
    box-shadow: `).concat(t("steps.item.number.shadow"),`;
}

.p-steps:not(.p-readonly) .p-steps-item {
    cursor: pointer;
}

.p-steps-item-active .p-steps-item-number {
    background: `).concat(t("steps.item.number.active.background"),`;
    border-color: `).concat(t("steps.item.number.active.border.color"),`;
    color: `).concat(t("steps.item.number.active.color"),`;
}

.p-steps-item-active .p-steps-item-label {
    color: `).concat(t("steps.item.label.active.color"),`;
}
`)},Ke={root:function(e){var t=e.props;return["p-steps p-component",{"p-readonly":t.readonly}]},list:"p-steps-list",item:function(e){var t=e.instance,i=e.item,p=e.index;return["p-steps-item",{"p-steps-item-active":t.isActive(p),"p-disabled":t.isItemDisabled(i,p)}]},itemLink:"p-steps-item-link",itemNumber:"p-steps-item-number",itemLabel:"p-steps-item-label"},Ge=de.extend({name:"steps",theme:ze,classes:Ke}),Je={name:"BaseSteps",extends:ue,props:{id:{type:String},model:{type:Array,default:null},readonly:{type:Boolean,default:!0},activeStep:{type:Number,default:0}},style:Ge,provide:function(){return{$pcSteps:this,$parentInstance:this}}},ve={name:"Steps",extends:Je,inheritAttrs:!1,emits:["update:activeStep","step-change"],data:function(){return{d_activeStep:this.activeStep}},watch:{activeStep:function(e){this.d_activeStep=e}},mounted:function(){var e=this.findFirstItem();e&&(e.tabIndex="0")},methods:{getPTOptions:function(e,t,i){return this.ptm(e,{context:{item:t,index:i,active:this.isActive(i),disabled:this.isItemDisabled(t,i)}})},onItemClick:function(e,t,i){if(this.disabled(t)||this.readonly){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),i!==this.d_activeStep&&(this.d_activeStep=i,this.$emit("update:activeStep",this.d_activeStep)),this.$emit("step-change",{originalEvent:e,index:i})},onItemKeydown:function(e,t){switch(e.code){case"ArrowRight":{this.navigateToNextItem(e.target),e.preventDefault();break}case"ArrowLeft":{this.navigateToPrevItem(e.target),e.preventDefault();break}case"Home":{this.navigateToFirstItem(e.target),e.preventDefault();break}case"End":{this.navigateToLastItem(e.target),e.preventDefault();break}case"Tab":break;case"Enter":case"NumpadEnter":case"Space":{this.onItemClick(e,t),e.preventDefault();break}}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?t.children[0]:null},findFirstItem:function(){var e=be(this.$refs.list,'[data-pc-section="item"]');return e?e.children[0]:null},findLastItem:function(){var e=ge(this.$refs.list,'[data-pc-section="item"]');return e?e[e.length-1].children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex="-1",t.tabIndex="0",t.focus()},isActive:function(e){return e===this.d_activeStep},isItemDisabled:function(e,t){return this.disabled(e)||this.readonly&&!this.isActive(t)},visible:function(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled=="function"?e.disabled():e.disabled},label:function(e){return typeof e.label=="function"?e.label():e.label},getMenuItemProps:function(e,t){var i=this;return{action:C({class:this.cx("itemLink"),onClick:function(a){return i.onItemClick(a,e)},onKeyDown:function(a){return i.onItemKeydown(a,e)}},this.getPTOptions("itemLink",e,t)),step:C({class:this.cx("itemNumber")},this.getPTOptions("itemNumber",e,t)),label:C({class:this.cx("itemLabel")},this.getPTOptions("itemLabel",e,t))}}}},Xe=["id"],We=["aria-current","onClick","onKeydown","data-p-active","data-p-disabled"];function He(n,e,t,i,p,a){return l(),d("nav",C({id:n.id,class:n.cx("root")},n.ptmi("root")),[r("ol",C({ref:"list",class:n.cx("list")},n.ptm("list")),[(l(!0),d(N,null,B(n.model,function(s,c){return l(),d(N,{key:a.label(s)+"_"+c.toString()},[a.visible(s)?(l(),d("li",C({key:0,class:[n.cx("item",{item:s,index:c}),s.class],style:s.style,"aria-current":a.isActive(c)?"step":void 0,onClick:function(m){return a.onItemClick(m,s,c)},onKeydown:function(m){return a.onItemKeydown(m,s,c)},ref_for:!0},a.getPTOptions("item",s,c),{"data-p-active":a.isActive(c),"data-p-disabled":a.isItemDisabled(s,c)}),[n.$slots.item?(l(),j(ke(n.$slots.item),{key:1,item:s,index:c,active:c===p.d_activeStep,label:a.label(s),props:a.getMenuItemProps(s,c)},null,8,["item","index","active","label","props"])):(l(),d("span",C({key:0,class:n.cx("itemLink"),ref_for:!0},a.getPTOptions("itemLink",s,c)),[r("span",C({class:n.cx("itemNumber"),ref_for:!0},a.getPTOptions("itemNumber",s,c)),o(c+1),17),r("span",C({class:n.cx("itemLabel"),ref_for:!0},a.getPTOptions("itemLabel",s,c)),o(a.label(s)),17)],16))],16,We)):I("",!0)],64)}),128))],16)],16,Xe)}ve.render=He;const Ze={key:0,class:"space-y-6"},Qe={class:"text-xl md:text-2xl font-bold text-pink-600 mb-4"},Ye={class:"p-4 border rounded-lg shadow-md backdrop-blur-md"},et={class:"text-lg font-semibold mb-2"},tt={class:""},nt={class:"line-clamp-1 font-medium"},st={class:""},at={class:"text-pink-700 font-semibold"},rt={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md flex flex-col gap-3"},ot={class:"text-lg font-semibold text-pink-700"},it={class:"font-medium"},lt={class:"font-medium"},ct={key:0,class:"font-medium"},dt={key:1,class:"text-pink-700"},ut={class:"flex flex-row items-center justify-center text-lg md:text-2xl text-justify"},pt={key:0,class:"font-semibold flex flex-row items-center justify-end sm:text-xl"},mt={class:"mr-2"},vt={key:1,class:"text-center font-semibold flex flex-wrap items-center justify-center"},ft={class:"mr-2"},yt={class:"flex flex-row items-center gap-1"},ht={class:"flex flex-row items-center gap-1"},_t={key:0,class:"flex flex-row items-center gap-1"},bt={key:0,class:"w-full flex flex-row justify-center md:justify-end"},gt={class:"flex flex-col"},kt={for:"mile",class:"font-bold block mb-0.5 text-sm"},$t={class:"text-zinc-400"},wt={class:"flex justify-between mt-6"},xt={key:1,class:"flex flex-col gap-2"},St=R({__name:"ConfirmationStep",props:M({cart:{type:Object,required:!0},selected_payment_type:{type:Object,required:!0},selected_currency:{type:Object,required:!0},selected_location:{type:Object,required:!0}},{change:{},changeModifiers:{}}),emits:M(["next","backt","update:change"],["update:change"]),setup(n,{emit:e}){const t=n,i=se(n,"change"),p=Z(()=>{let a=t.cart?t.cart.total_price:0;return a+=t.selected_location.delivery_price,a});return(a,s)=>{var c,b,m,_,v,E,D,L,u,f,V,T,$,w,U,z;return n.cart&&n.selected_currency&&n.selected_payment_type&&n.selected_location?(l(),d("div",Ze,[r("h2",Qe,o(a.$t("confirm_payment_information")),1),r("div",Ye,[r("h3",et,o(a.$t("cart_summary")),1),(l(!0),d(N,null,B(n.cart.cart_items,x=>{var K,G;return l(),d("div",{key:x.product.id,class:"mb-4"},[r("p",tt,[r("span",nt,o(x.product.name),1),r("small",st,[A(o(x.quantity)+" x "+o((x.product.price*((K=n.selected_currency)==null?void 0:K.change_value)).toFixed(2))+" ",1),r("span",null,o((G=n.selected_currency)==null?void 0:G.name),1)])])])}),128)),r("p",at,[A(o(a.$t("total"))+": "+o((n.cart.total_price*((c=n.selected_currency)==null?void 0:c.change_value)).toFixed(2))+" ",1),r("span",null,o((b=n.selected_currency)==null?void 0:b.name),1)])]),r("div",rt,[r("h3",ot,o(a.$t("payment_and_shipping_summary")),1),r("p",it,o(a.$t("payment_method"))+": "+o((m=n.selected_payment_type)==null?void 0:m.name),1),r("p",lt,o(a.$t("delivery_location"))+": "+o((_=n.selected_location)==null?void 0:_.name),1),n.selected_payment_type.delivery_included?(l(),d("p",ct,[A(o(a.$t("delivery_price"))+": "+o((v=n.selected_location)==null?void 0:v.delivery_price)+" ",1),r("span",null,o((E=n.selected_currency)==null?void 0:E.name),1)])):I("",!0),n.selected_payment_type.delivery_included?I("",!0):(l(),d("p",dt,[A(o(a.$t("delivery_price"))+": "+o(((D=n.selected_location)==null?void 0:D.delivery_price)*((L=n.selected_payment_type.delivery_currency)==null?void 0:L.change_value))+" ",1),r("span",null,o((u=n.selected_payment_type.delivery_currency)==null?void 0:u.name),1)]))]),r("div",ut,[n.selected_payment_type.delivery_included?(l(),d("div",pt,[r("span",mt,o(a.$t("total_to_pay"))+": ",1),r("span",null,o((p.value*((f=n.selected_currency)==null?void 0:f.change_value)).toFixed(2))+" "+o((V=n.selected_currency)==null?void 0:V.name),1)])):(l(),d("div",vt,[r("span",ft,o(a.$t("total_to_pay"))+": ",1),r("span",yt,[r("span",ht,o((n.cart.total_price*((T=n.selected_currency)==null?void 0:T.change_value)).toFixed(2))+" "+o(($=n.selected_currency)==null?void 0:$.name),1),n.selected_location?(l(),d("span",_t,[s[2]||(s[2]=r("i",{class:"pi pi-plus px-1"},null,-1)),A(" "+o((((w=n.selected_location)==null?void 0:w.delivery_price)*((U=n.selected_payment_type.delivery_currency)==null?void 0:U.change_value)).toFixed(2))+" "+o((z=n.selected_payment_type.delivery_currency)==null?void 0:z.name),1)])):I("",!0)])]))]),n.selected_payment_type.may_have_change?(l(),d("div",bt,[r("div",gt,[r("label",kt,o(a.$t("change_needed")),1),P(S(De),{modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=x=>i.value=x),"input-id":"mile",size:"small",suffix:` ${n.selected_currency.name}`},null,8,["modelValue","suffix"]),r("small",$t,o(a.$t("in_case_is_needed")),1)])])):I("",!0),r("div",wt,[P(S(Y),{label:a.$t("receiver_data"),class:"p-button-primary pastel-btn w-full !border-none !focus:border-none",onClick:s[1]||(s[1]=x=>a.$emit("next"))},null,8,["label"])])])):(l(),d("div",xt,[(l(),d(N,null,B(3,x=>P(S($e),{key:x,class:"w-full !h-32"})),64))]))}}}),It=Q(St,[["__scopeId","data-v-3344a7c0"]]),Ct={key:0,class:"text-center"},Pt={key:1},Tt=["onClick"],Et={class:""},Lt={class:"text-sm text-gray-600"},Vt={class:"text-sm text-gray-600"},jt={key:0,class:"flex flex-col items-center justify-center"},Dt={key:0,class:"text-center"},Nt={key:1},Mt=["onClick"],qt={class:""},At={class:"text-sm text-gray-600"},Ot={class:"text-sm text-gray-600"},Ft={key:0,class:"flex flex-col items-center justify-center"},Bt=R({__name:"ContactDialog",props:M({locationId:{type:Number,required:!0}},{modelValue:{type:Boolean},modelModifiers:{}}),emits:M(["update:visible","select-contact"],["update:modelValue"]),setup(n,{emit:e}){const t=n,i=se(n,"modelValue"),p=e,a=h([]),s=h(!0),c=Z(()=>window.innerWidth<=768);ae(async()=>{const m=Ne(),{userData:_}=re(),{data:v}=await m.getContacts(_.id,t.locationId);a.value=v??[],s.value=!1});const b=m=>{p("select-contact",m),p("update:visible",!1)};return(m,_)=>(l(),d(N,null,[!c.value&&!s.value?(l(),j(S(we),{key:0,visible:i.value,"onUpdate:visible":_[0]||(_[0]=v=>i.value=v),header:m.$t("select_a_contact"),modal:!0,class:"p-fluid"},{default:ee(()=>[s.value?(l(),d("div",Ct,[P(S(ne))])):(l(),d("div",Pt,[(l(!0),d(N,null,B(a.value,v=>(l(),d("div",{key:v.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:E=>b(v)},[r("p",Et,o(v.name),1),r("p",Lt,o(v.phone_number),1),r("p",Vt,o(v.address)+"- "+o(v.municipality.name),1)],8,Tt))),128)),!a.value||a.value.length==0?(l(),d("div",jt,[r("h5",null,o(m.$t("no_contacts")),1)])):I("",!0)]))]),_:1},8,["visible","header"])):I("",!0),c.value&&!s.value?(l(),j(S(xe),{key:1,visible:i.value,"onUpdate:visible":_[1]||(_[1]=v=>i.value=v),position:"bottom",style:{height:"70dvh",borderRadius:"1rem 1rem 0 0"},header:m.$t("select_a_contact")},{default:ee(()=>[s.value?(l(),d("div",Dt,[P(S(ne))])):(l(),d("div",Nt,[(l(!0),d(N,null,B(a.value,v=>(l(),d("div",{key:v.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:E=>b(v)},[r("p",qt,o(v.name),1),r("p",At,o(v.phone_number),1),r("p",Ot,o(v.address)+"- "+o(v.municipality.name),1)],8,Mt))),128)),!a.value||a.value.length==0?(l(),d("div",Ft,[r("h5",null,o(m.$t("no_contacts")),1)])):I("",!0)]))]),_:1},8,["visible","header"])):I("",!0)],64))}}),Rt=Q(Bt,[["__scopeId","data-v-b5a24a3c"]]),Ut={class:"space-y-6"},zt={class:"text-2xl font-bold text-pink-600 mb-4"},Kt={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"},Gt={class:"mb-4"},Jt={class:"relative"},Xt={key:0,class:"p-error"},Wt={class:"mb-4"},Ht={key:0,class:"p-error"},Zt={class:"mb-4"},Qt={key:0,class:"p-error"},Yt={class:"mb-4"},en={key:2,class:"p-error"},tn={class:"flex justify-between mt-6"},nn=R({__name:"RecipientStep",props:M({locationId:{type:Number,required:!0}},{modelValue:{},modelModifiers:{}}),emits:M(["next","back"],["update:modelValue"]),setup(n,{emit:e}){const t=n,i=h(!1),{anonymous:p}=re(),a=e,s=se(n,"modelValue"),c=h(!1),b=h(!1),m=h(!1),_=h(!1),v=h(!1),E=()=>{v.value=!0},D=u=>{s.value.name=u.name,s.value.phone_number=u.phone_number,s.value.address=u.address,v.value=!1};Se(async()=>{if(t.locationId){const u=await me().getAll([{field:"id",matchMode:"equals",value:t.locationId}],new te(0,1),[]);u&&u.length>0&&(s.value.municipality=u[0])}});const L=()=>{c.value=!s.value.name,b.value=!s.value.phone_number,m.value=!s.value.address,_.value=!s.value.municipality,!c.value&&!b.value&&!m.value&&!_.value&&(i.value=!0,a("next"))};return(u,f)=>{const V=Pe("Skeleton"),T=Ce("tooltip");return l(),d("div",Ut,[r("h2",zt,o(u.$t("receiver_data")),1),r("div",Kt,[r("div",Gt,[r("div",Jt,[P(S(X),{modelValue:s.value.name,"onUpdate:modelValue":f[0]||(f[0]=$=>s.value.name=$),placeholder:u.$t("name"),class:"w-full pl-10"},null,8,["modelValue","placeholder"]),S(p)?I("",!0):Ie((l(),d("i",{key:0,class:"pi pi-user absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 cursor-pointer rounded-full bg-blue-100/60 p-2",onClick:E},null,512)),[[T,u.$t("select_a_contact"),void 0,{bottom:!0}]])]),c.value?(l(),d("small",Xt,o(u.$t("field_required")),1)):I("",!0)]),r("div",Wt,[P(S(X),{modelValue:s.value.phone_number,"onUpdate:modelValue":f[1]||(f[1]=$=>s.value.phone_number=$),placeholder:u.$t("phone"),class:"w-full"},null,8,["modelValue","placeholder"]),b.value?(l(),d("small",Ht,o(u.$t("field_required")),1)):I("",!0)]),r("div",Zt,[P(S(X),{modelValue:s.value.address,"onUpdate:modelValue":f[2]||(f[2]=$=>s.value.address=$),placeholder:u.$t("address"),class:"w-full"},null,8,["modelValue","placeholder"]),m.value?(l(),d("small",Qt,o(u.$t("field_required")),1)):I("",!0)]),r("div",Yt,[s.value.municipality?(l(),j(S(X),{key:0,modelValue:s.value.municipality.name,"onUpdate:modelValue":f[3]||(f[3]=$=>s.value.municipality.name=$),placeholder:u.$t("municipality"),class:"w-full",disabled:""},null,8,["modelValue","placeholder"])):(l(),j(V,{key:1,class:"w-full"})),_.value?(l(),d("small",en,o(u.$t("field_required")),1)):I("",!0)])]),r("div",tn,[P(S(Y),{label:u.$t("back"),icon:"pi pi-arrow-left",class:"p-button-secondary pastel-btn",onClick:f[4]||(f[4]=$=>u.$emit("back"))},null,8,["label"]),P(S(Y),{label:u.$t("pay"),icon:"pi pi-arrow-right",iconPos:"right",class:"p-button-primary pastel-btn",loading:i.value,onClick:L},null,8,["label","loading"])]),P(Rt,{modelValue:v.value,"onUpdate:modelValue":f[5]||(f[5]=$=>v.value=$),locationId:n.locationId,onSelectContact:D},null,8,["modelValue","locationId"])])}}}),sn=Q(nn,[["__scopeId","data-v-c3261b53"]]);var fe="https://js.stripe.com",an="".concat(fe,"/v3"),rn=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,on=/^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;var ln=function(e){return rn.test(e)||on.test(e)},cn=function(){for(var e=document.querySelectorAll('script[src^="'.concat(fe,'"]')),t=0;t<e.length;t++){var i=e[t];if(ln(i.src))return i}return null},ce=function(e){var t="",i=document.createElement("script");i.src="".concat(an).concat(t);var p=document.head||document.body;if(!p)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return p.appendChild(i),i},O=null,W=null,H=null,dn=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},un=function(e,t){return function(){window.Stripe?e(window.Stripe):t(new Error("Stripe.js not available"))}},pn=function(e){return O!==null?O:(O=new Promise(function(t,i){if(typeof window>"u"||typeof document>"u"){t(null);return}if(window.Stripe){t(window.Stripe);return}try{var p=cn();if(!(p&&e)){if(!p)p=ce(e);else if(p&&H!==null&&W!==null){var a;p.removeEventListener("load",H),p.removeEventListener("error",W),(a=p.parentNode)===null||a===void 0||a.removeChild(p),p=ce(e)}}H=un(t,i),W=dn(i),p.addEventListener("load",H),p.addEventListener("error",W)}catch(s){i(s);return}}),O.catch(function(t){return O=null,Promise.reject(t)}))},F,mn=function(){return F||(F=pn(null).catch(function(e){return F=null,Promise.reject(e)}),F)};Promise.resolve().then(function(){return mn()}).catch(function(n){console.warn(n)});const vn={class:"flex items-center justify-center h-full"},fn=R({__name:"PaymentStepPaypal",props:{contact:{},currency_id:{},payment_type_id:{},change:{},location_id:{},currency_name:{},total:{}},emits:["created_payment","error_on_payment"],setup(n,{emit:e}){const t=n,i=e,p=h(null),a=pe();return ae(()=>{const s=window.paypal;if(typeof s>"u"){i("error_on_payment","Paypal no está instalado");return}s.Buttons({style:{layout:"vertical",color:"white",shape:"pill",label:"pay",height:45},createOrder:async()=>{const c=await le.functions.invoke("create-payment-intent",{method:"POST",body:{...t}});return c.data.id||i("error_on_payment",c.data.error),c.data.id},onApprove:async c=>{const{data:b,error:m}=await le.functions.invoke("paypal_payment",{method:"POST",body:JSON.stringify({orderID:c.orderID,...t})});m||!(b!=null&&b.success)?(i("error_on_payment"),a.replace("/")):i("created_payment")},onCancel:c=>{console.log(c)},onError:c=>{console.log(c),i("error_on_payment","Error al procesar el pedido")}}).render(p.value)}),(s,c)=>(l(),d("div",vn,[r("div",{class:"mx-auto min-w-96",ref_key:"paypalButton",ref:p},null,512)]))}}),yn={class:"p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-2xl my-4"},hn={class:"flex flex-col bg-white items-center"},_n={class:"p-steps-title !w-24 text-center"},bn={class:"mt-8"},gn=R({__name:"pay-cart",setup(n){const e=je(),t=pe(),i=Te(),p=me(),a=Me(),{t:s}=Ee(),{notify:c}=Le(),b=qe(),m=h(null),_=h({}),v=h(!0),E=h(!1),D=h([]),L=h([]),u=h(null),f=h(),V=h(null),T=h(0),$=Z(()=>parseInt(e.query.location_id)),w=h(1),U=h([{step:1,label:"confirmation"},{step:2,label:"receiver"},{step:3,label:"payment"}]),z=async()=>{var q;E.value=!0;const k=await i.getMyCart();E.value=!1,m.value=(k==null?void 0:k.data)||null,m.value.cart_items.some(J=>J.product.stock<J.quantity)&&(t.push("/cart"),c("error",s("we_are_sorry"),`${s("a_product_is_off_stock")}`,3e3));const g=await p.getAll([],new te(0,100),[]);D.value=g||[];const y=await a.getAll([{field:"id",matchMode:"equals",value:e.query.payment_type_id}],new te(0,100),[]);E.value=!1,v.value=!1,L.value=y||[],L.value.length>0&&(u.value=L.value[0],f.value=(q=u.value.allowed_currencies.find(J=>J.currency.id==parseInt(e.query.pay_currency)))==null?void 0:q.currency)};ae(()=>{z(),V.value=parseInt(e.query.location_id)});const x=Z(()=>V.value?D.value.find(k=>k.id===V.value):null),K=()=>{w.value>1?w.value--:t.push("/cart")},G=h(null);async function ye(k){t.push("/"),i.getMyCart(),c("success",s("puchase_successfull"),"",3e3)}async function he(){c("error",s("there_was_an_error_paying"),"",3e3),await i.restoreCart()}async function oe(){const{anonymous:k,userData:g}=re(),y=await b.createOrder({contact:_.value,currency_id:f.value.id,user_id:k?null:g.id,session_id:k?g.id:null,payment_type_id:u.value.id,change:T.value,location_id:x.value.id});if(y.data.success)console.log(y),G.value=y.data.order_id;else{c("error",y.data.error,"",3e3),t.push("/cart");return}return y}const ie=async()=>{if(u.value.external){w.value=3;return}const k=await oe();k.data.success?(t.push("/"),i.getMyCart(),window.location.href=`https://wa.me/5352058774/?text=${encodeURIComponent(_e())}`,c("success",s("puchase_successfull"),"",3e3)):(c("error",k.data.error,"",3e3),t.push("/cart"))};function _e(){var y;const k=u.value.delivery_included?m.value.total_price+m.value.delivery_price:m.value.total_price,g=u.value.delivery_included?null:x.value.delivery_price;return`
 ${s("buy_resume")}
 ${s("client")}:
 ${s("name")} ${_.value.name}
 ${s("address")} ${_.value.address}
 ${s("phone")} ${_.value.phone_number}
-----------------------------------
${s("products")}:
${m.value.cart_items.map(q=>`	${q.product.name} x ${q.quantity}`).join(`
`)}
-----------------------------------
${s("total")}: ${k} ${f.value.name}
  ${u.value.may_have_change&&T.value>0?`${s("requested_change")}: ${T.value} ${f.value.name}`:""}
  ${u.value.delivery_included?"":`${s("delivery_price")}: ${g} ${(y=u.value.delivery_currency)==null?void 0:y.name}`}
`}return(k,g)=>(l(),d("div",yn,[P(S(ve),{model:U.value,activeIndex:w.value-1,readonly:!0},{item:ee(({item:y})=>[r("div",hn,[r("span",{class:Ve(["p-steps-number bg-[#449ca8] z-30",{"bg-[#30a3af] text-white":w.value>=y.step,"bg-[#449ca8] text-white":w.value<y.step}])},o(y.step),3),r("span",_n,o(k.$t(y.label)),1)])]),_:1},8,["model","activeIndex"]),r("div",bn,[w.value===1?(l(),j(It,{key:0,cart:m.value,selected_payment_type:u.value,selected_currency:f.value,selected_location:x.value,onNext:g[0]||(g[0]=y=>w.value++),onBack:K,change:T.value,"onUpdate:change":g[1]||(g[1]=y=>T.value=y)},null,8,["cart","selected_payment_type","selected_currency","selected_location","change"])):w.value===2?(l(),j(sn,{key:1,modelValue:_.value,"onUpdate:modelValue":g[2]||(g[2]=y=>_.value=y),"location-id":$.value,onNext:ie,onBack:g[3]||(g[3]=y=>w.value--)},null,8,["modelValue","location-id"])):w.value===3?(l(),j(fn,{key:2,contact:_.value,currency_id:f.value.id,payment_type_id:u.value.id,change:T.value,currency_name:f.value.name,location_id:x.value.id,total:m.value.total_price+x.value.delivery_price,onCreated_payment:ye,onCreate_order:oe,onError_on_payment:he,onConfirm:ie,onBack:g[4]||(g[4]=y=>w.value--)},null,8,["contact","currency_id","payment_type_id","change","currency_name","location_id","total"])):I("",!0)])]))}}),Cn=Q(gn,[["__scopeId","data-v-d1b56d7e"]]);export{Cn as default};
