(this["webpackJsonpvv-map"]=this["webpackJsonpvv-map"]||[]).push([[0],{185:function(e,t,a){},212:function(e,t,a){e.exports=a(286)},245:function(e,t,a){},246:function(e,t,a){},247:function(e,t,a){},248:function(e,t,a){},271:function(e,t,a){},278:function(e,t,a){},279:function(e,t,a){},280:function(e,t,a){},286:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a.n(n),o=a(110),i=a.n(o),l=a(181),c=a(158),s=a(90),u=a(197),d=a(198),m=a(95),f=a(211),p=a(209),h=a(199),v=a(210),g=a(159),b=a(139),w=a(97),A=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"get",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=Object(f.a)(Object(m.a)(a.prototype),"get",this).call(this,e);return null!==n?n:t}}]),a}(Object(v.a)(URLSearchParams));var E=Object(g.a)(Object(b.a)(Object(w.a)(new Date),1),"yyyy-MM-dd"),M=Object(g.a)(new Date,"yyyy-MM-dd"),y="51.533",D="-0.129";function C(e){return e.get("lat")||e.get("lng")?"":"London"}function N(){var e=new A(Object(s.f)().search);return{location:{lat:e.get("lat",y),lng:e.get("lng",D)},dateRange:{startDate:e.get("startDate",E),endDate:e.get("endDate",M)},name:e.get("name",C(e))}}var x=a(66),O=a(298),T=a(299),S=a(300),R=a(294),I=a(301),F=a(302),k=a(26),L=a(31),P=a(120),G=a(59),B=864e5,j=_("2020-03-29");function U(e){return Object(g.a)(e,"yyyy-MM-dd")}function _(e){return new Date(e+"T00:00:00").getTime()}var W="DejaVu Sans Mono";function H(e){var t=e.createChild(k.a);t.width=5,t.height=5,t.horizontalCenter="middle",t.verticalCenter="middle",e.states.create("hover").properties.scale=2}function V(e){e.title.text="Percent (%)",e.title.fontWeight=700,e.title.fontFamily=W,e.min=-10,e.max=110,e.strictMinMax=!0,e.renderer.minGridDistance=30,e.strictMinMax=!0,e.marginTop=0,e.marginBottom=0,e.renderer.line.stroke=k.e("#0384fc"),e.renderer.labels.template.fill=k.e("#0384fc"),e.title.fill=k.e("#0384fc"),e.renderer.grid.template.disabled=!0,e.renderer.grid.template.stroke=k.e("blue"),e.renderer.grid.template.strokeWidth=1,ae(e,50),ae(e,100)}function K(e){e.title.text="Temperature (\xb0C)",e.title.fontWeight=700,e.title.fontFamily=W,e.strictMinMax=!0,e.renderer.minGridDistance=30}function Y(e){e.name="Relative humidity",e.dataFields.dateX="date",e.dataFields.valueY="Humidity",e.tooltipText="Humidity: {valueY.value} %",e.strokeWidth=3,e.minBulletDistance=10,H(e.bullets.push(new L.a))}function Z(e){return K(e),e.title.text="Dewp - temp (\xb0C)",e.marginTop=0,e.marginBottom=0,e.renderer.line.stroke=k.e("#1dad91"),e.renderer.labels.template.fill=k.e("#1dad91"),e.title.fill=k.e("#1dad91"),e.renderer.grid.template.disabled=!0,function(e,t){var a=e.axisRanges.create();a.value=t,a.bullet=new k.a,a.bullet.fill=k.e("white"),a.bullet.stroke=k.e("red"),a.bullet.strokeOpacity=.7,a.bullet.strokeWidth=2,a.bullet.width=10,a.bullet.height=10,a.bullet.dx=e.renderer.opposite?30:-30,a.bullet.dy=-1}(e,0),ae(e,-1),e.renderer.grid.template.stroke=k.e("red"),e.renderer.grid.template.strokeWidth=1,e.renderer.baseGrid.stroke=k.e("red"),e.renderer.baseGrid.strokeWidth=2,e.max=5,e}function z(e){var t=e.tooltipContainer.createChild(k.b);return t.background.fill=k.e("#fff"),t.background.fillOpacity=1,t.width=k.g(100),t.height=k.g(100),t}function X(e,t,a){!function(e,t,a,n){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:6;e.renderer.grid.template.disabled=!0;var o=Object(P.a)(_(t),1);o.setHours(24-r);var i=Object(G.a)(_(a),1);i.setHours(r),e.min=o.getTime(),e.max=i.getTime(),e.strictMinMax=!0,e.tooltipDateFormat=n,e.groupData=!0,e.groupCount=300,e.groupIntervals.setAll([{timeUnit:"hour",count:1},{timeUnit:"hour",count:3},{timeUnit:"hour",count:6},{timeUnit:"hour",count:12},{timeUnit:"day",count:1},{timeUnit:"day",count:3},{timeUnit:"day",count:6},{timeUnit:"day",count:15},{timeUnit:"month",count:1},{timeUnit:"year",count:1},{timeUnit:"year",count:10}])}(e.xAxes.getIndex(0),t.startDate,t.endDate,a)}var J=function(e){e.leftAxesContainer.layout="vertical",e.rightAxesContainer.layout="vertical",e.preloader.disabled=!0,e.paddingRight=30,e.colors.list=[k.e("blue"),k.e("red"),k.e("#573fd1"),k.e("green"),k.e("#0384fc"),k.e("#1dad91"),k.e("#6f9ec9"),k.e("magenta"),k.e("#6a086e")],e.xAxes.push(new L.c);var t=e.yAxes.push(new L.g);V(t),t.marginTop=10,t.marginBottom=10;var a=e.yAxes.push(new L.g);K(a),a.marginTop=30,a.marginBottom=10;var n=e.yAxes.push(new L.g);K(n),n.marginTop=30,n.marginBottom=10,n.renderer.opposite=!0;var r=e.yAxes.push(new L.g);r.renderer.opposite=!0,Z(r);var o=new L.i,i=e.series.push(new L.f);!function(e){e.name="Min. day temperature",e.dataFields.dateX="date",e.dataFields.valueY="mintempC",e.tooltipText="Min.: {valueY.value} \xb0C",e.startLocation=.5}(i),i.yAxis=a,o.series.push(i),function(e){e.name="Max. day temperature",e.dataFields.dateX="date",e.dataFields.valueY="maxtempC",e.tooltipText="Max.: {valueY.value} \xb0C",e.startLocation=.5}(i=e.series.push(new L.f)),i.yAxis=a,o.series.push(i),function(e){e.name="Temperature",e.dataFields.dateX="date",e.dataFields.valueY="tempC",e.tooltipText="Temperature: {valueY.value} \xb0C",e.strokeWidth=3,e.minBulletDistance=10,H(e.bullets.push(new L.a))}(i=e.series.push(new L.e)),i.yAxis=a,o.series.push(i),function(e){e.name="Dew point",e.dataFields.dateX="date",e.dataFields.valueY="DewPointC",e.tooltipText="DewPoint: {valueY.value} \xb0C",e.strokeWidth=3,e.minBulletDistance=10,H(e.bullets.push(new L.a))}(i=e.series.push(new L.e)),i.yAxis=a,Y(i=e.series.push(new L.e)),i.yAxis=t,t.renderer.line.stroke=i.stroke,t.renderer.labels.template.fill=i.stroke;var l=e.series.push(new L.e);te(l),l.yAxis=r,e.legend=new L.d,e.legend.reverseOrder=!0;var c=e.legend.markers.template;c.width=40,c.height=40,e.legend.position="right",e.legend.labels.template.fontSize=12,e.legend.labels.template.fontWeight=500,e.legend.labels.template.fontFamily=W,e.cursor=new L.j,o.minHeight=30,e.scrollbarX=o};function Q(e){e.title.fontWeight=700,e.title.fontFamily=W,e.renderer.minGridDistance=30}function q(e){Q(e),e.title.text="Calc (ref below)",e.marginTop=0,e.strictMinMax=!1,e.marginBottom=0,e.renderer.line.stroke=k.e("#edac15"),e.renderer.grid.template.disabled=!0,e.renderer.labels.template.disabled=!0,e.title.fill=k.e("#edac15"),e.title.disabled=!0,e.renderer.opposite=!0}function $(e){e.name="with visibility",e.dataFields.dateX="date",e.dataFields.valueY="calc1",e.tooltipText="calc vis: {calc1}",e.strokeWidth=3,e.minBulletDistance=10,H(e.bullets.push(new L.a))}function ee(e){e.name="without visibility",e.dataFields.dateX="date",e.dataFields.valueY="calc2",e.tooltipText="calc: {calc2}",e.strokeWidth=3,e.minBulletDistance=10,H(e.bullets.push(new L.a))}function te(e){e.name="dewpoint - temp",e.legendSettings.labelText="Dewp - temp\n[bold red]o[/] [bold]condensation[/]",e.dataFields.dateX="date",e.dataFields.valueY="measure",e.tooltipText="dewpoint - temp: {measure}",e.strokeWidth=3,function(e){e.propertyFields.scale="measureScale",e.circle.fill=k.e("white"),e.circle.stroke=k.e("red"),e.circle.strokeWidth=2,e.circle.fillOpacity=.5,e.circle.strokeOpacity=1}(e.bullets.push(new L.b))}function ae(e,t){var a=e.axisRanges.create();a.value=t,a.label.text="{value}"}var ne=function(e){e.preloader.disabled=!0,e.paddingRight=30,e.colors.list=[k.e("#2e3033"),k.e("#521d75"),k.e("#edac15"),k.e("#e84900")];var t=e.xAxes.push(new L.c);t.renderer.opposite=!0,t.renderer.labels.template.disabled=!0;var a=function(e){var t=e.yAxes.push(new L.g);q(t);var a=e.yAxes.push(new L.g);Q(a),a.title.text="Virus All",a.marginTop=0,a.marginBottom=0,a.renderer.line.stroke=k.e("#521d75"),a.renderer.labels.template.fill=k.e("#521d75"),a.title.fill=k.e("#521d75"),a.renderer.grid.template.disabled=!0,a.renderer.opposite=!0,a.strictMinMax=!0,a.logarithmic=!0;var n=e.yAxes.push(new L.g);return Q(n),n.title.text="Virus New",n.marginTop=0,n.marginBottom=0,n.renderer.line.stroke=k.e("#2e3033"),n.renderer.labels.template.fill=k.e("#2e3033"),n.title.fill=k.e("#2e3033"),n.strictMinMax=!0,{virAllAxis:a,virNewAxis:n,calcAxis:t}}(e),n=a.virAllAxis,r=a.virNewAxis,o=a.calcAxis,i=e.series.push(new L.f);!function(e){e.name="Virus New",e.dataFields.dateX="date",e.dataFields.valueY="new_confirmed",e.tooltipText="new confirmed: {new_confirmed}",e.strokeWidth=3}(i),i.yAxis=r;var l=e.series.push(new L.f);!function(e){e.name="Virus All",e.dataFields.dateX="date",e.dataFields.valueY="confirmed",e.tooltipText="all confirmed: {confirmed}",e.strokeWidth=3}(l),l.yAxis=n,l.hidden=!0,$(l=e.series.push(new L.e)),l.yAxis=o,l.hidden=!0,ee(l=e.series.push(new L.e)),l.yAxis=o,l.hidden=!0;var c=k.f("topLegend",k.b);c.width=k.g(100),c.height=30,e.legend=new L.d,e.legend.parent=c;var s=e.legend.markers.template;s.width=40,s.height=40,e.legend.position="top",e.legend.labels.template.fontSize=12,e.legend.labels.template.fontWeight=500,e.legend.labels.template.fontFamily=W,e.cursor=new L.j;var u=new L.i;u.minHeight=10,u.series.push(i),e.scrollbarX=u,e.scrollbarX.background.fill=k.e("#2e3033"),e.scrollbarX.background.fillOpacity=.2,e.scrollbarX.thumb.background.fill=k.e("#848f94"),e.scrollbarX.thumb.background.fillOpacity=.2,e.scrollbarX.parent=e.topAxesContainer,e.rightAxesContainer.width=100,e.leftAxesContainer.width=100},re=function(e){e.preloader.disabled=!0,e.paddingRight=30,e.colors.list=[k.e("#1dad91"),k.e("#0384fc"),k.e("#6f9ec9"),k.e("#edac15"),k.e("#e84900")],e.xAxes.push(new L.c).renderer.labels.template.disabled=!0;var t=function(e){var t=e.yAxes.push(new L.g);q(t);var a=e.yAxes.push(new L.g);V(a),a.renderer.opposite=!0;var n=e.yAxes.push(new L.g);return Z(n),{percentAxis:a,temperatureAxis:n,calcAxis:t}}(e),a=t.percentAxis,n=t.temperatureAxis,r=t.calcAxis,o=e.series.push(new L.e);te(o),o.yAxis=n;var i=e.series.push(new L.e);Y(i),i.yAxis=a,i.hidden=!0,function(e){e.name="Cloud cover",e.dataFields.dateX="date",e.dataFields.valueY="cloudcover",e.tooltipText="Clouds: {valueY.value} %",e.strokeWidth=3,e.minBulletDistance=10,H(e.bullets.push(new L.a))}(i=e.series.push(new L.e)),i.yAxis=a,i.hidden=!0,$(i=e.series.push(new L.e)),i.yAxis=r,i.hidden=!0,ee(i=e.series.push(new L.e)),i.yAxis=r,i.hidden=!0;var l=k.f("bottomLegend",k.b);l.width=k.g(100),l.height=30,e.legend=new L.d,e.legend.parent=l;var c=e.legend.markers.template;c.width=40,c.height=40,e.legend.position="bottom",e.legend.labels.template.fontSize=12,e.legend.labels.template.fontWeight=500,e.legend.labels.template.fontFamily=W,e.cursor=new L.j;var s=new L.i;s.minHeight=10,s.series.push(o),e.scrollbarX=s,e.scrollbarX.background.fill=k.e("#cc6e21"),e.scrollbarX.background.fillOpacity=.2,e.scrollbarX.thumb.background.fill=k.e("#1d997a"),e.scrollbarX.thumb.background.fillOpacity=.2,e.scrollbarX.parent=e.bottomAxesContainer,e.rightAxesContainer.width=100,e.leftAxesContainer.width=100},oe=function(e){return e>=0?2:-1===e?1:0},ie=a(178),le=function(e,t){X(e,t,"MM-dd:HH");var a=e.xAxes.getIndex(0);a.zoomToDates(new Date(t.startDate),new Date(t.endDate)),a.zoomToDates(a.min,a.max);var n=e.yAxes.getIndex(0);n.zoomToValues(n.min+1,n.max-1);var r=e.yAxes.getIndex(3);r.zoomToValues(r.min+1,r.max-1);var o,i=Object(ie.a)(e.series);try{for(i.s();!(o=i.n()).done;){o.value.bulletsContainer.disposeChildren()}}catch(l){i.e(l)}finally{i.f()}},ce=function(e,t,a){X(e,t,"MM-dd:HH");var n=e.xAxes.getIndex(0);n.zoomToDates(new Date(t.startDate),new Date(t.endDate)),n.zoomToDates(n.min,n.max);var r=e.yAxes.getIndex(0);"Percent (%)"===r.title.text&&r.zoomToValues(r.min+1,r.max-1);var o,i=Object(ie.a)(e.series);try{for(i.s();!(o=i.n()).done;){o.value.bulletsContainer.disposeChildren()}}catch(l){i.e(l)}finally{i.f()}},se=a(91),ue=a(156),de=a(121);var me=function(e,t){var a=function(e){for(var t=[],a=new Date(e.startDate),n=new Date(e.endDate);!Object(ue.a)(a,n);){var r=Object(de.a)(a);t.push({startDate:U(a),endDate:U(r)}),a=Object(G.a)(r,1)}return t.push({startDate:U(a),endDate:U(n)}),t}(t);return Promise.all(a.map((function(t){return fetch("".concat("https://api.worldweatheronline.com/premium/v1/past-weather.ashx","?key=").concat("3f2b6d0ba2734bc49b6173238202004")+"&"+"q=".concat(e.lat+","+e.lng)+"&format=json&"+"date=".concat(t.startDate,"&enddate=").concat(t.endDate)).then((function(e){return e.json()}))}))).then((function(e){return e.reduce((function(e,t){if(t.data.weather)e.push.apply(e,Object(se.a)(t.data.weather));else if(t.data.error){var a=t.data.error;throw console.error(a),a}return e}),[])}))},fe=a(202),pe=(a(245),function(e){var t=e.size,a=e.loading;return r.a.createElement("div",{className:"__Loader__"},r.a.createElement(fe.DotLoader,{sizeUnit:"px",color:"#5ac584",size:t,loading:a}))});pe.defaultProps={size:200,loading:!1};var he=pe,ve=(a(185),null),ge=null;window.onbeforeunload=function(e){ve&&(ve.dispose(),ve=null)};var be=function(e){var t=e.location,a=e.dateRange,o=e.onDataLoaded,i=Object(n.useState)(!1),l=Object(x.a)(i,2),c=l[0],s=l[1];Object(n.useEffect)((function(){t&&a&&(null===ve&&(ve=k.f("dataChart",L.h),ge=z(ve),J(ve),ve.events.on("datavalidated",(function(){s(!1),ge.hide(),setTimeout((function(){o(ve.data)}),1e3)}))),ge.show(),s(!0),me(t,a).then((function(e){null!==ve&&(le(ve,a),ve.data=u(e))})).catch((function(e){null!==ve&&(le(ve,a),ve.data=[],alert(JSON.stringify(e)))})).finally((function(){ve.invalidateData()})))}),[t.lat,t.lng,a.startDate,a.endDate]);var u=function(e){var t=[],a=0;return e.forEach((function(e){0===a&&(a=_(e.date)),e.hourly.forEach((function(n){var r={date:a,DewPointC:parseFloat(n.DewPointC),Humidity:parseFloat(n.humidity),cloudcover:parseFloat(n.cloudcover),WeatherPictogram:2,WindPictogram:1,weatherDesc:n.weatherDesc.length?n.weatherDesc[0].value:"",weatherIconUrl:n.weatherIconUrl.length?n.weatherIconUrl[0].value:null,winddirDegree:parseFloat(n.winddirDegree),windspeedKmph:parseFloat(n.windspeedKmph),mintempC:parseFloat(e.mintempC),maxtempC:parseFloat(e.maxtempC),tempC:parseFloat(n.tempC),visibility:parseFloat(n.visibility),measure:parseFloat(n.DewPointC)-parseFloat(n.tempC)},o=r.DewPointC-r.tempC;r.measure=o,r.measureScale=oe(o),t.push(r),a+=a===j?72e5:108e5}))})),t};return r.a.createElement("div",{className:"__Chart__"},r.a.createElement(he,{loading:c}),r.a.createElement("div",{id:"dataChart",className:"chart"}))},we=a(167),Ae={AD:"AND",AE:"ARE",AF:"AFG",AG:"ATG",AI:"AIA",AL:"ALB",AM:"ARM",AN:"ANT",AO:"AGO",AQ:"ATA",AR:"ARG",AS:"ASM",AT:"AUT",AU:"AUS",AW:"ABW",AZ:"AZE",BA:"BIH",BB:"BRB",BD:"BGD",BE:"BEL",BF:"BFA",BG:"BGR",BH:"BHR",BI:"BDI",BJ:"BEN",BM:"BMU",BN:"BRN",BO:"BOL",BR:"BRA",BS:"BHS",BT:"BTN",BV:"BVT",BW:"BWA",BY:"BLR",BZ:"BLZ",CA:"CAN",CC:"CCK",CD:"COD",CF:"CAF",CG:"COG",CH:"CHE",CI:"CIV",CK:"COK",CL:"CHL",CM:"CMR",CN:"CHN",CO:"COL",CR:"CRI",CU:"CUB",CV:"CPV",CX:"CXR",CY:"CYP",CZ:"CZE",DE:"DEU",DJ:"DJI",DK:"DNK",DM:"DMA",DO:"DOM",DZ:"DZA",EC:"ECU",EE:"EST",EG:"EGY",EH:"ESH",ER:"ERI",ES:"ESP",ET:"ETH",FI:"FIN",FJ:"FJI",FK:"FLK",FM:"FSM",FO:"FRO",FR:"FRA",GA:"GAB",GB:"GBR",GD:"GRD",GE:"GEO",GF:"GUF",GG:"GGY",GH:"GHA",GI:"GIB",GL:"GRL",GM:"GMB",GN:"GIN",GP:"GLP",GQ:"GNQ",GR:"GRC",GS:"SGS",GT:"GTM",GU:"GUM",GW:"GNB",GY:"GUY",HK:"HKG",HM:"HMD",HN:"HND",HR:"HRV",HT:"HTI",HU:"HUN",ID:"IDN",IE:"IRL",IL:"ISR",IM:"IMN",IN:"IND",IO:"IOT",IQ:"IRQ",IR:"IRN",IS:"ISL",IT:"ITA",JE:"JEY",JM:"JAM",JO:"JOR",JP:"JPN",KE:"KEN",KG:"KGZ",KH:"KHM",KI:"KIR",KM:"COM",KN:"KNA",KP:"PRK",KR:"KOR",KW:"KWT",KY:"CYM",KZ:"KAZ",LA:"LAO",LB:"LBN",LC:"LCA",LI:"LIE",LK:"LKA",LR:"LBR",LS:"LSO",LT:"LTU",LU:"LUX",LV:"LVA",LY:"LBY",MA:"MAR",MC:"MCO",MD:"MDA",ME:"MNE",MG:"MDG",MH:"MHL",MK:"MKD",ML:"MLI",MM:"MMR",MN:"MNG",MO:"MAC",MP:"MNP",MQ:"MTQ",MR:"MRT",MS:"MSR",MT:"MLT",MU:"MUS",MV:"MDV",MW:"MWI",MX:"MEX",MY:"MYS",MZ:"MOZ",NA:"NAM",NC:"NCL",NE:"NER",NF:"NFK",NG:"NGA",NI:"NIC",NL:"NLD",NO:"NOR",NP:"NPL",NR:"NRU",NU:"NIU",NZ:"NZL",OM:"OMN",PA:"PAN",PE:"PER",PF:"PYF",PG:"PNG",PH:"PHL",PK:"PAK",PL:"POL",PM:"SPM",PN:"PCN",PR:"PRI",PS:"PSE",PT:"PRT",PW:"PLW",PY:"PRY",QA:"QAT",RE:"REU",RO:"ROU",RS:"SRB",RU:"RUS",RW:"RWA",SA:"SAU",SB:"SLB",SC:"SYC",SD:"SDN",SE:"SWE",SG:"SGP",SH:"SHN",SI:"SVN",SJ:"SJM",SK:"SVK",SL:"SLE",SM:"SMR",SN:"SEN",SO:"SOM",SR:"SUR",ST:"STP",SV:"SLV",SY:"SYR",SZ:"SWZ",TC:"TCA",TD:"TCD",TF:"ATF",TG:"TGO",TH:"THA",TJ:"TJK",TK:"TKL",TL:"TLS",TM:"TKM",TN:"TUN",TO:"TON",TR:"TUR",TT:"TTO",TV:"TUV",TW:"TWN",TZ:"TZA",UA:"UKR",UG:"UGA",UM:"UMI",US:"USA",UY:"URY",UZ:"UZB",VA:"VAT",VC:"VCT",VE:"VEN",VG:"VGB",VI:"VIR",VN:"VNM",VU:"VUT",WF:"WLF",WS:"WSM",YE:"YEM",YT:"MYT",ZA:"ZAF",ZM:"ZMB",ZW:"ZWE"};function Ee(e,t,a,n){var r=e-a,o=t-n;return r*r+o*o}function Me(e,t){return t?e:[e]}function ye(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Object(se.a)(Array(t).keys()).reduce((function(t,n){return t.then((function(t){return e(n).then((function(e){return[].concat(Object(se.a)(t),Object(se.a)(Me(e,a)))}))}))}),Promise.resolve([]))}function De(e,t,a,n){var r=n*a,o=Math.min(r+a,t);return Promise.all(Object(se.a)(Array(o-r).keys()).map((function(t){return e(r+t)})))}var Ce,Ne=a(133),xe=(Ce={AL:"Alabama",AK:"Alaska",AS:"American Samoa",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FM:"Federated States of Micronesia",FL:"Florida",GA:"Georgia",GU:"Guam",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MH:"Marshall Islands",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",MP:"Northern Mariana Islands",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PW:"Palau",PA:"Pennsylvania",PR:"Puerto Rico",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VI:"Virgin Islands",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",AE:"Armed Forces Africa",AA:"Armed Forces Americas (except Canada)"},Object(Ne.a)(Ce,"AE","Armed Forces Canada"),Object(Ne.a)(Ce,"AP","Armed Forces Pacific"),Ce),Oe={},Te=function(e){return e},Se=function(e){var t=e.data;return t.iso3=Ae[t.code],t.timelineMap={},t.timeline.forEach((function(e){t.timelineMap[_(e.date)]=e})),t};function Re(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Te;return Oe[t]?Promise.resolve(Oe[t]):fetch(e).then((function(e){return e.json()})).then((function(e){return Oe[t]=a(e),Oe[t]})).catch((function(e){throw console.error(e),e}))}function Ie(e,t){var a=Number.POSITIVE_INFINITY,n=null;return t.forEach((function(t){var r=Ee(e.lat,e.lng,t.lat,t.lng);r<a&&(a=r,n=t)})),n}var Fe=function(e,t){var a=_(t.startDate),n=_(t.endDate);return Object.keys(e.timelineMap).reduce((function(t,r){if(a<=r&&r<=n){var o=e.timelineMap[r];t[r]={confirmed:o.confirmed,new_confirmed:o.new_confirmed}}return t}),{})};function ke(e,t,a){var n=function(e){for(var t=[],a=_(e.startDate),n=_(e.endDate),r=a;r<=n;r+=r===j?828e5:B)t.push(r);return t}(t);return function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return 1===a?ye(e,t):ye((function(n){return De(e,t,a,n)}),Math.ceil(t/a),!0)}((function(t){var r=n[t],o="USA"===e.iso3?"q":"region_province";return fetch("https://covid-api.com/api/reports?"+"date=".concat(U(r))+"&"+"iso=".concat(e.iso3)+"&"+"".concat(o,"=").concat(e.name)+(a?"&city_name=".concat(a.name):"")).then((function(e){return e.json()})).then((function(e){return e.data[0]})).then((function(e){return a?e.region.cities[0]:e})).then((function(e){return{millis:r,confirmed:e&&e.confirmed?Math.max(e.confirmed,1):null,new_confirmed:e?e.confirmed_diff:0}})).catch((function(e){return console.error(e),{millis:r,confirmed:null,new_confirmed:0}}))}),n.length,5).then((function(t){var n=function(e){var t=!1,a=e.reduce((function(e,a){return t?null===a.confirmed&&e++:null!==a.confirmed&&(t=!0),e}),0);return t?a:e.length}(t);if(n/t.length>.33)return console.log("-> Province: "+e.name+(a?", City: "+a.name:"")+": MAX ERROR PERCENT EXCEEDED",100*n/t.length),null;for(var r=1;r<t.length;++r)null===t[r].confirmed&&(t[r].confirmed=t[r-1].confirmed);return t})).then((function(e){return e?e.reduce((function(e,t){return e[t.millis]={confirmed:t.confirmed,new_confirmed:t.new_confirmed},e}),{}):null}))}function Le(e,t,a){return fetch("https://covid-api.com/api/reports?"+"date=".concat(a.startDate)+"&"+"iso=".concat(t.iso3)+"&"+"q=".concat(t.name)).then((function(e){return e.json()})).then((function(e){return e.data})).then((function(t){var a=t.reduce((function(e,t){var a=t.region.cities.map((function(e){return{name:e.name,lat:e.lat,lng:e.long}}));return[].concat(Object(se.a)(e),Object(se.a)(a))}),[]);return Ie(e,a)}))}var Pe=function(e,t){var a=function(e,a,n,r){return{country:a.name,population:e?null:a.population,province:e&&n?n.name:null,city:e&&r?r.name:null,timelineMap:e||Fe(a,t)}},n=function e(t,n,r,o,i){return ke(n,r,o).then((function(l){return l||!o?l||i?a(l,t,n,o):null:e(t,n,r,null,i)}))};return Re("https://corona-api.com/countries","virusSpreadCountries",(function(e){return e.data})).then((function(r){return function(e){return fetch("".concat("https://secure.geonames.org/countryCode","?username=").concat("norama")+"&lat=".concat(e.lat,"&lng=").concat(e.lng)).then((function(e){return e.text()})).then((function(e){return e.trim()}))}(e).then((function(e){var t=r.find((function(t){return t.code===e}));if(!t)throw"country with code: "+e+" not found";return t})).catch((function(t){return console.error(t),console.log("country code error, taking closest country",t),function(e,t){var a=Number.POSITIVE_INFINITY,n=null;return t.forEach((function(t){var r=Ee(e.lat,e.lng,t.coordinates.latitude,t.coordinates.longitude);r<a&&(a=r,n=t)})),n}(e,r)})).then((function(e){return Re("https://corona-api.com/countries/"+e.code,"virusSpreadCountries-"+e.code,Se)})).then((function(r){return(o=r.iso3,fetch("https://covid-api.com/api/provinces/"+o).then((function(e){return e.json()})).then((function(e){return e.data})).then((function(e){return e.filter((function(e){return null!==e.lat&&null!==e.long}))})).then((function(e){return e.map((function(e){return{iso3:e.iso,name:e.province,lat:e.lat,lng:e.long}}))}))).then((function(o){if("GBR"===r.iso3&&(o=o.filter((function(e){return"Channel Islands"!==e.name&&"Isle of Man"!==e.name}))),o.length<=1)return a(null,r);var i=Ie(e,o);return"USA"===r.iso3?Le(e,i,t).then((function(l){return n(r,i,t,l).then((function(l){return l||((i=function(e,t){if("USA"!==e.iso3||e.name.length<2)return null;var a=e.name.substring(e.name.length-2),n=xe[a];return t.find((function(e){return e.name===n}))}(i,o))?Le(e,i,t).then((function(e){return n(r,i,t,e,!0)})):a(null,r))}))})):n(r,i,t).then((function(a){return a||(i=Ie(e,o.filter((function(e){return e!==i}))),n(r,i,t,null,!0))}))}));var o}))}))},Ge=a(293);a(246);var Be=function(e){var t=e.color,a=e.data;return a?r.a.createElement("h3",null,r.a.createElement(Ge.a,{color:t},a)):null},je=function(e){var t=e.country,a=e.province,n=e.city,o=e.population;return r.a.createElement("div",{className:"__LocationVirusInfo__"},r.a.createElement("div",{className:"label"},"Virus data for"),r.a.createElement("div",{className:"data country"},r.a.createElement(Be,{color:"secondary",data:t})),r.a.createElement("div",{className:"data province"},r.a.createElement(Be,{color:"info",data:a})),r.a.createElement("div",{className:"data city"},r.a.createElement(Be,{color:"danger",data:n})),r.a.createElement("div",{className:"label"},o?"Population:":null),r.a.createElement("div",{className:"data population"},function(e){return e?e.toLocaleString():null}(o)))},Ue=(a(247),{Czechia:"czech-republic","S. Korea":"south-korea",USA:"US"}),_e={"New York City, NY":"new-york"};function We(e){return Ue[e]?Ue[e]:e}function He(e){return _e[e]?_e[e]:e}var Ve=function(e){var t=e.country,a=e.province;return r.a.createElement("div",{className:"__CountryVirusInfo__"},r.a.createElement("a",{href:"USA"===t&&a?"https://www.worldometers.info/coronavirus/usa/"+He(a):"https://www.worldometers.info/coronavirus/country/"+We(t),target:"_blank",rel:"noopener noreferrer"},"USA"===t&&a?a:t," virus data"))},Ke=a(303),Ye=a(295),Ze=a(296),ze=a(297);a(248);function Xe(e){e.stopPropagation()}var Je=function(e){var t=e.close,a=Object(n.useState)(!1),o=Object(x.a)(a,2),i=o[0],l=o[1];Object(n.useEffect)((function(){l(!1)}),[t]);return r.a.createElement("div",{className:"__References__"},r.a.createElement("div",{className:"references",id:"references"},r.a.createElement(R.a,{color:"link"},"References")),r.a.createElement(Ke.a,{placement:"top",isOpen:i,target:"references",toggle:function(){l((function(e){return!e}))}},r.a.createElement(Ye.a,{onClick:Xe},r.a.createElement(Ze.a,null,r.a.createElement(ze.a,{className:"references-popup"},r.a.createElement("h3",null,"Virus data"),r.a.createElement("ul",null,r.a.createElement("li",null,"Data per country:",r.a.createElement("br",null),r.a.createElement("a",{href:"https://about-corona.net/documentation",target:"_blank",rel:"noopener noreferrer"},"corona-api")),r.a.createElement("li",null,"Data per province / USA city:",r.a.createElement("br",null),r.a.createElement("a",{href:"https://covid-api.com/api",target:"_blank",rel:"noopener noreferrer"},"covid-api"))),r.a.createElement("h3",null,"Meteorological approximations (with / without visibility)"),r.a.createElement("a",{href:"https://www.medrxiv.org/content/10.1101/2020.03.16.20037168v1.full.pdf",target:"_blank",rel:"noopener noreferrer"},"Roles of meteorological conditions in COVID-19 transmission on a worldwide scale"))))))},Qe={estimate:{chart:null,certain:null},virus:{chart:null,certain:null}},qe=Qe;function $e(){(qe=Object(we.a)({},Qe)).virus.chart=k.f("virusChart",L.h),qe.virus.certain=z(qe.virus.chart),qe.estimate.chart=k.f("estimateChart",L.h),qe.estimate.certain=z(qe.estimate.chart),function(e,t){var a,n;ne(e),re(t),a=e,(n=t).zoomOutButton.events.on("hit",(function(e){var t=a.xAxes.getIndex(0);t.zoomToDates(t.min,t.max)})),n.xAxes.getIndex(0).events.on("selectionextremeschanged",(function(e){a.xAxes.getIndex(0).zoomToDates(e.target.minZoomed,e.target.maxZoomed)})),n.cursor.events.on("cursorpositionchanged",(function(e){a.cursor.triggerMove(e.target.point,"none",!0)}))}(qe.virus.chart,qe.estimate.chart)}function et(e){e&&e.dispose()}window.onbeforeunload=function(e){et(qe.estimate.chart),et(qe.virus.chart),qe=Qe};var tt=function(e){var t=e.temp,a=e.wind,n=e.vis,r=e.rh;return-.1366*t*t+3.6046*t-.3883*a*a+20.2509*a+5929.9403/(n+19.1774)-505.8484*r*r*r+316.6004*r*r+189.1295*r-422.3774},at=function(e){var t=e.temp,a=e.wind,n=e.rh;return-.18*t*t+3.1628*t-.4385*a*a+21.142*a-228.4231*n*n*n-391.9561*n*n+880.719*n-401.8395};var nt=function(e){var t=e.weatherData,a=e.location,o=e.dateRange,i=e.reset,l=Object(n.useState)(0),c=Object(x.a)(l,2),s=c[0],u=c[1],d=Object(n.useState)(null),m=Object(x.a)(d,2),f=m[0],p=m[1];Object(n.useEffect)((function(){v()}),[i]),Object(n.useEffect)((function(){$e(),qe.virus.chart.events.on("datavalidated",(function(){qe!==Qe&&(qe.virus.certain.hide(),qe.estimate.certain.hide())}))}),[]),Object(n.useEffect)((function(){if(!t)return p(null),qe.virus.certain.show(),void qe.estimate.certain.show();p(null),qe.virus.certain.show(),qe.estimate.certain.show(),h().then((function(e){var t=e.data,a=e.country,n=e.province,r=e.city,i=e.population;if(qe!==Qe){var l;l=12,Math.floor(Math.random()*Math.floor(l));ce(qe.estimate.chart,o),ce(qe.virus.chart,o),qe.virus.chart.data=t,qe.estimate.chart.data=t,p({country:a,province:n,city:r,population:i})}})).catch((function(e){if(qe!==Qe){ce(qe.virus.chart,o),ce(qe.estimate.chart,o),qe.virus.chart.data=[],qe.estimate.chart.data=[],console.error(e);var t=JSON.stringify(e);"{}"!==t?alert(t):alert("ERROR: see console for details.")}})).finally((function(){qe.virus.chart.invalidateData(),qe.estimate.chart.invalidateData()}))}),[t]);var h=function(){return Pe(a,o).then((function(e){var a=[],n=null;return t.forEach((function(t){var r={temp:t.tempC,wind:t.windspeedKmph/1.60934,vis:t.visibility/1.60934,dewpoint:t.DewPointC,humidity:t.Humidity/100};r.rh=r.humidity;var o={date:t.date,calc1:tt(r),calc2:at(r),measure:r.dewpoint-r.temp,Humidity:t.Humidity,cloudcover:t.cloudcover};o.measureScale=oe(o.measure);var i=e.timelineMap[o.date];i?(o.confirmed=i.confirmed,o.new_confirmed=i.new_confirmed,n=o):n?(o.confirmed=n.confirmed,o.new_confirmed=o.date-n.date<B?n.new_confirmed:0):(o.confirmed=null,o.new_confirmed=0),a.push(o)})),{country:e.country,province:e.province,city:e.city,population:e.population,data:a}}))},v=function(){u((function(e){return e+1}))};return r.a.createElement("div",{className:"__Chart__",onClick:v},r.a.createElement(he,{loading:!f}),r.a.createElement("div",{className:"chart"},r.a.createElement("div",{className:"calc-top-chart"},r.a.createElement("div",{id:"topLegend",className:"top-legend"}),r.a.createElement("div",{id:"virusChart",className:"top-chart"})),r.a.createElement("div",{className:"calc-bottom-chart"},r.a.createElement("div",{id:"estimateChart",className:"bottom-chart"}),r.a.createElement("div",{id:"bottomLegend",className:"bottom-legend"}))),f?r.a.createElement(je,f):null,f?r.a.createElement(Ve,f):null,r.a.createElement(Je,{close:s}))},rt=(a(271),function(e){return Object(g.a)(new Date(e),"MMM d")}),ot=function(e){var t=e.location,a=e.dateRange,o=e.name,i=Object(n.useState)(!1),l=Object(x.a)(i,2),c=l[0],u=l[1],d=Object(n.useState)(null),m=Object(x.a)(d,2),f=m[0],p=m[1],h=Object(n.useState)("1"),v=Object(x.a)(h,2),g=v[0],b=v[1],w=Object(n.useState)(!1),A=Object(x.a)(w,2),E=A[0],M=A[1],y=function(e){g!==e&&(b(e),E||M(!0))};Object(n.useEffect)((function(){u(!1)})),Object(n.useEffect)((function(){p(null),b("1"),M(!1)}),[t.lat,t.lng,a.startDate,a.endDate,o]);return r.a.createElement(r.a.Fragment,null,c?r.a.createElement(s.a,{to:"/parameters?"+"lat=".concat(t.lat)+"&"+"lng=".concat(t.lng)+"&"+"name=".concat(o)+"&"+"startDate=".concat(a.startDate)+"&"+"endDate=".concat(a.endDate)}):null,r.a.createElement("div",{className:"__Weather__"},r.a.createElement("div",{className:"weather-info"},r.a.createElement(O.a,{tabs:!0},r.a.createElement(T.a,null,r.a.createElement(S.a,{className:"1"===g?"active":"",onClick:function(){y("1")},disabled:null===f},"Data")),r.a.createElement(T.a,null,r.a.createElement(S.a,{className:"2"===g?"active":"",onClick:function(){y("2")},disabled:null===f},"Calc"))),r.a.createElement("h5",{className:"name",title:o},o),r.a.createElement("h5",{className:"date-range"},rt(a.startDate)+" - "+rt(a.endDate)),r.a.createElement(R.a,{color:"primary",type:"button",onClick:function(){u(!0)},className:"button"},"Parameters")),r.a.createElement(I.a,{activeTab:g},r.a.createElement(F.a,{tabId:"1"},r.a.createElement(be,{location:t,dateRange:a,onDataLoaded:p})),r.a.createElement(F.a,{tabId:"2"},r.a.createElement(nt,{weatherData:E?f:null,location:t,dateRange:a,reset:c}))),"1"===g?r.a.createElement("a",{href:"https://www.worldweatheronline.com/developer/",className:"weather-reference",target:"_blank",rel:"noopener noreferrer"},"Powered by World Weather Online"):null))},it=a(206);a(278);function lt(e){e.stopPropagation()}var ct=function(e){var t=e.startDate,a=e.endDate,n=e.onChange,o=e.popoverOpen,i=e.onTogglePopover;return r.a.createElement("div",{className:"__DateRange__"},r.a.createElement("div",{className:"daterange"},r.a.createElement("h5",{className:"title"},"Date range:"),r.a.createElement("div",{className:"range",id:"daterange"},r.a.createElement("h5",{className:"text"},Object(g.a)(t,"MMM d")," - ",Object(g.a)(a,"MMM d")),r.a.createElement(R.a,{outline:!o,color:"secondary",className:"change"},o?"Done":"Change"))),r.a.createElement(Ke.a,{placement:"bottom",isOpen:o,target:"daterange",toggle:i},r.a.createElement(Ye.a,{onClick:lt},r.a.createElement(it.DateRangePicker,{showSelectionPreview:!0,moveRangeOnFirstSelection:!1,maxDate:new Date,months:2,direction:"horizontal",ranges:[{startDate:t,endDate:a,key:"selection"}],staticRanges:[],onChange:function(e){n(e.selection)}}))))},st=a(11),ut=a.n(st),dt=(a(287),a(279),a(207)),mt=a.n(dt),ft=a(208),pt=a.n(ft),ht=ut.a.icon({iconUrl:mt.a,shadowUrl:pt.a,iconSize:[25,41],shadowSize:[41,41],iconAnchor:[13,41],shadowAnchor:[13,41],popupAnchor:[0,-27]});ut.a.Marker.prototype.options.icon=ht;var vt=function(e){var t=e.latlng,a=e.query,o=e.onChange;return Object(n.useEffect)((function(){var e=function(e){o({latlng:[e.center.lat,e.center.lng],name:e.name})},n=ut.a.map("map",{center:t,zoomControl:!1,zoom:13,maxZoom:18,layers:[ut.a.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png",{zoom:13,maxZoom:18,attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),ut.a.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{zoom:13,maxZoom:18,attribution:'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'})]});n.zoomOut(),ut.a.control.zoom({position:"topright"}).addTo(n);var r=new ut.a.Control.Geocoder.Nominatim,i=ut.a.Control.geocoder({collapsed:!0,position:"topleft",geocoder:r,query:a,suggestMinLength:3,placeholder:"Search query or lat,lng"}).on("markgeocode",(function(t){e(t.geocode),setTimeout((function(){i._expand()}),500)})).on("collapse",(function(){setTimeout((function(){i._expand()}),500)})).addTo(n);i._toggle=i._geocode;var l=document.querySelector(".leaflet-control-geocoder-form input"),c=function(t){t.bbox||(t.bbox=ut.a.latLngBounds(t.center,t.center)),t.html||t.name||(t.html="[".concat(t.center.lat,", ").concat(t.center.lng,"]"),t.name=""),i.markGeocode(t),e(t),setTimeout((function(){i._expand()}),500)};r.geocode(a,(function(e){var a=e.length?e[0]:{center:ut.a.latLng(t)};c(a)})),n.on("expand",(function(){l.focus()})),n.on("dblclick",(function(e){var t=ut.a.latLng(e.latlng);r.reverse(t,1,(function(e){l.value=t.lat+"."+t.lng;var a=e.length?e[0]:{};a=Object(we.a)({},a,{center:t}),c(a)}))})),setTimeout((function(){i._expand()}),500)}),[]),r.a.createElement("div",{className:"__Location__"},r.a.createElement("h5",{className:"title"},"Location (search or double click on map):"),r.a.createElement("div",{id:"map",className:"leaflet-map"}))},gt=(a(280),function(e){var t=e.location,a=e.dateRange,o=e.name,i=new Date(a.startDate),l=new Date(a.endDate),c=[parseFloat(t.lat),parseFloat(t.lng)],u=Object(n.useState)({startDate:i,endDate:l}),d=Object(x.a)(u,2),m=d[0],f=d[1],p=Object(n.useState)({latlng:c,name:o}),h=Object(x.a)(p,2),v=h[0],g=h[1],b=Object(n.useState)({weather:!1,popoverOpen:!1}),w=Object(x.a)(b,2),A=w[0],E=w[1];Object(n.useEffect)((function(){E({weather:!1,popoverOpen:!1})}),[t,a,o]);return r.a.createElement(r.a.Fragment,null,A.weather?r.a.createElement(s.a,{to:"/?"+"lat=".concat(v.latlng[0].toFixed(3))+"&"+"lng=".concat(v.latlng[1].toFixed(3))+"&"+"name=".concat(v.name)+"&"+"startDate=".concat(U(m.startDate))+"&"+"endDate=".concat(U(m.endDate))}):null,r.a.createElement("div",{className:"__Parameters__",onClick:function(e){e.stopPropagation(),E((function(e){return{weather:!1,popoverOpen:!1}}))}},r.a.createElement("div",{className:"weather-button"},r.a.createElement(ct,{startDate:m.startDate,endDate:m.endDate,onChange:f,popoverOpen:A.popoverOpen,onTogglePopover:function(e){e.stopPropagation(),E((function(e){return{weather:!1,popoverOpen:!e.popoverOpen}}))}}),r.a.createElement(R.a,{color:"primary",className:"button",onClick:function(e){e.stopPropagation(),E({weather:!0,popoverOpen:!1})}},"Charts")),r.a.createElement(vt,{latlng:v.latlng,query:v.name,onChange:g})))}),bt=0;function wt(e){return bt||(e&&(bt=1),bt)}var At=function(e){var t=e.match,a=e.children;return r.a.createElement("div",{style:t?{display:"block"}:{display:"none"}},a)},Et=function(){var e=N();return r.a.createElement(gt,e)},Mt=function(){var e=N();return r.a.createElement(ot,e)},yt=function(){return r.a.createElement(c.a,{basename:"/"},r.a.createElement("div",null,r.a.createElement(s.b,{path:"/parameters",exact:!0,children:function(e){var t=e.match,a=Object(l.a)(e,["match"]);return r.a.createElement(At,{key:wt(t),match:t},r.a.createElement(Et,a))}}),r.a.createElement(s.b,{path:"/",exact:!0,children:function(e){var t=e.match,a=Object(l.a)(e,["match"]);return r.a.createElement(At,{match:t},r.a.createElement(Mt,a))}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(281),a(282),a(283),a(284),a(285);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(yt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[212,1,3]]]);
//# sourceMappingURL=main.684aef5b.chunk.js.map