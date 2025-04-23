import{B as ie,o as l,c,m as S,a as i,d as le,i as me,g as ve,F as O,x as j,z as o,u as A,v as ye,b as $,E as U,aL as q,aM as ee,N as E,y as B,I as C,J as I,n as H,K as fe,_ as X,A as f,C as te,W as ne,w as Z,aN as he,O as _e,aO as be,P as Q,af as ge,aA as ke,t as $e,$ as J,aF as oe,Z as re,aG as xe,X as we,U as Ie,G as Se,V as Ce}from"./index-CBdX18cr.js";import{s as Te}from"./index-BAWyN3nY.js";import{u as ce}from"./useLocationService-C5btpUu1.js";import{u as Pe}from"./useUserService--7CqTPT5.js";import{u as Ve}from"./usePaymentTypes-QuXD-2dL.js";import{u as De}from"./useOrderService-BoR6lZMM.js";var Ne=function(n){var e=n.dt;return`
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
    stroke: `.concat(e("progressspinner.color.1"),`;
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
        stroke: `).concat(e("progressspinner.color.1"),`;
    }
    40% {
        stroke: `).concat(e("progressspinner.color.2"),`;
    }
    66% {
        stroke: `).concat(e("progressspinner.color.3"),`;
    }
    80%,
    90% {
        stroke: `).concat(e("progressspinner.color.4"),`;
    }
}
`)},Me={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},Ae=ie.extend({name:"progressspinner",theme:Ne,classes:Me}),Fe={name:"BaseProgressSpinner",extends:le,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:Ae,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},Y={name:"ProgressSpinner",extends:Fe,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},Oe=["fill","stroke-width"];function qe(t,n,e,u,_,a){return l(),c("div",S({class:t.cx("root"),role:"progressbar"},t.ptmi("root")),[(l(),c("svg",S({class:t.cx("spin"),viewBox:"25 25 50 50",style:a.svgStyle},t.ptm("spin")),[i("circle",S({class:t.cx("circle"),cx:"50",cy:"50",r:"20",fill:t.fill,"stroke-width":t.strokeWidth,strokeMiterlimit:"10"},t.ptm("circle")),null,16,Oe)],16))],16)}Y.render=qe;var Le=function(n){var e=n.dt;return`
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
    border-top: 2px solid `.concat(e("steps.separator.background"),`;
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
    transition: outline-color `).concat(e("steps.transition.duration"),", box-shadow ").concat(e("steps.transition.duration"),`;
    border-radius: `).concat(e("steps.item.link.border.radius"),`;
    outline-color: transparent;
    gap: `).concat(e("steps.item.link.gap"),`;
}

.p-steps-item-link:not(.p-disabled):focus-visible {
    box-shadow: `).concat(e("steps.item.link.focus.ring.shadow"),`;
    outline: `).concat(e("steps.item.link.focus.ring.width")," ").concat(e("steps.item.link.focus.ring.style")," ").concat(e("steps.item.link.focus.ring.color"),`;
    outline-offset: `).concat(e("steps.item.link.focus.ring.offset"),`;
}

.p-steps-item-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    color: `).concat(e("steps.item.label.color"),`;
    display: block;
    font-weight: `).concat(e("steps.item.label.font.weight"),`;
}

.p-steps-item-number {
    display: flex;
    align-items: center;
    justify-content: center;
    color: `).concat(e("steps.item.number.color"),`;
    border: 2px solid `).concat(e("steps.item.number.border.color"),`;
    background: `).concat(e("steps.item.number.background"),`;
    min-width: `).concat(e("steps.item.number.size"),`;
    height: `).concat(e("steps.item.number.size"),`;
    line-height: `).concat(e("steps.item.number.size"),`;
    font-size: `).concat(e("steps.item.number.font.size"),`;
    z-index: 1;
    border-radius: `).concat(e("steps.item.number.border.radius"),`;
    position: relative;
    font-weight: `).concat(e("steps.item.number.font.weight"),`;
}

.p-steps-item-number::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: `).concat(e("steps.item.number.border.radius"),`;
    box-shadow: `).concat(e("steps.item.number.shadow"),`;
}

.p-steps:not(.p-readonly) .p-steps-item {
    cursor: pointer;
}

.p-steps-item-active .p-steps-item-number {
    background: `).concat(e("steps.item.number.active.background"),`;
    border-color: `).concat(e("steps.item.number.active.border.color"),`;
    color: `).concat(e("steps.item.number.active.color"),`;
}

.p-steps-item-active .p-steps-item-label {
    color: `).concat(e("steps.item.label.active.color"),`;
}
`)},Be={root:function(n){var e=n.props;return["p-steps p-component",{"p-readonly":e.readonly}]},list:"p-steps-list",item:function(n){var e=n.instance,u=n.item,_=n.index;return["p-steps-item",{"p-steps-item-active":e.isActive(_),"p-disabled":e.isItemDisabled(u,_)}]},itemLink:"p-steps-item-link",itemNumber:"p-steps-item-number",itemLabel:"p-steps-item-label"},je=ie.extend({name:"steps",theme:Le,classes:Be}),Ee={name:"BaseSteps",extends:le,props:{id:{type:String},model:{type:Array,default:null},readonly:{type:Boolean,default:!0},activeStep:{type:Number,default:0}},style:je,provide:function(){return{$pcSteps:this,$parentInstance:this}}},de={name:"Steps",extends:Ee,inheritAttrs:!1,emits:["update:activeStep","step-change"],data:function(){return{d_activeStep:this.activeStep}},watch:{activeStep:function(n){this.d_activeStep=n}},mounted:function(){var n=this.findFirstItem();n&&(n.tabIndex="0")},methods:{getPTOptions:function(n,e,u){return this.ptm(n,{context:{item:e,index:u,active:this.isActive(u),disabled:this.isItemDisabled(e,u)}})},onItemClick:function(n,e,u){if(this.disabled(e)||this.readonly){n.preventDefault();return}e.command&&e.command({originalEvent:n,item:e}),u!==this.d_activeStep&&(this.d_activeStep=u,this.$emit("update:activeStep",this.d_activeStep)),this.$emit("step-change",{originalEvent:n,index:u})},onItemKeydown:function(n,e){switch(n.code){case"ArrowRight":{this.navigateToNextItem(n.target),n.preventDefault();break}case"ArrowLeft":{this.navigateToPrevItem(n.target),n.preventDefault();break}case"Home":{this.navigateToFirstItem(n.target),n.preventDefault();break}case"End":{this.navigateToLastItem(n.target),n.preventDefault();break}case"Tab":break;case"Enter":case"NumpadEnter":case"Space":{this.onItemClick(n,e),n.preventDefault();break}}},navigateToNextItem:function(n){var e=this.findNextItem(n);e&&this.setFocusToMenuitem(n,e)},navigateToPrevItem:function(n){var e=this.findPrevItem(n);e&&this.setFocusToMenuitem(n,e)},navigateToFirstItem:function(n){var e=this.findFirstItem(n);e&&this.setFocusToMenuitem(n,e)},navigateToLastItem:function(n){var e=this.findLastItem(n);e&&this.setFocusToMenuitem(n,e)},findNextItem:function(n){var e=n.parentElement.nextElementSibling;return e?e.children[0]:null},findPrevItem:function(n){var e=n.parentElement.previousElementSibling;return e?e.children[0]:null},findFirstItem:function(){var n=me(this.$refs.list,'[data-pc-section="item"]');return n?n.children[0]:null},findLastItem:function(){var n=ve(this.$refs.list,'[data-pc-section="item"]');return n?n[n.length-1].children[0]:null},setFocusToMenuitem:function(n,e){n.tabIndex="-1",e.tabIndex="0",e.focus()},isActive:function(n){return n===this.d_activeStep},isItemDisabled:function(n,e){return this.disabled(n)||this.readonly&&!this.isActive(e)},visible:function(n){return typeof n.visible=="function"?n.visible():n.visible!==!1},disabled:function(n){return typeof n.disabled=="function"?n.disabled():n.disabled},label:function(n){return typeof n.label=="function"?n.label():n.label},getMenuItemProps:function(n,e){var u=this;return{action:S({class:this.cx("itemLink"),onClick:function(a){return u.onItemClick(a,n)},onKeyDown:function(a){return u.onItemKeydown(a,n)}},this.getPTOptions("itemLink",n,e)),step:S({class:this.cx("itemNumber")},this.getPTOptions("itemNumber",n,e)),label:S({class:this.cx("itemLabel")},this.getPTOptions("itemLabel",n,e))}}}},Ue=["id"],ze=["aria-current","onClick","onKeydown","data-p-active","data-p-disabled"];function Ke(t,n,e,u,_,a){return l(),c("nav",S({id:t.id,class:t.cx("root")},t.ptmi("root")),[i("ol",S({ref:"list",class:t.cx("list")},t.ptm("list")),[(l(!0),c(O,null,j(t.model,function(s,r){return l(),c(O,{key:a.label(s)+"_"+r.toString()},[a.visible(s)?(l(),c("li",S({key:0,class:[t.cx("item",{item:s,index:r}),s.class],style:s.style,"aria-current":a.isActive(r)?"step":void 0,onClick:function(p){return a.onItemClick(p,s,r)},onKeydown:function(p){return a.onItemKeydown(p,s,r)},ref_for:!0},a.getPTOptions("item",s,r),{"data-p-active":a.isActive(r),"data-p-disabled":a.isItemDisabled(s,r)}),[t.$slots.item?(l(),A(ye(t.$slots.item),{key:1,item:s,index:r,active:r===_.d_activeStep,label:a.label(s),props:a.getMenuItemProps(s,r)},null,8,["item","index","active","label","props"])):(l(),c("span",S({key:0,class:t.cx("itemLink"),ref_for:!0},a.getPTOptions("itemLink",s,r)),[i("span",S({class:t.cx("itemNumber"),ref_for:!0},a.getPTOptions("itemNumber",s,r)),o(r+1),17),i("span",S({class:t.cx("itemLabel"),ref_for:!0},a.getPTOptions("itemLabel",s,r)),o(a.label(s)),17)],16))],16,ze)):$("",!0)],64)}),128))],16)],16,Ue)}de.render=Ke;const Re={key:0,class:"space-y-6"},We={class:"text-xl md:text-2xl font-bold text-pink-600 mb-4"},Ge={class:"p-4 border rounded-lg shadow-md backdrop-blur-md"},Je={class:"text-lg font-semibold mb-2"},Xe={class:""},He={class:"line-clamp-1 font-medium"},Ze={class:""},Qe={class:"text-pink-700 font-semibold"},Ye={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md flex flex-col gap-3"},et={class:"text-lg font-semibold text-pink-700"},tt={class:"font-medium"},nt={key:0,class:"font-medium"},st={class:"font-medium"},at={key:1,class:"font-medium"},ot={key:2,class:"text-pink-700"},it={class:"flex flex-row items-center justify-center text-lg md:text-2xl text-justify"},lt={key:0,class:"font-semibold flex flex-row items-center justify-end sm:text-xl"},rt={class:"mr-2"},ct={key:1,class:"text-center font-semibold flex flex-wrap items-center justify-center"},dt={class:"mr-2"},ut={class:"flex flex-row items-center gap-1"},pt={class:"flex flex-row items-center gap-1"},mt={key:0,class:"flex flex-row items-center gap-1"},vt={key:0,class:"w-full flex flex-row justify-center md:justify-end"},yt={class:"flex flex-col"},ft={for:"mile",class:"font-bold block mb-0.5 text-sm"},ht={class:"text-zinc-400"},_t={class:"flex justify-between mt-6"},bt={key:1,class:"flex flex-col gap-2"},gt=U({__name:"ConfirmationStep",props:q({cart:{type:Object,required:!0},selected_payment_type:{type:Object,required:!0},selected_currency:{type:Object,required:!0},selected_location:{type:Object,required:!0}},{change:{},changeModifiers:{}}),emits:q(["next","backt","update:change"],["update:change"]),setup(t,{emit:n}){const e=t,u=ee(t,"change");E(()=>{let a=e.cart?e.cart.total_price:0;return a+=e.selected_location.delivery_price,a});const _=E(()=>{var s;let a=e.cart?e.cart.total_price:0;return a+=e.selected_location.delivery_price,((s=e.selected_payment_type.value)==null?void 0:s.fee)>0&&(a+=e.selected_payment_type.value.fee),a});return(a,s)=>{var r,b,p,h,m,V,F,D,d,v,N,T,x,w,z,K,M;return t.cart&&t.selected_currency&&t.selected_payment_type&&t.selected_location?(l(),c("div",Re,[i("h2",We,o(a.$t("confirm_payment_information")),1),i("div",Ge,[i("h3",Je,o(a.$t("cart_summary")),1),(l(!0),c(O,null,j(t.cart.cart_items,P=>{var R,W;return l(),c("div",{key:P.product.id,class:"mb-4"},[i("p",Xe,[i("span",He,o(P.product.name),1),i("small",Ze,[B(o(P.quantity)+" x "+o((P.product.price*((R=t.selected_currency)==null?void 0:R.change_value)).toFixed(2))+" ",1),i("span",null,o((W=t.selected_currency)==null?void 0:W.name),1)])])])}),128)),i("p",Qe,[B(o(a.$t("total"))+": "+o((t.cart.total_price*((r=t.selected_currency)==null?void 0:r.change_value)).toFixed(2))+" ",1),i("span",null,o((b=t.selected_currency)==null?void 0:b.name),1)])]),i("div",Ye,[i("h3",et,o(a.$t("payment_and_shipping_summary")),1),i("p",tt,o(a.$t("payment_method"))+": "+o((p=t.selected_payment_type)==null?void 0:p.name),1),t.selected_payment_type.external&&t.selected_payment_type.fee>0?(l(),c("p",nt,o(a.$t("payment_method_fee"))+": "+o((h=t.selected_payment_type)==null?void 0:h.fee),1)):$("",!0),i("p",st,o(a.$t("delivery_location"))+": "+o((m=t.selected_location)==null?void 0:m.name),1),t.selected_payment_type.delivery_included?(l(),c("p",at,[B(o(a.$t("delivery_price"))+": "+o((V=t.selected_location)==null?void 0:V.delivery_price)+" ",1),i("span",null,o((F=t.selected_currency)==null?void 0:F.name),1)])):$("",!0),t.selected_payment_type.delivery_included?$("",!0):(l(),c("p",ot,[B(o(a.$t("delivery_price"))+": "+o(((D=t.selected_location)==null?void 0:D.delivery_price)*((d=t.selected_payment_type.delivery_currency)==null?void 0:d.change_value))+" ",1),i("span",null,o((v=t.selected_payment_type.delivery_currency)==null?void 0:v.name),1)]))]),i("div",it,[t.selected_payment_type.delivery_included?(l(),c("div",lt,[i("span",rt,o(a.$t("total_to_pay"))+": ",1),i("span",null,o((_.value*((N=t.selected_currency)==null?void 0:N.change_value)).toFixed(2))+" "+o((T=t.selected_currency)==null?void 0:T.name),1)])):(l(),c("div",ct,[i("span",dt,o(a.$t("total_to_pay"))+": ",1),i("span",ut,[i("span",pt,o((t.cart.total_price*((x=t.selected_currency)==null?void 0:x.change_value)).toFixed(2))+" "+o((w=t.selected_currency)==null?void 0:w.name),1),t.selected_location?(l(),c("span",mt,[s[2]||(s[2]=i("i",{class:"pi pi-plus px-1"},null,-1)),B(" "+o((((z=t.selected_location)==null?void 0:z.delivery_price)*((K=t.selected_payment_type.delivery_currency)==null?void 0:K.change_value)).toFixed(2))+" "+o((M=t.selected_payment_type.delivery_currency)==null?void 0:M.name),1)])):$("",!0)])]))]),t.selected_payment_type.may_have_change?(l(),c("div",vt,[i("div",yt,[i("label",ft,o(a.$t("change_needed")),1),C(I(Te),{modelValue:u.value,"onUpdate:modelValue":s[0]||(s[0]=P=>u.value=P),"input-id":"mile",size:"small",suffix:` ${t.selected_currency.name}`},null,8,["modelValue","suffix"]),i("small",ht,o(a.$t("in_case_is_needed")),1)])])):$("",!0),i("div",_t,[C(I(H),{label:a.$t("receiver_data"),class:"p-button-primary pastel-btn w-full !border-none !focus:border-none",onClick:s[1]||(s[1]=P=>a.$emit("next"))},null,8,["label"])])])):(l(),c("div",bt,[(l(),c(O,null,j(3,P=>C(I(fe),{key:P,class:"w-full !h-32"})),64))]))}}}),kt=X(gt,[["__scopeId","data-v-518f22aa"]]),$t={key:0,class:"text-center"},xt={key:1},wt=["onClick"],It={class:""},St={class:"text-sm text-gray-600"},Ct={class:"text-sm text-gray-600"},Tt={key:0,class:"flex flex-col items-center justify-center"},Pt={key:0,class:"text-center"},Vt={key:1},Dt=["onClick"],Nt={class:""},Mt={class:"text-sm text-gray-600"},At={class:"text-sm text-gray-600"},Ft={key:0,class:"flex flex-col items-center justify-center"},Ot=U({__name:"ContactDialog",props:q({locationId:{type:Number,required:!0}},{modelValue:{type:Boolean},modelModifiers:{}}),emits:q(["update:visible","select-contact"],["update:modelValue"]),setup(t,{emit:n}){const e=t,u=ee(t,"modelValue"),_=n,a=f([]),s=f(!0),r=E(()=>window.innerWidth<=768);te(async()=>{const p=Pe(),{userData:h}=ne(),{data:m}=await p.getContacts(h.id,e.locationId);a.value=m??[],s.value=!1});const b=p=>{_("select-contact",p),_("update:visible",!1)};return(p,h)=>(l(),c(O,null,[!r.value&&!s.value?(l(),A(I(he),{key:0,visible:u.value,"onUpdate:visible":h[0]||(h[0]=m=>u.value=m),header:p.$t("select_a_contact"),modal:!0,class:"p-fluid"},{default:Z(()=>[s.value?(l(),c("div",$t,[C(I(Y))])):(l(),c("div",xt,[(l(!0),c(O,null,j(a.value,m=>(l(),c("div",{key:m.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:V=>b(m)},[i("p",It,o(m.name),1),i("p",St,o(m.phone_number),1),i("p",Ct,o(m.address)+"- "+o(m.municipality.name),1)],8,wt))),128)),!a.value||a.value.length==0?(l(),c("div",Tt,[i("h5",null,o(p.$t("no_contacts")),1)])):$("",!0)]))]),_:1},8,["visible","header"])):$("",!0),r.value&&!s.value?(l(),A(I(_e),{key:1,visible:u.value,"onUpdate:visible":h[1]||(h[1]=m=>u.value=m),position:"bottom",style:{height:"70dvh",borderRadius:"1rem 1rem 0 0"},header:p.$t("select_a_contact")},{default:Z(()=>[s.value?(l(),c("div",Pt,[C(I(Y))])):(l(),c("div",Vt,[(l(!0),c(O,null,j(a.value,m=>(l(),c("div",{key:m.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:V=>b(m)},[i("p",Nt,o(m.name),1),i("p",Mt,o(m.phone_number),1),i("p",At,o(m.address)+"- "+o(m.municipality.name),1)],8,Dt))),128)),!a.value||a.value.length==0?(l(),c("div",Ft,[i("h5",null,o(p.$t("no_contacts")),1)])):$("",!0)]))]),_:1},8,["visible","header"])):$("",!0)],64))}}),qt=X(Ot,[["__scopeId","data-v-b5a24a3c"]]),Lt={class:"space-y-6"},Bt={class:"text-2xl font-bold text-pink-600 mb-4"},jt={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"},Et={class:"mb-4"},Ut={class:"relative"},zt={key:0,class:"p-error"},Kt={class:"mb-4"},Rt={key:0,class:"p-error"},Wt={class:"mb-4"},Gt={key:0,class:"p-error"},Jt={class:"mb-4"},Xt={key:2,class:"p-error"},Ht={class:"flex justify-between mt-6"},Zt=U({__name:"RecipientStep",props:q({locationId:{type:Number,required:!0}},{modelValue:{},modelModifiers:{}}),emits:q(["next","back"],["update:modelValue"]),setup(t,{emit:n}){const e=t,u=f(!1),{anonymous:_}=ne(),a=n,s=ee(t,"modelValue"),r=f(!1),b=f(!1),p=f(!1),h=f(!1),m=f(!1),V=()=>{m.value=!0},F=d=>{s.value.name=d.name,s.value.phone_number=d.phone_number,s.value.address=d.address,m.value=!1};be(async()=>{if(e.locationId){const d=await ce().getAll([{field:"id",matchMode:"equals",value:e.locationId}],new Q(0,1),[]);d&&d.length>0&&(s.value.municipality=d[0])}});const D=()=>{r.value=!s.value.name,b.value=!s.value.phone_number,p.value=!s.value.address,h.value=!s.value.municipality,!r.value&&!b.value&&!p.value&&!h.value&&(u.value=!0,a("next"))};return(d,v)=>{const N=$e("Skeleton"),T=ke("tooltip");return l(),c("div",Lt,[i("h2",Bt,o(d.$t("receiver_data")),1),i("div",jt,[i("div",Et,[i("div",Ut,[C(I(J),{modelValue:s.value.name,"onUpdate:modelValue":v[0]||(v[0]=x=>s.value.name=x),placeholder:d.$t("name"),class:"w-full pl-10"},null,8,["modelValue","placeholder"]),I(_)?$("",!0):ge((l(),c("i",{key:0,class:"pi pi-user absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 cursor-pointer rounded-full bg-blue-100/60 p-2",onClick:V},null,512)),[[T,d.$t("select_a_contact"),void 0,{bottom:!0}]])]),r.value?(l(),c("small",zt,o(d.$t("field_required")),1)):$("",!0)]),i("div",Kt,[C(I(J),{modelValue:s.value.phone_number,"onUpdate:modelValue":v[1]||(v[1]=x=>s.value.phone_number=x),placeholder:d.$t("phone"),class:"w-full"},null,8,["modelValue","placeholder"]),b.value?(l(),c("small",Rt,o(d.$t("field_required")),1)):$("",!0)]),i("div",Wt,[C(I(J),{modelValue:s.value.address,"onUpdate:modelValue":v[2]||(v[2]=x=>s.value.address=x),placeholder:d.$t("address"),class:"w-full"},null,8,["modelValue","placeholder"]),p.value?(l(),c("small",Gt,o(d.$t("field_required")),1)):$("",!0)]),i("div",Jt,[s.value.municipality?(l(),A(I(J),{key:0,modelValue:s.value.municipality.name,"onUpdate:modelValue":v[3]||(v[3]=x=>s.value.municipality.name=x),placeholder:d.$t("municipality"),class:"w-full",disabled:""},null,8,["modelValue","placeholder"])):(l(),A(N,{key:1,class:"w-full"})),h.value?(l(),c("small",Xt,o(d.$t("field_required")),1)):$("",!0)])]),i("div",Ht,[C(I(H),{label:d.$t("back"),icon:"pi pi-arrow-left",class:"p-button-secondary pastel-btn",onClick:v[4]||(v[4]=x=>d.$emit("back"))},null,8,["label"]),C(I(H),{label:d.$t("pay"),icon:"pi pi-arrow-right",iconPos:"right",class:"p-button-primary pastel-btn",loading:u.value,onClick:D},null,8,["label","loading"])]),C(qt,{modelValue:m.value,"onUpdate:modelValue":v[5]||(v[5]=x=>m.value=x),locationId:t.locationId,onSelectContact:F},null,8,["modelValue","locationId"])])}}}),Qt=X(Zt,[["__scopeId","data-v-c3261b53"]]),Yt={class:"flex items-center justify-center h-full"},en=U({__name:"PaymentStepPaypal",props:{contact:{},currency_id:{},payment_type_id:{},change:{},location_id:{},currency_name:{},total:{}},emits:["created_payment","error_on_payment"],setup(t,{emit:n}){const e=t,u=n,_=f(null),a=re();return te(()=>{const s=window.paypal;if(typeof s>"u"){u("error_on_payment","Paypal no está instalado");return}s.Buttons({style:{layout:"vertical",color:"white",shape:"pill",label:"pay",height:45},createOrder:async()=>{const r=await oe.functions.invoke("create-payment-intent",{method:"POST",body:{...e}});return r.data.id||u("error_on_payment",r.data.error),r.data.id},onApprove:async r=>{const{data:b,error:p}=await oe.functions.invoke("paypal_payment",{method:"POST",body:JSON.stringify({orderID:r.orderID,...e})});p||!(b!=null&&b.success)?(u("error_on_payment"),a.replace("/")):u("created_payment")},onCancel:r=>{console.log(r)},onError:r=>{console.log(r),u("error_on_payment","Error al procesar el pedido")}}).render(_.value)}),(s,r)=>(l(),c("div",Yt,[i("div",{class:"mx-auto min-w-96",ref_key:"paypalButton",ref:_},null,512)]))}}),tn={class:"p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-2xl my-4"},nn={class:"flex flex-col bg-white items-center"},sn={class:"p-steps-title !w-24 text-center"},an={class:"mt-8"},on=U({__name:"pay-cart",setup(t){const n=Ce(),e=re(),u=xe(),_=ce(),a=Ve(),{t:s}=we(),{notify:r}=Ie(),b=De(),p=f(null),h=f({}),m=f(!0),V=f(!1),F=f([]),D=f([]),d=f(null),v=f(),N=f(null),T=f(0),x=E(()=>parseInt(n.query.location_id)),w=f(1),z=f([{step:1,label:"confirmation"},{step:2,label:"receiver"},{step:3,label:"payment"}]),K=async()=>{var L;V.value=!0;const k=await u.getMyCart();V.value=!1,p.value=(k==null?void 0:k.data)||null,p.value.cart_items.some(G=>G.product.stock<G.quantity)&&(e.push("/cart"),r("error",s("we_are_sorry"),`${s("a_product_is_off_stock")}`,3e3));const g=await _.getAll([],new Q(0,100),[]);F.value=g||[];const y=await a.getAll([{field:"id",matchMode:"equals",value:n.query.payment_type_id}],new Q(0,100),[]);V.value=!1,m.value=!1,D.value=y||[],D.value.length>0&&(d.value=D.value[0],v.value=(L=d.value.allowed_currencies.find(G=>G.currency.id==parseInt(n.query.pay_currency)))==null?void 0:L.currency)};te(()=>{K(),N.value=parseInt(n.query.location_id)});const M=E(()=>N.value?F.value.find(k=>k.id===N.value):null),P=()=>{w.value>1?w.value--:e.push("/cart")},R=f(null);async function W(k){e.push("/"),u.getMyCart(),r("success",s("puchase_successfull"),s("will_contact_you"),3e3)}async function ue(){r("error",s("there_was_an_error_paying"),"",3e3)}async function se(){const{anonymous:k,userData:g}=ne(),y=await b.createOrder({contact:h.value,currency_id:v.value.id,user_id:k?null:g.id,session_id:k?g.id:null,payment_type_id:d.value.id,change:T.value,location_id:M.value.id});if(y.data.success)console.log(y),R.value=y.data.order_id;else{r("error",y.data.error,"",3e3),e.push("/cart");return}return y}const ae=async()=>{if(d.value.external){w.value=3;return}const k=await se();k.data.success?(e.push("/"),u.getMyCart(),window.location.href=`https://wa.me/5352058774/?text=${encodeURIComponent(pe())}`,r("success",s("puchase_successfull"),"",3e3)):(r("error",k.data.error,"",3e3),e.push("/cart"))};function pe(){var y;const k=d.value.delivery_included?p.value.total_price+p.value.delivery_price:p.value.total_price,g=d.value.delivery_included?null:M.value.delivery_price;return`
 ${s("buy_resume")}
 ${s("client")}:
 ${s("name")} ${h.value.name}
 ${s("address")} ${h.value.address}
 ${s("phone")} ${h.value.phone_number}
-----------------------------------
${s("products")}:
${p.value.cart_items.map(L=>`	${L.product.name} x ${L.quantity}`).join(`
`)}
-----------------------------------
${s("total")}: ${k} ${v.value.name}
  ${d.value.may_have_change&&T.value>0?`${s("requested_change")}: ${T.value} ${v.value.name}`:""}
  ${d.value.delivery_included?"":`${s("delivery_price")}: ${g} ${(y=d.value.delivery_currency)==null?void 0:y.name}`}
`}return(k,g)=>(l(),c("div",tn,[C(I(de),{model:z.value,activeIndex:w.value-1,readonly:!0},{item:Z(({item:y})=>[i("div",nn,[i("span",{class:Se(["p-steps-number bg-[#449ca8] z-30",{"bg-[#30a3af] text-white":w.value>=y.step,"bg-[#449ca8] text-white":w.value<y.step}])},o(y.step),3),i("span",sn,o(k.$t(y.label)),1)])]),_:1},8,["model","activeIndex"]),i("div",an,[w.value===1?(l(),A(kt,{key:0,cart:p.value,selected_payment_type:d.value,selected_currency:v.value,selected_location:M.value,onNext:g[0]||(g[0]=y=>w.value++),onBack:P,change:T.value,"onUpdate:change":g[1]||(g[1]=y=>T.value=y)},null,8,["cart","selected_payment_type","selected_currency","selected_location","change"])):w.value===2?(l(),A(Qt,{key:1,modelValue:h.value,"onUpdate:modelValue":g[2]||(g[2]=y=>h.value=y),"location-id":x.value,onNext:ae,onBack:g[3]||(g[3]=y=>w.value--)},null,8,["modelValue","location-id"])):w.value===3?(l(),A(en,{key:2,contact:h.value,currency_id:v.value.id,payment_type_id:d.value.id,change:T.value,currency_name:v.value.name,location_id:M.value.id,total:p.value.total_price+M.value.delivery_price,onCreated_payment:W,onCreate_order:se,onError_on_payment:ue,onConfirm:ae,onBack:g[4]||(g[4]=y=>w.value--)},null,8,["contact","currency_id","payment_type_id","change","currency_name","location_id","total"])):$("",!0)])]))}}),mn=X(on,[["__scopeId","data-v-718475c4"]]);export{mn as default};
