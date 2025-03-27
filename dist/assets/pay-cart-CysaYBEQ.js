import{B as ce,o as l,c as u,m as E,a as r,d as ue,i as be,g as ge,F as M,x as U,z as o,u as j,v as $e,b as C,E as O,aL as D,aM as ae,N as Z,y as q,I as P,J as S,n as Q,K as ke,_ as R,A as f,C as ee,W as re,w as te,aN as we,O as Se,P as ne,af as xe,aA as Ie,$ as X,Y as Ce,aO as Pe,aF as Te,aG as Ee,X as Le,U as Ve,G as Me,V as je,Z as De}from"./index-CnxsDer9.js";import{s as Ne}from"./index-DHw-L75F.js";import{u as de}from"./useLocationService-BrdVS1na.js";import{u as qe}from"./useUserService-Cq_85vrf.js";import{u as Ae}from"./usePaymentTypes-sUaTLQVO.js";import{u as Fe}from"./useOrderService-DWW4K9Oh.js";var Ue=function(e){var t=e.dt;return`
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
`)},Oe={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},Re=ce.extend({name:"progressspinner",theme:Ue,classes:Oe}),Be={name:"BaseProgressSpinner",extends:ue,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:Re,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},se={name:"ProgressSpinner",extends:Be,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},ze=["fill","stroke-width"];function Ke(n,e,t,i,c,a){return l(),u("div",E({class:n.cx("root"),role:"progressbar"},n.ptmi("root")),[(l(),u("svg",E({class:n.cx("spin"),viewBox:"25 25 50 50",style:a.svgStyle},n.ptm("spin")),[r("circle",E({class:n.cx("circle"),cx:"50",cy:"50",r:"20",fill:n.fill,"stroke-width":n.strokeWidth,strokeMiterlimit:"10"},n.ptm("circle")),null,16,ze)],16))],16)}se.render=Ke;var We=function(e){var t=e.dt;return`
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
`)},Ge={root:function(e){var t=e.props;return["p-steps p-component",{"p-readonly":t.readonly}]},list:"p-steps-list",item:function(e){var t=e.instance,i=e.item,c=e.index;return["p-steps-item",{"p-steps-item-active":t.isActive(c),"p-disabled":t.isItemDisabled(i,c)}]},itemLink:"p-steps-item-link",itemNumber:"p-steps-item-number",itemLabel:"p-steps-item-label"},Je=ce.extend({name:"steps",theme:We,classes:Ge}),Xe={name:"BaseSteps",extends:ue,props:{id:{type:String},model:{type:Array,default:null},readonly:{type:Boolean,default:!0},activeStep:{type:Number,default:0}},style:Je,provide:function(){return{$pcSteps:this,$parentInstance:this}}},pe={name:"Steps",extends:Xe,inheritAttrs:!1,emits:["update:activeStep","step-change"],data:function(){return{d_activeStep:this.activeStep}},watch:{activeStep:function(e){this.d_activeStep=e}},mounted:function(){var e=this.findFirstItem();e&&(e.tabIndex="0")},methods:{getPTOptions:function(e,t,i){return this.ptm(e,{context:{item:t,index:i,active:this.isActive(i),disabled:this.isItemDisabled(t,i)}})},onItemClick:function(e,t,i){if(this.disabled(t)||this.readonly){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),i!==this.d_activeStep&&(this.d_activeStep=i,this.$emit("update:activeStep",this.d_activeStep)),this.$emit("step-change",{originalEvent:e,index:i})},onItemKeydown:function(e,t){switch(e.code){case"ArrowRight":{this.navigateToNextItem(e.target),e.preventDefault();break}case"ArrowLeft":{this.navigateToPrevItem(e.target),e.preventDefault();break}case"Home":{this.navigateToFirstItem(e.target),e.preventDefault();break}case"End":{this.navigateToLastItem(e.target),e.preventDefault();break}case"Tab":break;case"Enter":case"NumpadEnter":case"Space":{this.onItemClick(e,t),e.preventDefault();break}}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?t.children[0]:null},findFirstItem:function(){var e=be(this.$refs.list,'[data-pc-section="item"]');return e?e.children[0]:null},findLastItem:function(){var e=ge(this.$refs.list,'[data-pc-section="item"]');return e?e[e.length-1].children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex="-1",t.tabIndex="0",t.focus()},isActive:function(e){return e===this.d_activeStep},isItemDisabled:function(e,t){return this.disabled(e)||this.readonly&&!this.isActive(t)},visible:function(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled=="function"?e.disabled():e.disabled},label:function(e){return typeof e.label=="function"?e.label():e.label},getMenuItemProps:function(e,t){var i=this;return{action:E({class:this.cx("itemLink"),onClick:function(a){return i.onItemClick(a,e)},onKeyDown:function(a){return i.onItemKeydown(a,e)}},this.getPTOptions("itemLink",e,t)),step:E({class:this.cx("itemNumber")},this.getPTOptions("itemNumber",e,t)),label:E({class:this.cx("itemLabel")},this.getPTOptions("itemLabel",e,t))}}}},He=["id"],Ye=["aria-current","onClick","onKeydown","data-p-active","data-p-disabled"];function Ze(n,e,t,i,c,a){return l(),u("nav",E({id:n.id,class:n.cx("root")},n.ptmi("root")),[r("ol",E({ref:"list",class:n.cx("list")},n.ptm("list")),[(l(!0),u(M,null,U(n.model,function(s,m){return l(),u(M,{key:a.label(s)+"_"+m.toString()},[a.visible(s)?(l(),u("li",E({key:0,class:[n.cx("item",{item:s,index:m}),s.class],style:s.style,"aria-current":a.isActive(m)?"step":void 0,onClick:function(v){return a.onItemClick(v,s,m)},onKeydown:function(v){return a.onItemKeydown(v,s,m)},ref_for:!0},a.getPTOptions("item",s,m),{"data-p-active":a.isActive(m),"data-p-disabled":a.isItemDisabled(s,m)}),[n.$slots.item?(l(),j($e(n.$slots.item),{key:1,item:s,index:m,active:m===c.d_activeStep,label:a.label(s),props:a.getMenuItemProps(s,m)},null,8,["item","index","active","label","props"])):(l(),u("span",E({key:0,class:n.cx("itemLink"),ref_for:!0},a.getPTOptions("itemLink",s,m)),[r("span",E({class:n.cx("itemNumber"),ref_for:!0},a.getPTOptions("itemNumber",s,m)),o(m+1),17),r("span",E({class:n.cx("itemLabel"),ref_for:!0},a.getPTOptions("itemLabel",s,m)),o(a.label(s)),17)],16))],16,Ye)):C("",!0)],64)}),128))],16)],16,He)}pe.render=Ze;const Qe={key:0,class:"space-y-6"},et={class:"text-xl md:text-2xl font-bold text-pink-600 mb-4"},tt={class:"p-4 border rounded-lg shadow-md backdrop-blur-md"},nt={class:"text-lg font-semibold mb-2"},st={class:""},at={class:"line-clamp-1 font-medium"},rt={class:""},it={class:"text-pink-700 font-semibold"},ot={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md flex flex-col gap-3"},lt={class:"text-lg font-semibold text-pink-700"},ct={class:"font-medium"},ut={class:"font-medium"},dt={key:0,class:"font-medium"},pt={key:1,class:"text-pink-700"},mt={class:"flex flex-row items-center justify-center text-lg md:text-2xl text-justify"},vt={key:0,class:"font-semibold flex flex-row items-center justify-end sm:text-xl"},ft={class:"mr-2"},yt={key:1,class:"text-center font-semibold flex flex-wrap items-center justify-center"},ht={class:"mr-2"},_t={class:"flex flex-row items-center gap-1"},bt={class:"flex flex-row items-center gap-1"},gt={key:0,class:"flex flex-row items-center gap-1"},$t={key:0,class:"w-full flex flex-row justify-center md:justify-end"},kt={class:"flex flex-col"},wt={for:"mile",class:"font-bold block mb-0.5 text-sm"},St={class:"text-zinc-400"},xt={class:"flex justify-between mt-6"},It={key:1,class:"flex flex-col gap-2"},Ct=O({__name:"ConfirmationStep",props:D({cart:{type:Object,required:!0},selected_payment_type:{type:Object,required:!0},selected_currency:{type:Object,required:!0},selected_location:{type:Object,required:!0}},{change:{},changeModifiers:{}}),emits:D(["next","backt","update:change"],["update:change"]),setup(n,{emit:e}){const t=n,i=ae(n,"change"),c=Z(()=>{let a=t.cart?t.cart.total_price:0;return a+=t.selected_location.delivery_price,a});return(a,s)=>{var m,k,v,y,d,g,T,L,p,h,V,b,B,x,z,K;return n.cart&&n.selected_currency&&n.selected_payment_type&&n.selected_location?(l(),u("div",Qe,[r("h2",et,o(a.$t("confirm_payment_information")),1),r("div",tt,[r("h3",nt,o(a.$t("cart_summary")),1),(l(!0),u(M,null,U(n.cart.cart_items,I=>{var W,G;return l(),u("div",{key:I.product.id,class:"mb-4"},[r("p",st,[r("span",at,o(I.product.name),1),r("small",rt,[q(o(I.quantity)+" x "+o((I.product.price*((W=n.selected_currency)==null?void 0:W.change_value)).toFixed(2))+" ",1),r("span",null,o((G=n.selected_currency)==null?void 0:G.name),1)])])])}),128)),r("p",it,[q(o(a.$t("total"))+": "+o((n.cart.total_price*((m=n.selected_currency)==null?void 0:m.change_value)).toFixed(2))+" ",1),r("span",null,o((k=n.selected_currency)==null?void 0:k.name),1)])]),r("div",ot,[r("h3",lt,o(a.$t("payment_and_shipping_summary")),1),r("p",ct,o(a.$t("payment_method"))+": "+o((v=n.selected_payment_type)==null?void 0:v.name),1),r("p",ut,o(a.$t("delivery_location"))+": "+o((y=n.selected_location)==null?void 0:y.name),1),n.selected_payment_type.delivery_included?(l(),u("p",dt,[q(o(a.$t("delivery_price"))+": "+o((d=n.selected_location)==null?void 0:d.delivery_price)+" ",1),r("span",null,o((g=n.selected_currency)==null?void 0:g.name),1)])):C("",!0),n.selected_payment_type.delivery_included?C("",!0):(l(),u("p",pt,[q(o(a.$t("delivery_price"))+": "+o(((T=n.selected_location)==null?void 0:T.delivery_price)*((L=n.selected_payment_type.delivery_currency)==null?void 0:L.change_value))+" ",1),r("span",null,o((p=n.selected_payment_type.delivery_currency)==null?void 0:p.name),1)]))]),r("div",mt,[n.selected_payment_type.delivery_included?(l(),u("div",vt,[r("span",ft,o(a.$t("total_to_pay"))+": ",1),r("span",null,o((c.value*((h=n.selected_currency)==null?void 0:h.change_value)).toFixed(2))+" "+o((V=n.selected_currency)==null?void 0:V.name),1)])):(l(),u("div",yt,[r("span",ht,o(a.$t("total_to_pay"))+": ",1),r("span",_t,[r("span",bt,o((n.cart.total_price*((b=n.selected_currency)==null?void 0:b.change_value)).toFixed(2))+" "+o((B=n.selected_currency)==null?void 0:B.name),1),n.selected_location?(l(),u("span",gt,[s[2]||(s[2]=r("i",{class:"pi pi-plus px-1"},null,-1)),q(" "+o((((x=n.selected_location)==null?void 0:x.delivery_price)*((z=n.selected_payment_type.delivery_currency)==null?void 0:z.change_value)).toFixed(2))+" "+o((K=n.selected_payment_type.delivery_currency)==null?void 0:K.name),1)])):C("",!0)])]))]),n.selected_payment_type.may_have_change?(l(),u("div",$t,[r("div",kt,[r("label",wt,o(a.$t("change_needed")),1),P(S(Ne),{modelValue:i.value,"onUpdate:modelValue":s[0]||(s[0]=I=>i.value=I),"input-id":"mile",size:"small",suffix:` ${n.selected_currency.name}`},null,8,["modelValue","suffix"]),r("small",St,o(a.$t("in_case_is_needed")),1)])])):C("",!0),r("div",xt,[P(S(Q),{label:a.$t("receiver_data"),class:"p-button-primary pastel-btn w-full !border-none !focus:border-none",onClick:s[1]||(s[1]=I=>a.$emit("next"))},null,8,["label"])])])):(l(),u("div",It,[(l(),u(M,null,U(3,I=>P(S(ke),{key:I,class:"w-full !h-32"})),64))]))}}}),Pt=R(Ct,[["__scopeId","data-v-3344a7c0"]]),Tt={key:0,class:"text-center"},Et={key:1},Lt=["onClick"],Vt={class:""},Mt={class:"text-sm text-gray-600"},jt={class:"text-sm text-gray-600"},Dt={key:0,class:"flex flex-col items-center justify-center"},Nt={key:0,class:"text-center"},qt={key:1},At=["onClick"],Ft={class:""},Ut={class:"text-sm text-gray-600"},Ot={class:"text-sm text-gray-600"},Rt={key:0,class:"flex flex-col items-center justify-center"},Bt=O({__name:"ContactDialog",props:D({locationId:{type:Number,required:!0}},{modelValue:{type:Boolean},modelModifiers:{}}),emits:D(["update:visible","select-contact"],["update:modelValue"]),setup(n,{emit:e}){const t=n,i=ae(n,"modelValue"),c=e,a=f([]),s=f(!0),m=Z(()=>window.innerWidth<=768);ee(async()=>{const v=qe(),{userData:y}=re(),{data:d}=await v.getContacts(y.id,t.locationId);a.value=d??[],s.value=!1});const k=v=>{c("select-contact",v),c("update:visible",!1)};return(v,y)=>(l(),u(M,null,[!m.value&&!s.value?(l(),j(S(we),{key:0,visible:i.value,"onUpdate:visible":y[0]||(y[0]=d=>i.value=d),header:v.$t("select_a_contact"),modal:!0,class:"p-fluid"},{default:te(()=>[s.value?(l(),u("div",Tt,[P(S(se))])):(l(),u("div",Et,[(l(!0),u(M,null,U(a.value,d=>(l(),u("div",{key:d.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:g=>k(d)},[r("p",Vt,o(d.name),1),r("p",Mt,o(d.phone_number),1),r("p",jt,o(d.address)+"- "+o(d.municipality.name),1)],8,Lt))),128)),!a.value||a.value.length==0?(l(),u("div",Dt,[r("h5",null,o(v.$t("no_contacts")),1)])):C("",!0)]))]),_:1},8,["visible","header"])):C("",!0),m.value&&!s.value?(l(),j(S(Se),{key:1,visible:i.value,"onUpdate:visible":y[1]||(y[1]=d=>i.value=d),position:"bottom",style:{height:"70dvh",borderRadius:"1rem 1rem 0 0"},header:v.$t("select_a_contact")},{default:te(()=>[s.value?(l(),u("div",Nt,[P(S(se))])):(l(),u("div",qt,[(l(!0),u(M,null,U(a.value,d=>(l(),u("div",{key:d.id,class:"p-1 border rounded-xl cursor-pointer hover:!bg-blue-50 transition-all duration-500 font-thin flex flex-col gap-2",onClick:g=>k(d)},[r("p",Ft,o(d.name),1),r("p",Ut,o(d.phone_number),1),r("p",Ot,o(d.address)+"- "+o(d.municipality.name),1)],8,At))),128)),!a.value||a.value.length==0?(l(),u("div",Rt,[r("h5",null,o(v.$t("no_contacts")),1)])):C("",!0)]))]),_:1},8,["visible","header"])):C("",!0)],64))}}),zt=R(Bt,[["__scopeId","data-v-b5a24a3c"]]),Kt={class:"space-y-6"},Wt={class:"text-2xl font-bold text-pink-600 mb-4"},Gt={class:"p-4 border rounded-lg shadow-md bg-pink-100/30 backdrop-blur-md"},Jt={class:"mb-4"},Xt={class:"relative"},Ht={key:0,class:"p-error"},Yt={class:"mb-4"},Zt={key:0,class:"p-error"},Qt={class:"mb-4"},en={key:0,class:"p-error"},tn={class:"mb-4"},nn={key:0,class:"p-error"},sn={class:"flex justify-between mt-6"},an=O({__name:"RecipientStep",props:D({locationId:{type:Number,required:!0}},{modelValue:{},modelModifiers:{}}),emits:D(["next","back"],["update:modelValue"]),setup(n,{emit:e}){const t=n,i=f(!1),{anonymous:c}=re(),a=e,s=ae(n,"modelValue"),m=f(!1),k=f(!1),v=f(!1),y=f(!1),d=f(!1),g=()=>{d.value=!0},T=p=>{s.value.name=p.name,s.value.phone_number=p.phone_number,s.value.address=p.address,d.value=!1};ee(async()=>{if(t.locationId){const p=await de().getAll([{field:"id",matchMode:"equals",value:t.locationId}],new ne(0,1),[]);p&&p.length>0&&(s.value.municipality=p[0].name)}});const L=()=>{m.value=!s.value.name,k.value=!s.value.phone_number,v.value=!s.value.address,y.value=!s.value.municipality,!m.value&&!k.value&&!v.value&&!y.value&&(i.value=!0,a("next"))};return(p,h)=>{const V=Ie("tooltip");return l(),u("div",Kt,[r("h2",Wt,o(p.$t("receiver_data")),1),r("div",Gt,[r("div",Jt,[r("div",Xt,[P(S(X),{modelValue:s.value.name,"onUpdate:modelValue":h[0]||(h[0]=b=>s.value.name=b),placeholder:p.$t("name"),class:"w-full pl-10"},null,8,["modelValue","placeholder"]),S(c)?C("",!0):xe((l(),u("i",{key:0,class:"pi pi-user absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 cursor-pointer rounded-full bg-blue-100/60 p-2",onClick:g},null,512)),[[V,p.$t("select_a_contact"),void 0,{bottom:!0}]])]),m.value?(l(),u("small",Ht,o(p.$t("field_required")),1)):C("",!0)]),r("div",Yt,[P(S(X),{modelValue:s.value.phone_number,"onUpdate:modelValue":h[1]||(h[1]=b=>s.value.phone_number=b),placeholder:p.$t("phone"),class:"w-full"},null,8,["modelValue","placeholder"]),k.value?(l(),u("small",Zt,o(p.$t("field_required")),1)):C("",!0)]),r("div",Qt,[P(S(X),{modelValue:s.value.address,"onUpdate:modelValue":h[2]||(h[2]=b=>s.value.address=b),placeholder:p.$t("address"),class:"w-full"},null,8,["modelValue","placeholder"]),v.value?(l(),u("small",en,o(p.$t("field_required")),1)):C("",!0)]),r("div",tn,[P(S(X),{modelValue:s.value.municipality.name,"onUpdate:modelValue":h[3]||(h[3]=b=>s.value.municipality.name=b),placeholder:p.$t("municipality"),class:"w-full",disabled:""},null,8,["modelValue","placeholder"]),y.value?(l(),u("small",nn,o(p.$t("field_required")),1)):C("",!0)])]),r("div",sn,[P(S(Q),{label:p.$t("back"),icon:"pi pi-arrow-left",class:"p-button-secondary pastel-btn",onClick:h[4]||(h[4]=b=>p.$emit("back"))},null,8,["label"]),P(S(Q),{label:p.$t("pay"),icon:"pi pi-arrow-right",iconPos:"right",class:"p-button-primary pastel-btn",loading:i.value,onClick:L},null,8,["label","loading"])]),P(zt,{modelValue:d.value,"onUpdate:modelValue":h[5]||(h[5]=b=>d.value=b),locationId:n.locationId,onSelectContact:T},null,8,["modelValue","locationId"])])}}}),rn=R(an,[["__scopeId","data-v-1e4e4415"]]);var me="https://js.stripe.com",on="".concat(me,"/v3"),ln=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,cn=/^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;var un=function(e){return ln.test(e)||cn.test(e)},dn=function(){for(var e=document.querySelectorAll('script[src^="'.concat(me,'"]')),t=0;t<e.length;t++){var i=e[t];if(un(i.src))return i}return null},le=function(e){var t="",i=document.createElement("script");i.src="".concat(on).concat(t);var c=document.head||document.body;if(!c)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return c.appendChild(i),i},pn=function(e,t){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"5.7.0",startTime:t})},A=null,H=null,Y=null,mn=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},vn=function(e,t){return function(){window.Stripe?e(window.Stripe):t(new Error("Stripe.js not available"))}},fn=function(e){return A!==null?A:(A=new Promise(function(t,i){if(typeof window>"u"||typeof document>"u"){t(null);return}if(window.Stripe){t(window.Stripe);return}try{var c=dn();if(!(c&&e)){if(!c)c=le(e);else if(c&&Y!==null&&H!==null){var a;c.removeEventListener("load",Y),c.removeEventListener("error",H),(a=c.parentNode)===null||a===void 0||a.removeChild(c),c=le(e)}}Y=vn(t,i),H=mn(i),c.addEventListener("load",Y),c.addEventListener("error",H)}catch(s){i(s);return}}),A.catch(function(t){return A=null,Promise.reject(t)}))},yn=function(e,t,i){if(e===null)return null;var c=e.apply(void 0,t);return pn(c,i),c},F,ve=!1,fe=function(){return F||(F=fn(null).catch(function(e){return F=null,Promise.reject(e)}),F)};Promise.resolve().then(function(){return fe()}).catch(function(n){ve||console.warn(n)});var hn=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];ve=!0;var c=Date.now();return fe().then(function(a){return yn(a,t,c)})};const _n={class:"form-title"},bn={class:"form-group"},gn={for:"card-element"},$n={class:"form-hint"},kn=O({__name:"PaymentStep",props:{contact:{},currency_id:{},payment_type_id:{},change:{},location_id:{},currency_name:{},total:{}},emits:["created_payment","error_on_payment","create_order"],setup(n,{emit:e}){const t=n,i=f(!1),c=f(null),a=f(null),s=f(null),m=f(""),k=f(null);ee(async()=>{i.value=!0,c.value=await hn(Pe),i.value=!1,a.value=c.value.elements({appearance:{theme:"flat"}}),s.value=a.value.create("card"),s.value.mount("#card-element"),k.value=a.value.create("paymentMethodMessaging",{paymentMethodType:"card",layout:"horizontal",iconStyle:"default",currency:t.currency_name.toUpperCase(),countryCode:"US",amount:100}),k.value.mount("#payment-messaging")});const v=async()=>{i.value=!0;const{data:d,error:g}=await Te.functions.invoke("create-payment-intent",{method:"POST",body:{...t}});if(i.value=!1,!g){m.value=d.clientSecret,i.value=!0;const{paymentIntent:T,error:L}=await c.value.confirmCardPayment(m.value,{payment_method:{card:s.value}});i.value=!1,L||T.status!=="succeeded"?(console.error("Error en el pago:",L),y("error_on_payment")):T.status==="succeeded"&&(console.log("Payment succeeded:",T),y("created_payment",T.id))}},y=e;return(d,g)=>(l(),u("form",{onSubmit:Ce(v,["prevent"]),class:"payment-form"},[r("h2",_n,o(d.$t("secure_payment")),1),r("div",bn,[r("label",gn,o(d.$t("credit_or_debit_card")),1),g[0]||(g[0]=r("div",{id:"card-element",class:"card-input"},null,-1)),g[1]||(g[1]=r("div",{id:"payment-messaging",class:"messaging-input"},null,-1)),r("p",$n,o(d.$t("data_will_be_secure_and_encrypted")),1)]),P(S(Q),{type:"submit",class:"btn-pay",loading:i.value,label:`💳 ${d.$t("make_pay")} ${t.total.toFixed(2)} ${t.currency_name.toUpperCase()}`},null,8,["loading","label"])],32))}}),wn=R(kn,[["__scopeId","data-v-1d583447"]]),Sn={class:"p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-2xl my-4"},xn={class:"flex flex-col bg-white items-center"},In={class:"p-steps-title !w-24 text-center"},Cn={class:"mt-8"},Pn=O({__name:"pay-cart",setup(n){const e=je(),t=De(),i=Ee(),c=de(),a=Ae(),{t:s}=Le(),{notify:m}=Ve(),k=Fe(),v=f(null),y=f({}),d=f(!0),g=f(!1),T=f([]),L=f([]),p=f(null),h=f(),V=f(null),b=f(0),B=Z(()=>parseInt(e.query.location_id)),x=f(1),z=f([{step:1,label:"confirmation"},{step:2,label:"receiver"},{step:3,label:"payment"}]),K=async()=>{var N;g.value=!0;const w=await i.getMyCart();g.value=!1,v.value=(w==null?void 0:w.data)||null,v.value.cart_items.some(J=>J.product.stock<J.quantity)&&(t.push("/cart"),m("error",s("we_are_sorry"),`${s("a_product_is_off_stock")}`,3e3));const $=await c.getAll([],new ne(0,100),[]);T.value=$||[];const _=await a.getAll([{field:"id",matchMode:"equals",value:e.query.payment_type_id}],new ne(0,100),[]);g.value=!1,d.value=!1,L.value=_||[],L.value.length>0&&(p.value=L.value[0],h.value=(N=p.value.allowed_currencies.find(J=>J.currency.id==parseInt(e.query.pay_currency)))==null?void 0:N.currency)};ee(()=>{K(),V.value=parseInt(e.query.location_id)});const I=Z(()=>V.value?T.value.find(w=>w.id===V.value):null),W=()=>{x.value>1?x.value--:t.push("/cart")},G=f(null);async function ye(w){t.push("/"),i.getMyCart(),m("success",s("puchase_successfull"),"",3e3)}function he(){m("error",s("there_was_an_error_paying"),"",3e3)}async function ie(){const{anonymous:w,userData:$}=re(),_=await k.createOrder({contact:y.value,currency_id:h.value.id,user_id:w?null:$.id,session_id:w?$.id:null,payment_type_id:p.value.id,change:b.value,location_id:I.value.id});if(_.data.success)console.log(_),G.value=_.data.order_id;else{m("error",_.data.error,"",3e3),t.push("/cart");return}return _}const oe=async()=>{if(p.value.external){x.value=3;return}const w=await ie();w.data.success?(t.push("/"),i.getMyCart(),window.location.href=`https://wa.me/5352058774/?text=${encodeURIComponent(_e())}`,m("success",s("puchase_successfull"),"",3e3)):(m("error",w.data.error,"",3e3),t.push("/cart"))};function _e(){var _;const w=p.value.delivery_included?v.value.total_price+v.value.delivery_price:v.value.total_price,$=p.value.delivery_included?null:I.value.delivery_price;return`
 ${s("buy_resume")}
 ${s("client")}:
 ${s("name")} ${y.value.name}
 ${s("address")} ${y.value.address}
 ${s("phone")} ${y.value.phone_number}
-----------------------------------
${s("products")}:
${v.value.cart_items.map(N=>`	${N.product.name} x ${N.quantity}`).join(`
`)}
-----------------------------------
${s("total")}: ${w} ${h.value.name}
  ${p.value.may_have_change&&b.value>0?`${s("requested_change")}: ${b.value} ${h.value.name}`:""}
  ${p.value.delivery_included?"":`${s("delivery_price")}: ${$} ${(_=p.value.delivery_currency)==null?void 0:_.name}`}
`}return(w,$)=>(l(),u("div",Sn,[P(S(pe),{model:z.value,activeIndex:x.value-1,readonly:!0},{item:te(({item:_})=>[r("div",xn,[r("span",{class:Me(["p-steps-number bg-[#449ca8] z-30",{"bg-[#30a3af] text-white":x.value>=_.step,"bg-[#449ca8] text-white":x.value<_.step}])},o(_.step),3),r("span",In,o(w.$t(_.label)),1)])]),_:1},8,["model","activeIndex"]),r("div",Cn,[x.value===1?(l(),j(Pt,{key:0,cart:v.value,selected_payment_type:p.value,selected_currency:h.value,selected_location:I.value,onNext:$[0]||($[0]=_=>x.value++),onBack:W,change:b.value,"onUpdate:change":$[1]||($[1]=_=>b.value=_)},null,8,["cart","selected_payment_type","selected_currency","selected_location","change"])):x.value===2?(l(),j(rn,{key:1,modelValue:y.value,"onUpdate:modelValue":$[2]||($[2]=_=>y.value=_),"location-id":B.value,onNext:oe,onBack:$[3]||($[3]=_=>x.value--)},null,8,["modelValue","location-id"])):x.value===3?(l(),j(wn,{key:2,contact:y.value,currency_id:h.value.id,payment_type_id:p.value.id,change:b.value,currency_name:h.value.name,location_id:I.value.id,total:v.value.total_price+I.value.delivery_price,onCreated_payment:ye,onCreate_order:ie,onError_on_payment:he,onConfirm:oe,onBack:$[4]||($[4]=_=>x.value--)},null,8,["contact","currency_id","payment_type_id","change","currency_name","location_id","total"])):C("",!0)])]))}}),Dn=R(Pn,[["__scopeId","data-v-089912c9"]]);export{Dn as default};
