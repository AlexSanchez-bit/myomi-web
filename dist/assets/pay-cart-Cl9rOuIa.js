import{B as ce,o as l,c as d,m as L,a as i,d as ue,i as be,g as ge,F as D,x as O,z as o,u as j,v as $e,b as S,E as R,aL as N,aM as ae,N as Z,y as A,I as T,J as w,n as Q,K as ke,_ as B,A as f,C as se,W as re,w as ee,aN as we,O as Se,aO as xe,P as te,af as Ie,aA as Ce,t as Pe,$ as X,Y as Ee,aP as Te,aF as Le,aG as Ve,X as Me,U as je,G as De,V as Ne,Z as qe}from"./index-BvHB4MlJ.js";import{s as Ae}from"./index-BB2neYam.js";import{u as de}from"./useLocationService-CIJ0FAxB.js";import{u as Fe}from"./useUserService-BDCdTilK.js";import{u as Ue}from"./usePaymentTypes-BQcaY65v.js";import{u as Oe}from"./useOrderService-BOq6wLYG.js";var Re=function(e){var t=e.dt;return`
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
`)},Be={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},ze=ce.extend({name:"progressspinner",theme:Re,classes:Be}),Ke={name:"BaseProgressSpinner",extends:ue,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:ze,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},ne={name:"ProgressSpinner",extends:Ke,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},We=["fill","stroke-width"];function Ge(n,e,t,r,c,s){return l(),d("div",L({class:n.cx("root"),role:"progressbar"},n.ptmi("root")),[(l(),d("svg",L({class:n.cx("spin"),viewBox:"25 25 50 50",style:s.svgStyle},n.ptm("spin")),[i("circle",L({class:n.cx("circle"),cx:"50",cy:"50",r:"20",fill:n.fill,"stroke-width":n.strokeWidth,strokeMiterlimit:"10"},n.ptm("circle")),null,16,We)],16))],16)}ne.render=Ge;var Je=function(e){var t=e.dt;return`
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
`)},Xe={root:function(e){var t=e.props;return["p-steps p-component",{"p-readonly":t.readonly}]},list:"p-steps-list",item:function(e){var t=e.instance,r=e.item,c=e.index;return["p-steps-item",{"p-steps-item-active":t.isActive(c),"p-disabled":t.isItemDisabled(r,c)}]},itemLink:"p-steps-item-link",itemNumber:"p-steps-item-number",itemLabel:"p-steps-item-label"},He=ce.extend({name:"steps",theme:Je,classes:Xe}),Ye={name:"BaseSteps",extends:ue,props:{id:{type:String},model:{type:Array,default:null},readonly:{type:Boolean,default:!0},activeStep:{type:Number,default:0}},style:He,provide:function(){return{$pcSteps:this,$parentInstance:this}}},pe={name:"Steps",extends:Ye,inheritAttrs:!1,emits:["update:activeStep","step-change"],data:function(){return{d_activeStep:this.activeStep}},watch:{activeStep:function(e){this.d_activeStep=e}},mounted:function(){var e=this.findFirstItem();e&&(e.tabIndex="0")},methods:{getPTOptions:function(e,t,r){return this.ptm(e,{context:{item:t,index:r,active:this.isActive(r),disabled:this.isItemDisabled(t,r)}})},onItemClick:function(e,t,r){if(this.disabled(t)||this.readonly){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),r!==this.d_activeStep&&(this.d_activeStep=r,this.$emit("update:activeStep",this.d_activeStep)),this.$emit("step-change",{originalEvent:e,index:r})},onItemKeydown:function(e,t){switch(e.code){case"ArrowRight":{this.navigateToNextItem(e.target),e.preventDefault();break}case"ArrowLeft":{this.navigateToPrevItem(e.target),e.preventDefault();break}case"Home":{this.navigateToFirstItem(e.target),e.preventDefault();break}case"End":{this.navigateToLastItem(e.target),e.preventDefault();break}case"Tab":break;case"Enter":case"NumpadEnter":case"Space":{this.onItemClick(e,t),e.preventDefault();break}}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?t.children[0]:null},findFirstItem:function(){var e=be(this.$refs.list,'[data-pc-section="item"]');return e?e.children[0]:null},findLastItem:function(){var e=ge(this.$refs.list,'[data-pc-section="item"]');return e?e[e.length-1].children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex="-1",t.tabIndex="0",t.focus()},isActive:function(e){return e===this.d_activeStep},isItemDisabled:function(e,t){return this.disabled(e)||this.readonly&&!this.isActive(t)},visible:function(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled=="function"?e.disabled():e.disabled},label:function(e){return typeof e.label=="function"?e.label():e.label},getMenuItemProps:function(e,t){var r=this;return{action:L({class:this.cx("itemLink"),onClick:function(s){return r.onItemClick(s,e)},onKeyDown:function(s){return r.onItemKeydown(s,e)}},this.getPTOptions("itemLink",e,t)),step:L({class:this.cx("itemNumber")},this.getPTOptions("itemNumber",e,t)),label:L({class:this.cx("itemLabel")},this.getPTOptions("itemLabel",e,t))}}}},Ze=["id"],Qe=["aria-current","onClick","onKeydown","data-p-active","data-p-disabled"];function et(n,e,t,r,c,s){return l(),d("nav",L({id:n.id,class:n.cx("root")},n.ptmi("root")),[i("ol",L({ref:"list",class:n.cx("list")},n.ptm("list")),[(l(!0),d(D,null,O(n.model,function(a,p){return l(),d(D,{key:s.label(a)+"_"+p.toString()},[s.visible(a)?(l(),d("li",L({key:0,class:[n.cx("item",{item:a,index:p}),a.class],style:a.style,"aria-current":s.isActive(p)?"step":void 0,onClick:function(m){return s.onItemClick(m,a,p)},onKeydown:function(m){return s.onItemKeydown(m,a,p)},ref_for:!0},s.getPTOptions("item",a,p),{"data-p-active":s.isActive(p),"data-p-disabled":s.isItemDisabled(a,p)}),[n.$slots.item?(l(),j($e(n.$slots.item),{key:1,item:a,index:p,active:p===c.d_activeStep,label:s.label(a),props:s.getMenuItemProps(a,p)},null,8,["item","index","active","label","props"])):(l(),d("span",L({key:0,class:n.cx("itemLink"),ref_for:!0},s.getPTOptions("itemLink",a,p)),[i("span",L({class:n.cx("itemNumber"),ref_for:!0},s.getPTOptions("itemNumber",a,p)),o(p+1),17),i("span",L({class:n.cx("itemLabel"),ref_for:!0},s.getPTOptions("itemLabel",a,p)),o(s.label(a)),17)],16))],16,Qe)):S("",!0)],64)}),128))],16)],16,Ze)}pe.render=et;const tt={key:0,class:"space-y-6"},nt={class:"text-xl md:text-2xl font-bold text-pink-600 mb-4"},at={class:"p-4 border rounded-lg shadow-md backdrop-blur-md"},st={class:"text-lg font-semibold mb-2"},rt={class:""},it={class:"line-clamp-1 font-medium"},ot={class:""},lt={class:"text-pink-700 font-semibold"},ct={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md flex flex-col gap-3"},ut={class:"text-lg font-semibold text-pink-700"},dt={class:"font-medium"},pt={class:"font-medium"},mt={key:0,class:"font-medium"},vt={key:1,class:"text-pink-700"},ft={class:"flex flex-row items-center justify-center text-lg md:text-2xl text-justify"},yt={key:0,class:"font-semibold flex flex-row items-center justify-end sm:text-xl"},ht={class:"mr-2"},_t={key:1,class:"text-center font-semibold flex flex-wrap items-center justify-center"},bt={class:"mr-2"},gt={class:"flex flex-row items-center gap-1"},$t={class:"flex flex-row items-center gap-1"},kt={key:0,class:"flex flex-row items-center gap-1"},wt={key:0,class:"w-full flex flex-row justify-center md:justify-end"},St={class:"flex flex-col"},xt={for:"mile",class:"font-bold block mb-0.5 text-sm"},It={class:"text-zinc-400"},Ct={class:"flex justify-between mt-6"},Pt={key:1,class:"flex flex-col gap-2"},Et=R({__name:"ConfirmationStep",props:N({cart:{type:Object,required:!0},selected_payment_type:{type:Object,required:!0},selected_currency:{type:Object,required:!0},selected_location:{type:Object,required:!0}},{change:{},changeModifiers:{}}),emits:N(["next","backt","update:change"],["update:change"]),setup(n,{emit:e}){const t=n,r=ae(n,"change"),c=Z(()=>{let s=t.cart?t.cart.total_price:0;return s+=t.selected_location.delivery_price,s});return(s,a)=>{var p,$,m,y,v,E,b,x,u,h,M,V,I,C,z,K;return n.cart&&n.selected_currency&&n.selected_payment_type&&n.selected_location?(l(),d("div",tt,[i("h2",nt,o(s.$t("confirm_payment_information")),1),i("div",at,[i("h3",st,o(s.$t("cart_summary")),1),(l(!0),d(D,null,O(n.cart.cart_items,P=>{var W,G;return l(),d("div",{key:P.product.id,class:"mb-4"},[i("p",rt,[i("span",it,o(P.product.name),1),i("small",ot,[A(o(P.quantity)+" x "+o((P.product.price*((W=n.selected_currency)==null?void 0:W.change_value)).toFixed(2))+" ",1),i("span",null,o((G=n.selected_currency)==null?void 0:G.name),1)])])])}),128)),i("p",lt,[A(o(s.$t("total"))+": "+o((n.cart.total_price*((p=n.selected_currency)==null?void 0:p.change_value)).toFixed(2))+" ",1),i("span",null,o(($=n.selected_currency)==null?void 0:$.name),1)])]),i("div",ct,[i("h3",ut,o(s.$t("payment_and_shipping_summary")),1),i("p",dt,o(s.$t("payment_method"))+": "+o((m=n.selected_payment_type)==null?void 0:m.name),1),i("p",pt,o(s.$t("delivery_location"))+": "+o((y=n.selected_location)==null?void 0:y.name),1),n.selected_payment_type.delivery_included?(l(),d("p",mt,[A(o(s.$t("delivery_price"))+": "+o((v=n.selected_location)==null?void 0:v.delivery_price)+" ",1),i("span",null,o((E=n.selected_currency)==null?void 0:E.name),1)])):S("",!0),n.selected_payment_type.delivery_included?S("",!0):(l(),d("p",vt,[A(o(s.$t("delivery_price"))+": "+o(((b=n.selected_location)==null?void 0:b.delivery_price)*((x=n.selected_payment_type.delivery_currency)==null?void 0:x.change_value))+" ",1),i("span",null,o((u=n.selected_payment_type.delivery_currency)==null?void 0:u.name),1)]))]),i("div",ft,[n.selected_payment_type.delivery_included?(l(),d("div",yt,[i("span",ht,o(s.$t("total_to_pay"))+": ",1),i("span",null,o((c.value*((h=n.selected_currency)==null?void 0:h.change_value)).toFixed(2))+" "+o((M=n.selected_currency)==null?void 0:M.name),1)])):(l(),d("div",_t,[i("span",bt,o(s.$t("total_to_pay"))+": ",1),i("span",gt,[i("span",$t,o((n.cart.total_price*((V=n.selected_currency)==null?void 0:V.change_value)).toFixed(2))+" "+o((I=n.selected_currency)==null?void 0:I.name),1),n.selected_location?(l(),d("span",kt,[a[2]||(a[2]=i("i",{class:"pi pi-plus px-1"},null,-1)),A(" "+o((((C=n.selected_location)==null?void 0:C.delivery_price)*((z=n.selected_payment_type.delivery_currency)==null?void 0:z.change_value)).toFixed(2))+" "+o((K=n.selected_payment_type.delivery_currency)==null?void 0:K.name),1)])):S("",!0)])]))]),n.selected_payment_type.may_have_change?(l(),d("div",wt,[i("div",St,[i("label",xt,o(s.$t("change_needed")),1),T(w(Ae),{modelValue:r.value,"onUpdate:modelValue":a[0]||(a[0]=P=>r.value=P),"input-id":"mile",size:"small",suffix:` ${n.selected_currency.name}`},null,8,["modelValue","suffix"]),i("small",It,o(s.$t("in_case_is_needed")),1)])])):S("",!0),i("div",Ct,[T(w(Q),{label:s.$t("receiver_data"),class:"p-button-primary pastel-btn w-full !border-none !focus:border-none",onClick:a[1]||(a[1]=P=>s.$emit("next"))},null,8,["label"])])])):(l(),d("div",Pt,[(l(),d(D,null,O(3,P=>T(w(ke),{key:P,class:"w-full !h-32"})),64))]))}}}),Tt=B(Et,[["__scopeId","data-v-3344a7c0"]]),Lt={key:0,class:"text-center"},Vt={key:1},Mt=["onClick"],jt={class:""},Dt={class:"text-sm text-gray-600"},Nt={class:"text-sm text-gray-600"},qt={key:0,class:"flex flex-col items-center justify-center"},At={key:0,class:"text-center"},Ft={key:1},Ut=["onClick"],Ot={class:""},Rt={class:"text-sm text-gray-600"},Bt={class:"text-sm text-gray-600"},zt={key:0,class:"flex flex-col items-center justify-center"},Kt=R({__name:"ContactDialog",props:N({locationId:{type:Number,required:!0}},{modelValue:{type:Boolean},modelModifiers:{}}),emits:N(["update:visible","select-contact"],["update:modelValue"]),setup(n,{emit:e}){const t=n,r=ae(n,"modelValue"),c=e,s=f([]),a=f(!0),p=Z(()=>window.innerWidth<=768);se(async()=>{const m=Fe(),{userData:y}=re(),{data:v}=await m.getContacts(y.id,t.locationId);s.value=v??[],a.value=!1});const $=m=>{c("select-contact",m),c("update:visible",!1)};return(m,y)=>(l(),d(D,null,[!p.value&&!a.value?(l(),j(w(we),{key:0,visible:r.value,"onUpdate:visible":y[0]||(y[0]=v=>r.value=v),header:m.$t("select_a_contact"),modal:!0,class:"p-fluid"},{default:ee(()=>[a.value?(l(),d("div",Lt,[T(w(ne))])):(l(),d("div",Vt,[(l(!0),d(D,null,O(s.value,v=>(l(),d("div",{key:v.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:E=>$(v)},[i("p",jt,o(v.name),1),i("p",Dt,o(v.phone_number),1),i("p",Nt,o(v.address)+"- "+o(v.municipality.name),1)],8,Mt))),128)),!s.value||s.value.length==0?(l(),d("div",qt,[i("h5",null,o(m.$t("no_contacts")),1)])):S("",!0)]))]),_:1},8,["visible","header"])):S("",!0),p.value&&!a.value?(l(),j(w(Se),{key:1,visible:r.value,"onUpdate:visible":y[1]||(y[1]=v=>r.value=v),position:"bottom",style:{height:"70dvh",borderRadius:"1rem 1rem 0 0"},header:m.$t("select_a_contact")},{default:ee(()=>[a.value?(l(),d("div",At,[T(w(ne))])):(l(),d("div",Ft,[(l(!0),d(D,null,O(s.value,v=>(l(),d("div",{key:v.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:E=>$(v)},[i("p",Ot,o(v.name),1),i("p",Rt,o(v.phone_number),1),i("p",Bt,o(v.address)+"- "+o(v.municipality.name),1)],8,Ut))),128)),!s.value||s.value.length==0?(l(),d("div",zt,[i("h5",null,o(m.$t("no_contacts")),1)])):S("",!0)]))]),_:1},8,["visible","header"])):S("",!0)],64))}}),Wt=B(Kt,[["__scopeId","data-v-b5a24a3c"]]),Gt={class:"space-y-6"},Jt={class:"text-2xl font-bold text-pink-600 mb-4"},Xt={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"},Ht={class:"mb-4"},Yt={class:"relative"},Zt={key:0,class:"p-error"},Qt={class:"mb-4"},en={key:0,class:"p-error"},tn={class:"mb-4"},nn={key:0,class:"p-error"},an={class:"mb-4"},sn={key:2,class:"p-error"},rn={class:"flex justify-between mt-6"},on=R({__name:"RecipientStep",props:N({locationId:{type:Number,required:!0}},{modelValue:{},modelModifiers:{}}),emits:N(["next","back"],["update:modelValue"]),setup(n,{emit:e}){const t=n,r=f(!1),{anonymous:c}=re(),s=e,a=ae(n,"modelValue"),p=f(!1),$=f(!1),m=f(!1),y=f(!1),v=f(!1),E=()=>{v.value=!0},b=u=>{a.value.name=u.name,a.value.phone_number=u.phone_number,a.value.address=u.address,v.value=!1};xe(async()=>{if(t.locationId){const u=await de().getAll([{field:"id",matchMode:"equals",value:t.locationId}],new te(0,1),[]);u&&u.length>0&&(a.value.municipality=u[0])}});const x=()=>{p.value=!a.value.name,$.value=!a.value.phone_number,m.value=!a.value.address,y.value=!a.value.municipality,!p.value&&!$.value&&!m.value&&!y.value&&(r.value=!0,s("next"))};return(u,h)=>{const M=Pe("Skeleton"),V=Ce("tooltip");return l(),d("div",Gt,[i("h2",Jt,o(u.$t("receiver_data")),1),i("div",Xt,[i("div",Ht,[i("div",Yt,[T(w(X),{modelValue:a.value.name,"onUpdate:modelValue":h[0]||(h[0]=I=>a.value.name=I),placeholder:u.$t("name"),class:"w-full pl-10"},null,8,["modelValue","placeholder"]),w(c)?S("",!0):Ie((l(),d("i",{key:0,class:"pi pi-user absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 cursor-pointer rounded-full bg-blue-100/60 p-2",onClick:E},null,512)),[[V,u.$t("select_a_contact"),void 0,{bottom:!0}]])]),p.value?(l(),d("small",Zt,o(u.$t("field_required")),1)):S("",!0)]),i("div",Qt,[T(w(X),{modelValue:a.value.phone_number,"onUpdate:modelValue":h[1]||(h[1]=I=>a.value.phone_number=I),placeholder:u.$t("phone"),class:"w-full"},null,8,["modelValue","placeholder"]),$.value?(l(),d("small",en,o(u.$t("field_required")),1)):S("",!0)]),i("div",tn,[T(w(X),{modelValue:a.value.address,"onUpdate:modelValue":h[2]||(h[2]=I=>a.value.address=I),placeholder:u.$t("address"),class:"w-full"},null,8,["modelValue","placeholder"]),m.value?(l(),d("small",nn,o(u.$t("field_required")),1)):S("",!0)]),i("div",an,[a.value.municipality?(l(),j(w(X),{key:0,modelValue:a.value.municipality.name,"onUpdate:modelValue":h[3]||(h[3]=I=>a.value.municipality.name=I),placeholder:u.$t("municipality"),class:"w-full",disabled:""},null,8,["modelValue","placeholder"])):(l(),j(M,{key:1,class:"w-full"})),y.value?(l(),d("small",sn,o(u.$t("field_required")),1)):S("",!0)])]),i("div",rn,[T(w(Q),{label:u.$t("back"),icon:"pi pi-arrow-left",class:"p-button-secondary pastel-btn",onClick:h[4]||(h[4]=I=>u.$emit("back"))},null,8,["label"]),T(w(Q),{label:u.$t("pay"),icon:"pi pi-arrow-right",iconPos:"right",class:"p-button-primary pastel-btn",loading:r.value,onClick:x},null,8,["label","loading"])]),T(Wt,{modelValue:v.value,"onUpdate:modelValue":h[5]||(h[5]=I=>v.value=I),locationId:n.locationId,onSelectContact:b},null,8,["modelValue","locationId"])])}}}),ln=B(on,[["__scopeId","data-v-c3261b53"]]);var me="https://js.stripe.com",cn="".concat(me,"/v3"),un=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,dn=/^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;var pn=function(e){return un.test(e)||dn.test(e)},mn=function(){for(var e=document.querySelectorAll('script[src^="'.concat(me,'"]')),t=0;t<e.length;t++){var r=e[t];if(pn(r.src))return r}return null},le=function(e){var t="",r=document.createElement("script");r.src="".concat(cn).concat(t);var c=document.head||document.body;if(!c)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return c.appendChild(r),r},vn=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"5.7.0",startTime:t})},F=null,H=null,Y=null,fn=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},yn=function(e,t){return function(){window.Stripe?e(window.Stripe):t(new Error("Stripe.js not available"))}},hn=function(e){return F!==null?F:(F=new Promise(function(t,r){if(typeof window>"u"||typeof document>"u"){t(null);return}if(window.Stripe){t(window.Stripe);return}try{var c=mn();if(!(c&&e)){if(!c)c=le(e);else if(c&&Y!==null&&H!==null){var s;c.removeEventListener("load",Y),c.removeEventListener("error",H),(s=c.parentNode)===null||s===void 0||s.removeChild(c),c=le(e)}}Y=yn(t,r),H=fn(r),c.addEventListener("load",Y),c.addEventListener("error",H)}catch(a){r(a);return}}),F.catch(function(t){return F=null,Promise.reject(t)}))},_n=function(e,t,r){if(e===null)return null;var c=e.apply(void 0,t);return vn(c,r),c},U,ve=!1,fe=function(){return U||(U=hn(null).catch(function(e){return U=null,Promise.reject(e)}),U)};Promise.resolve().then(function(){return fe()}).catch(function(n){ve||console.warn(n)});var bn=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];ve=!0;var c=Date.now();return fe().then(function(s){return _n(s,t,c)})};const gn={class:"form-title"},$n={class:"form-group"},kn={for:"card-element"},wn={key:0,class:"error-message"},Sn={class:"form-hint"},xn=R({__name:"PaymentStep",props:{contact:{},currency_id:{},payment_type_id:{},change:{},location_id:{},currency_name:{},total:{}},emits:["created_payment","error_on_payment"],setup(n,{emit:e}){const t=n,r=f(!1),c=f(null),s=f(null),a=f(null),p=f(""),$=f(null),m=f(!1),y=f("");se(async()=>{r.value=!0,c.value=await bn(Te),r.value=!1,s.value=c.value.elements({appearance:{theme:"flat"}}),a.value=s.value.create("card"),a.value.mount("#card-element"),a.value.on("change",b=>{m.value=b.complete,y.value=b.error?b.error.message:""}),$.value=s.value.create("paymentMethodMessaging",{paymentMethodType:"card",layout:"horizontal",iconStyle:"default",currency:t.currency_name.toUpperCase(),countryCode:"US",amount:t.total*100}),$.value.mount("#payment-messaging")});const v=async()=>{if(!m.value){y.value="Por favor, ingrese los datos de la tarjeta correctamente.";return}r.value=!0;const{data:b,error:x}=await Le.functions.invoke("create-payment-intent",{method:"POST",body:{...t}});if(r.value=!1,x){y.value="Error al generar el pago.";return}p.value=b.clientSecret,r.value=!0;const{paymentIntent:u,error:h}=await c.value.confirmCardPayment(p.value,{payment_method:{card:a.value}});r.value=!1,h||u.status!=="succeeded"?(y.value=(h==null?void 0:h.message)||"El pago no pudo completarse.",E("error_on_payment")):E("created_payment",u.id)},E=e;return(b,x)=>(l(),d("form",{onSubmit:Ee(v,["prevent"]),class:"payment-form"},[i("h2",gn,o(b.$t("secure_payment")),1),i("div",$n,[i("label",kn,o(b.$t("credit_or_debit_card")),1),x[0]||(x[0]=i("div",{id:"card-element",class:"card-input"},null,-1)),y.value?(l(),d("p",wn,o(y.value),1)):S("",!0),x[1]||(x[1]=i("div",{id:"payment-messaging",class:"messaging-input"},null,-1)),i("p",Sn,o(b.$t("data_will_be_secure_and_encrypted")),1)]),T(w(Q),{type:"submit",class:"btn-pay",loading:r.value,disabled:!m.value||r.value,label:`💳 ${b.$t("make_pay")} ${t.total.toFixed(2)} ${t.currency_name.toUpperCase()}`},null,8,["loading","disabled","label"])],32))}}),In=B(xn,[["__scopeId","data-v-5e25be40"]]),Cn={class:"p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-2xl my-4"},Pn={class:"flex flex-col bg-white items-center"},En={class:"p-steps-title !w-24 text-center"},Tn={class:"mt-8"},Ln=R({__name:"pay-cart",setup(n){const e=Ne(),t=qe(),r=Ve(),c=de(),s=Ue(),{t:a}=Me(),{notify:p}=je(),$=Oe(),m=f(null),y=f({}),v=f(!0),E=f(!1),b=f([]),x=f([]),u=f(null),h=f(),M=f(null),V=f(0),I=Z(()=>parseInt(e.query.location_id)),C=f(1),z=f([{step:1,label:"confirmation"},{step:2,label:"receiver"},{step:3,label:"payment"}]),K=async()=>{var q;E.value=!0;const k=await r.getMyCart();E.value=!1,m.value=(k==null?void 0:k.data)||null,m.value.cart_items.some(J=>J.product.stock<J.quantity)&&(t.push("/cart"),p("error",a("we_are_sorry"),`${a("a_product_is_off_stock")}`,3e3));const g=await c.getAll([],new te(0,100),[]);b.value=g||[];const _=await s.getAll([{field:"id",matchMode:"equals",value:e.query.payment_type_id}],new te(0,100),[]);E.value=!1,v.value=!1,x.value=_||[],x.value.length>0&&(u.value=x.value[0],h.value=(q=u.value.allowed_currencies.find(J=>J.currency.id==parseInt(e.query.pay_currency)))==null?void 0:q.currency)};se(()=>{K(),M.value=parseInt(e.query.location_id)});const P=Z(()=>M.value?b.value.find(k=>k.id===M.value):null),W=()=>{C.value>1?C.value--:t.push("/cart")},G=f(null);async function ye(k){t.push("/"),r.getMyCart(),p("success",a("puchase_successfull"),"",3e3)}async function he(){p("error",a("there_was_an_error_paying"),"",3e3),await r.restoreCart()}async function ie(){const{anonymous:k,userData:g}=re(),_=await $.createOrder({contact:y.value,currency_id:h.value.id,user_id:k?null:g.id,session_id:k?g.id:null,payment_type_id:u.value.id,change:V.value,location_id:P.value.id});if(_.data.success)console.log(_),G.value=_.data.order_id;else{p("error",_.data.error,"",3e3),t.push("/cart");return}return _}const oe=async()=>{if(u.value.external){C.value=3;return}const k=await ie();k.data.success?(t.push("/"),r.getMyCart(),window.location.href=`https://wa.me/5352058774/?text=${encodeURIComponent(_e())}`,p("success",a("puchase_successfull"),"",3e3)):(p("error",k.data.error,"",3e3),t.push("/cart"))};function _e(){var _;const k=u.value.delivery_included?m.value.total_price+m.value.delivery_price:m.value.total_price,g=u.value.delivery_included?null:P.value.delivery_price;return`
 ${a("buy_resume")}
 ${a("client")}:
 ${a("name")} ${y.value.name}
 ${a("address")} ${y.value.address}
 ${a("phone")} ${y.value.phone_number}
-----------------------------------
${a("products")}:
${m.value.cart_items.map(q=>`	${q.product.name} x ${q.quantity}`).join(`
`)}
-----------------------------------
${a("total")}: ${k} ${h.value.name}
  ${u.value.may_have_change&&V.value>0?`${a("requested_change")}: ${V.value} ${h.value.name}`:""}
  ${u.value.delivery_included?"":`${a("delivery_price")}: ${g} ${(_=u.value.delivery_currency)==null?void 0:_.name}`}
`}return(k,g)=>(l(),d("div",Cn,[T(w(pe),{model:z.value,activeIndex:C.value-1,readonly:!0},{item:ee(({item:_})=>[i("div",Pn,[i("span",{class:De(["p-steps-number bg-[#449ca8] z-30",{"bg-[#30a3af] text-white":C.value>=_.step,"bg-[#449ca8] text-white":C.value<_.step}])},o(_.step),3),i("span",En,o(k.$t(_.label)),1)])]),_:1},8,["model","activeIndex"]),i("div",Tn,[C.value===1?(l(),j(Tt,{key:0,cart:m.value,selected_payment_type:u.value,selected_currency:h.value,selected_location:P.value,onNext:g[0]||(g[0]=_=>C.value++),onBack:W,change:V.value,"onUpdate:change":g[1]||(g[1]=_=>V.value=_)},null,8,["cart","selected_payment_type","selected_currency","selected_location","change"])):C.value===2?(l(),j(ln,{key:1,modelValue:y.value,"onUpdate:modelValue":g[2]||(g[2]=_=>y.value=_),"location-id":I.value,onNext:oe,onBack:g[3]||(g[3]=_=>C.value--)},null,8,["modelValue","location-id"])):C.value===3?(l(),j(In,{key:2,contact:y.value,currency_id:h.value.id,payment_type_id:u.value.id,change:V.value,currency_name:h.value.name,location_id:P.value.id,total:m.value.total_price+P.value.delivery_price,onCreated_payment:ye,onCreate_order:ie,onError_on_payment:he,onConfirm:oe,onBack:g[4]||(g[4]=_=>C.value--)},null,8,["contact","currency_id","payment_type_id","change","currency_name","location_id","total"])):S("",!0)])]))}}),An=B(Ln,[["__scopeId","data-v-a5233300"]]);export{An as default};
