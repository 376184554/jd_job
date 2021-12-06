/*
[task_local]
雀巢母婴京东自营旗舰店-抢券
0 0 0,10,20 * * ?  jd_qc.js, tag=雀巢母婴京东自营旗舰店-抢券, enabled=true
================Loon==============
[Script]
cron "0 0 0,10,20 * * ?" script-path=jd_qc.js,tag=雀巢母婴京东自营旗舰店-抢券
*/
const $ = new Env('雀巢母婴京东自营旗舰店-抢券');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
var _0xod7='jsjiami.com.v6',_0xod7_=['‮_0xod7'],_0x3825=[_0xod7,'HwHCqsK4','JWjCsEXCnw==','wplFwrItwrg=','RSIt','6K2j5Ymk6ZmF5oW35Z2aDxEjTgvovJ7lhormo7/kvKTmlp7lhrnlr4/CtOW6veittumCuui+i+iFjOacgOWNsuiMnuWOmW/Du8KdwohcEw==','asOtwoLCr3TDtw==','WcO/w6UkwpvCvhpgw4A=','wq5OdsORX0BbaMKOHk/DnmteG2fCpTrCnMOlFQzDoBwzIyBoBsOWw5ZUfynCjMONIMOsw5zDsMOTwo/DrsO3aG9LSSRiYjjDrHUXw6BAKl9Rw6HDiMKyw6Bnw5zDuMOcw40rw4LClVXDl1A6wq1pQ2XDhsOhw7YeQsKmS8KBUlPCuVTDssK2fcOOw7/CjDlBw5bDkUo1WMK3w6EqX8K+wqvCpy4nw7fDlcKjAMOobMKUw6nDqcK9wpbDscOgYC7Ctm5CwrrCmQ==','dsODw50ZQgprIxhTw7VvwpLDt1DCuHjDm8K6RENxHsO+NTxha8O9GRfCqMKLw6ooaULCoSh6wq/Dth4vwrzCpcKHw7IkYCzClcOydi8mVXLDuMK6aTrCmcO+','w5PCtHHClsO8','wpVwwovDs8K0M8Kx','ZcOfw48Tw5Q=','wpzDpUh+TFRebV8=','w647w4hewrfDigjCkMKUXDk=','UWPCjsKPwrPDhHjCqMO8wrktHSPDjn5XCsOoaVLClgAWQlbCmMKWwqjDjiXClUkTwokBwowRKMOFw67Ci8OtWMKnw5rDqcK2WxIbwo3DtcKrwpzDuMOnVETCpkV8woVWwrk=','wrnCoFYbw7g=','NG88JsK3','InHCjlXCmg==','wovDvyLDk3gZOCrCvxTCmhgxaUrDiU11Y3rDonBKLTDClgVDw650IcORL3XCvsKuw53ClXXDsF5gHjjDvhnCvMKuw5DDrS4DLi45wonCgitAwrxXHUM9RzQQJsKNwoVSFlzDvV3Cm1jCrMKSw5oDw7hEw7cpwr7Cp8Ouw6xkwoU7w5jDt0rDg8KVw49wQD8IMiB6Zjt0w6gxwrrCucOfGsOUX8KFcTnCgcO9w43DkcOIw6nCqMOBw4tew79bUMO4w6o=','csOTw4QJw4LCuQNGw4AJw7ZNw5HCsQ==','E8KBWS4=','w5zCu8KnwpQ=','wrHCtVw=','w4VtwqU=','wptKC8K9w5LCssKuwrc=','wpbCtXg5w6o=','PkvCnQ==','BxjCqgpBw7/ComFQ','Ui7DrcK8clFz','F8OvYXJLw6cEw4Rh','w5HCqn/CjMO0Bw==','f8OnwpzCsmHDsQ==','MsOhYmpH','44KN5o6K56af44Cq6K2t5Yet6I+N5Yyv5Lmf5Lip6LWx5Y2e5LqDwpvCuHnCusOAwrRL55qu5o6L5L+a55eTw73DgGtww6DCiueZn+S7uOS4oOevmOWLhuiMj+WMvw==','WcO0wozDm3pzw7vDhXgWGG3CnsKWNsOMwrDDtQp2w7bDqSHCvSTCg8O0DcOfFlvDrsORwrfDpzHDilg8w5ghwrXDqw==','XsKtIzQPwq9awqMIwpvCnsOFw4PmtY3lioXln5XlnblXwqLDqHw8I8OXw7nDi1HClsOjwrA=','woFQwrQuwq4FwptnYW1kRcOhHsOYw6QSw6PDusKYMcOwEcOyDgpXwoN0fcO2w5nCiXICw6sewox4QsO7dMOAw4DCvMOaIBvCmmXCoQ3ChcOBR8Onw7owwqXCiV7Cp3DCuG9gwrdZw47DnMKIw6gYwo7Ck8ODBCPDimlew4xgw4sHXcKMw7JMRxHDucOKfgM2wqbCvcKrS3zDgyEqw5IZwrPDjixENcOZfcOJwr3Ck8Ovw4BJccOrPEfDo3vChi84w6tKw5QTwqTDgHl9IBfCp8OfwrzDvcKIIsO4wqHCjz7CosKywrdOwqrClGrCoGvDosKywoZXw4d8P8KRI8KtOcKIw6Iow4HCp8Oqw5nDgsOgfy7DrgzDiQx6w5AdNhp5JcOawoPCpMOrRTjDiwjDucO/w6QZeMKjwpDChcOpCUs+AkPCoBzChCU5wqDCmgLDhcK8wonDtRLDhzUVcsKzwpZ9ZFHDsEMJwrjCgm44DiXCnydtPCHCmHUuI8KcWTHDrQI=','wp9ZwokkOw==','w7Y8wqrCqT0=','w7jDocKhEhY3UzJ3DsKjwobDisK8w41YWMOdKMK1','Jnthw6bCgsKkPRgyNnU4wo7Cu8KBwoMowpPCisKKw7Bvc1PDvxDDvlNFw7HDusOuSsKJw7dLYTTDk8OEw4F/w6bCssOKwpQ/XMOFM8KBwosGOcKhwosHwqPCvcKMwqzCj18jwpDCuCw/w7zCqUzCicO2w77DtTVCQ8Kww5TDsmfCmcOqw5s5JRjCogUew5nDumbCqjvCjsOVwoAZwqBSVV7DgsOrfixKDsKGXsOuwqXDhsOpw75ow4/CnnRTRcKawqZLw6bDlcKVORbDvg0awoPDisOEWMK4wrB0EgkcFGHDkT/CmVjCu8ORWsOhwqVawqAgA8OXFyDDtsKsB8OmccKbw5hrw6rCukhrwqnDisKHw4kSFMK0w6bCokzCmg==','HSLCrcKF','wosnw67CjGDCtMOrc2/DrUZow4DCq8O+fsOHCERMLsKUGFdOw4rDkDTDiG/DhRoGewnCgFfCmcOcT8KnQlc=','w4JYw4ZNw5E=','wo88w70=','CkZvw7HCnw==','RcO9w70iw7w=','w6FCwqd6wpo=','wqZIwq4rBsKH','S8Osw5hRwrU=','FkzCoHLChQ==','cMO9wrzCqWPDqsOX','w6lfw4s=','WA7DkB3Dh8KbwoLlv43lpajjgY7kuKrkuKPotr3ljL4=','OGwoN8K2','w4lQwpnCsMKvXsKlwr0=','w77DsQDDgRTCo8KNw5LCpHE=','OHEAPcKpwq5T','wo7Dp8O9Lw==','44Ge5o+f56Sv44KHwpLDsX1cNynlt6zlpaPmlqI=','5LuU5Lu46LSG5Y6q','LyptwqNd','wp9ewqU+PMKOdQI=','wq3or47phLfmlavnmprlvarojb/ljI7Cp8KRw6/CpsOwasKoV8OrcgExH1zDlMK3YcK3ckAww4PCnkPDrD4ALUwbXFLCjwo4woHCrSZGSMOpw43CoRA=','LAPCsRFbwqDDhwoAPMOUeMKGw7pRJgISXRtewqXCvT/Ct8OVecK9wqTClA7CoW7Do8K6UsOKacKMcl4kw5U=','dRlIb8KLQA==','wpPDo8O+LsKwZsODw4cKDA==','aXXCswjCgDPltKHlp5DmlZkYwpzDhA==','BHEpIMKAwqZQaQ==','5Luo5Lmr6Lej5Y6W','w6rorbHphZ3ml7rnmoXlvZzojIDljbgPGsKGWcKPw4g=','w4o9wqTClw0=','w68qw5Vww48=','cTPDs8KpSw==','wo53e8ObZQ==','wp1Mw6jDmsKy','eTNBYsKX','ecOMTSU=','TMOxw7oEw5fCrhs=','woUTwoZ7WMONw71o','w4Y5w7U=','w6ZRw5hkw5M=','BHHlpbvotJYsc+WNjOWYggDCkA==','FwnCqcK8wqt+w5k=','wq5Cwq4p','SMODQAXCvw==','fcO5w6www4E=','KS/CtSJR','ZsOYw7ZPwqg=','w6/ChsKRwpPDog==','wpDCmFjCqG0=','NFs1HsKl','wr8xTVPCkQ==','wppowoc/wpg=','w7gfw6Now7Q=','woUQw57CkGY=','wrHCunA4w6DDvsOz','wr1cwpMRwrM=','w7ZEw55uw5XCtQMAeg==','RD4t','w4Q3w7/Duw==','w4llwpAX6Kyq5rG95aaF6LWt77ye6K+y5qOL5p+Q576e6Lac6YS76K2b','fcOLwqnCkko=','wobCim3CknI=','w4XCoXrChMOH','NW0iNw==','NmHCo2PCow==','wo9Ww4PDm8Kf','ZsOgUR3CnA==','cFAUCsKP','wrjCtE0=','woHDg8OUJcKX','ZQQ8Ulk=','w6vDjmxQVQ==','fsOrwoQ=','ZQssflo=','LhJlwqd/','OMOvaQ==','Rj/Dq8KxfUJ7wqzDjg==','wqZCwqc=','I3MUw4Torrzms7blpZzotb3vvIHorIrmoLDmn5Xnvp3ot4PphqTorrU=','ew/DlcKpWg==','wqbCrEjCrnY=','w5N3wqFYwoYkCsOjwq8=','wqM4wr4=','w64ewo7Cjg==','LFVww7DoroTmsaTlp7fotbzvvavor43moYnmnZfnvIXot7nphrTorII=','wo3DggLDqkM=','bB87R2w=','fgLDlsKfew==','wqdewqc=','44Oz5o+x56S244Kp6K+E5YWk6I6N5Y6R5LiX5Lis6LWZ5YyJ5LmDcR1mwrsrw4LDj+eaoOaPh+S/u+eVhhIlJjF0wpnnmaLku4PkuYPnrJnli5nojILljoM=','XsOOwr7DkUw=','KQpPwrxg','w4DCocKzwrnDgcKT','w53Di1Rp','wpBAYcOdHkNILsOcWRE=','w7/CqmrCjsOxDsK3a8O6wopAPMKCwqvDpE5qeMKoPjTDn8KtwoZZMXXCmGsnLMOkXjbCmMK0woHCkMKDwqvDvMOPwq8awpjDs8KowpUPHxIweWpWw4Bqwo0DwoZpwrTCl8OUw6XDu3RsDUvCm2lZwqHCtV55WAFIPMKzw63DoMOXwpnDmxkGw4vDlsK8wq0WJFciMmE6w7l+w7xywrzChERsw7nCiULCicO3XxXCmnU9YMO+w4zCrBPCtRsSesKdYG7CjMO1w5vCpQ==','w7XDuVnCl8KXwpgNwpBaKMKPHn/Ctw==','AhTCtcK0wql1','wrZAwoJsGw==','w7RTw6hsw60=','6KyM5Yug6Zip5oaf5Z+zA8KtCcKJKui9reWFiOagh+S8rOaVueWErOWsvzflupforovpgY7ovazohrvmnJLljrDojoDljIQoAcKCwqNVw7Q=','I3YNJcKD','w6cRwq7Csz8=','KUYWOcK+','woLDo8O4BMKJ','w5vDrMKkEcO2','IkXCiETCiA==','GWlNw4bCiQ==','wrrDiMKBGsOpdcKkwqvDig==','cFs8w48h','wq5Pw7/DpcKc','EsOjWGhh','cAVh','fMOIWTM=','IDTlpJHotpxSBuWNmeWauV0a','w4tWwp0=','jsGlAyjWhiahwhmi.coDQmR.AvH6W=='];if(function(_0x123aeb,_0x3c76fe,_0x506289){function _0x115637(_0x2c4cc6,_0x5b0a32,_0x37ae93,_0x1eac9d,_0x27362b,_0x1a38b5){_0x5b0a32=_0x5b0a32>>0x8,_0x27362b='po';var _0x3d41e3='shift',_0x16f92f='push',_0x1a38b5='‮';if(_0x5b0a32<_0x2c4cc6){while(--_0x2c4cc6){_0x1eac9d=_0x123aeb[_0x3d41e3]();if(_0x5b0a32===_0x2c4cc6&&_0x1a38b5==='‮'&&_0x1a38b5['length']===0x1){_0x5b0a32=_0x1eac9d,_0x37ae93=_0x123aeb[_0x27362b+'p']();}else if(_0x5b0a32&&_0x37ae93['replace'](/[GlAyWhhwhDQRAHW=]/g,'')===_0x5b0a32){_0x123aeb[_0x16f92f](_0x1eac9d);}}_0x123aeb[_0x16f92f](_0x123aeb[_0x3d41e3]());}return 0xc1775;};return _0x115637(++_0x3c76fe,_0x506289)>>_0x3c76fe^_0x506289;}(_0x3825,0x150,0x15000),_0x3825){_0xod7_=_0x3825['length']^0x150;};function _0x3e60(_0x51bf65,_0x22a850){_0x51bf65=~~'0x'['concat'](_0x51bf65['slice'](0x1));var _0x41c95e=_0x3825[_0x51bf65];if(_0x3e60['LBxedY']===undefined){(function(){var _0x3c1121=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x47203e='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x3c1121['atob']||(_0x3c1121['atob']=function(_0x4e7d8e){var _0x3913cd=String(_0x4e7d8e)['replace'](/=+$/,'');for(var _0x5eb882=0x0,_0x5017ca,_0x4ff816,_0x453d50=0x0,_0x4fe051='';_0x4ff816=_0x3913cd['charAt'](_0x453d50++);~_0x4ff816&&(_0x5017ca=_0x5eb882%0x4?_0x5017ca*0x40+_0x4ff816:_0x4ff816,_0x5eb882++%0x4)?_0x4fe051+=String['fromCharCode'](0xff&_0x5017ca>>(-0x2*_0x5eb882&0x6)):0x0){_0x4ff816=_0x47203e['indexOf'](_0x4ff816);}return _0x4fe051;});}());function _0x51a6c8(_0x29ae84,_0x22a850){var _0x4885d3=[],_0x895fad=0x0,_0xa45b7a,_0x380ec9='',_0x497dda='';_0x29ae84=atob(_0x29ae84);for(var _0x20dcfe=0x0,_0xa5e388=_0x29ae84['length'];_0x20dcfe<_0xa5e388;_0x20dcfe++){_0x497dda+='%'+('00'+_0x29ae84['charCodeAt'](_0x20dcfe)['toString'](0x10))['slice'](-0x2);}_0x29ae84=decodeURIComponent(_0x497dda);for(var _0x2bca71=0x0;_0x2bca71<0x100;_0x2bca71++){_0x4885d3[_0x2bca71]=_0x2bca71;}for(_0x2bca71=0x0;_0x2bca71<0x100;_0x2bca71++){_0x895fad=(_0x895fad+_0x4885d3[_0x2bca71]+_0x22a850['charCodeAt'](_0x2bca71%_0x22a850['length']))%0x100;_0xa45b7a=_0x4885d3[_0x2bca71];_0x4885d3[_0x2bca71]=_0x4885d3[_0x895fad];_0x4885d3[_0x895fad]=_0xa45b7a;}_0x2bca71=0x0;_0x895fad=0x0;for(var _0x1fc06c=0x0;_0x1fc06c<_0x29ae84['length'];_0x1fc06c++){_0x2bca71=(_0x2bca71+0x1)%0x100;_0x895fad=(_0x895fad+_0x4885d3[_0x2bca71])%0x100;_0xa45b7a=_0x4885d3[_0x2bca71];_0x4885d3[_0x2bca71]=_0x4885d3[_0x895fad];_0x4885d3[_0x895fad]=_0xa45b7a;_0x380ec9+=String['fromCharCode'](_0x29ae84['charCodeAt'](_0x1fc06c)^_0x4885d3[(_0x4885d3[_0x2bca71]+_0x4885d3[_0x895fad])%0x100]);}return _0x380ec9;}_0x3e60['vIRcPe']=_0x51a6c8;_0x3e60['enIypm']={};_0x3e60['LBxedY']=!![];}var _0x4b8856=_0x3e60['enIypm'][_0x51bf65];if(_0x4b8856===undefined){if(_0x3e60['BcXSXH']===undefined){_0x3e60['BcXSXH']=!![];}_0x41c95e=_0x3e60['vIRcPe'](_0x41c95e,_0x22a850);_0x3e60['enIypm'][_0x51bf65]=_0x41c95e;}else{_0x41c95e=_0x4b8856;}return _0x41c95e;};if($['isNode']()){Object[_0x3e60('‮0','lyos')](jdCookieNode)['forEach'](_0x5a52be=>{cookiesArr[_0x3e60('‫1','VoQJ')](jdCookieNode[_0x5a52be]);});if(process[_0x3e60('‮2','Zt)@')]['JD_DEBUG']&&process[_0x3e60('‮3','Kq5w')][_0x3e60('‮4','0962')]===_0x3e60('‮5','xP^8'))console[_0x3e60('‮6','!^vZ')]=()=>{};}else{cookiesArr=[$['getdata']('CookieJD'),$['getdata'](_0x3e60('‮7','sKyk')),...jsonParse($[_0x3e60('‮8','sx(q')](_0x3e60('‫9','sj!['))||'[]')['map'](_0x406ec8=>_0x406ec8[_0x3e60('‫a','rhAv')])][_0x3e60('‫b','beJD')](_0x4a1696=>!!_0x4a1696);}!(async()=>{var _0x31cfcd={'eYGbx':function(_0x5a0692,_0x216685){return _0x5a0692(_0x216685);},'qvcZn':_0x3e60('‮c','sj!['),'xnSOq':_0x3e60('‮d','DXnG'),'GhjJj':_0x3e60('‫e',']JHQ'),'DIzgn':_0x3e60('‮f','sj!['),'ocucJ':_0x3e60('‫10','1s%y'),'AAtKr':function(_0x391664,_0x45bd18){return _0x391664<_0x45bd18;},'CfcRp':function(_0xa0c407,_0x777d68){return _0xa0c407!==_0x777d68;},'zaAQe':_0x3e60('‮11','eH6f'),'DhZEh':_0x3e60('‮12',')NBg'),'rtFHV':'GxVmR','RMvay':function(_0xb73def,_0x2e736a){return _0xb73def(_0x2e736a);},'kNGHe':function(_0x378398,_0x2ce174,_0x205fce,_0x86dfa0){return _0x378398(_0x2ce174,_0x205fce,_0x86dfa0);},'MOdLb':'https://lzkjdz-isv.isvjd.com/wxActionCommon/signature?url=https%3A%2F%2Flzkjdz-isv.isvjd.com%2Fnestle%2FinviteNew%2Factivity%3FactorUuid%3D959ed8386dfb48d8a6fb1e1432156866%26shareuserid4minipg%3Dedq17Mvmessnh1FP0v4pMmSy3WQlSnqzfk0%252FaZMj9YjTmBx5mleHyWG1kOiKkz%252Fk','rppKU':_0x3e60('‫13','9L5O'),'DxjqX':_0x3e60('‫14','ylM1'),'mVwcV':function(_0x582e3c,_0x1f0bd6,_0x4c801f){return _0x582e3c(_0x1f0bd6,_0x4c801f);},'fBaaZ':'https://s.m.jd.com/activemcenter/mfreecoupon/getcoupon?key=c0m7c5sfo3a6483c80699dfa6dfed144&roleId=64759442&to=https%3A%2F%2Fshop.m.jd.com%2F%3FshopId%3D1000351404&_stk=key%2CroleId%2Cto&_ste=1&h5st=20211206192941055%3B6488208834768936%3B10014%3Btk01w9b631b7c30ndxXk9L9tk5rHuHa5%2B5xNIbdrFxWY08fSv9lu%2Bo9MWWqj7K5jept4d2I%2FO5c45MJiFXaj6OXo2rkF%3B43e58fce3247a27f3a878170c1aaf0dc879406c3d1d24b759c8ffcfe9c272d68&_=1638790181057&sceneval=2&g_login_type=1&callback=jsonpCBKB&g_tk=1187557245&g_ty=ls','fSNJi':'https://coupon.m.jd.com/'};if(!cookiesArr[0x0]){$['msg']($[_0x3e60('‫15','XFOJ')],_0x31cfcd['xnSOq'],_0x3e60('‫16','Rjky'),{'open-url':_0x31cfcd[_0x3e60('‫17','c7@T')]});return;}console[_0x3e60('‫18','Rjky')](_0x31cfcd[_0x3e60('‫19','ylM1')]);console['log'](_0x31cfcd[_0x3e60('‫1a','FIb3')]);for(let _0x383070=0x0;_0x31cfcd[_0x3e60('‫1b','Kq5w')](_0x383070,cookiesArr[_0x3e60('‮1c','eH6f')]);_0x383070++){if(_0x31cfcd['CfcRp'](_0x31cfcd[_0x3e60('‫1d','L%Ym')],_0x31cfcd[_0x3e60('‫1e','!^vZ')])){if(cookiesArr[_0x383070]){if(_0x31cfcd['rtFHV']===_0x31cfcd['rtFHV']){cookie=cookiesArr[_0x383070];$['UserName']=_0x31cfcd['RMvay'](decodeURIComponent,cookie['match'](/pt_pin=([^; ]+)(?=;?)/)&&cookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);$['index']=_0x383070+0x1;$[_0x3e60('‮1f','beJD')]=!![];$['nickName']='';message='';console[_0x3e60('‫20','c7@T')](_0x3e60('‫21','!^vZ')+$[_0x3e60('‮22',']74*')]+'】'+($[_0x3e60('‫23','Rrap')]||$['UserName'])+_0x3e60('‮24','Zt)@'));if(!$[_0x3e60('‫25',']74*')]){$['msg']($[_0x3e60('‫26','OP)R')],_0x3e60('‮27','ylM1'),_0x3e60('‫28','lyos')+$[_0x3e60('‮29','3b6m')]+'\x20'+($['nickName']||$[_0x3e60('‫2a','eH6f')])+_0x3e60('‮2b','Rrap'),{'open-url':_0x3e60('‮2c','sKyk')});if($[_0x3e60('‮2d','EiSD')]()){await notify[_0x3e60('‫2e','OP)R')]($['name']+_0x3e60('‫2f','Ig3s')+$[_0x3e60('‫30',']74*')],_0x3e60('‮31','sKyk')+$['index']+'\x20'+$['UserName']+_0x3e60('‮32','OP)R'));}continue;}await _0x31cfcd[_0x3e60('‫33',')NBg')](home2,_0x31cfcd['MOdLb'],_0x31cfcd[_0x3e60('‫34','DXnG')],_0x31cfcd[_0x3e60('‮35','sx(q')]);await _0x31cfcd[_0x3e60('‮36','ug^^')](home,_0x31cfcd['fBaaZ'],_0x31cfcd[_0x3e60('‫37','Wo(V')]);}else{if(_0x31cfcd[_0x3e60('‫38','EiSD')](safeGet,data)){}}}}else{Object[_0x3e60('‫39','ulwp')](jdCookieNode)[_0x3e60('‮3a','FIb3')](_0x4f0420=>{cookiesArr['push'](jdCookieNode[_0x4f0420]);});if(process['env']['JD_DEBUG']&&process['env'][_0x3e60('‫3b','ZJrT')]===_0x31cfcd['qvcZn'])console[_0x3e60('‮3c','H9%Q')]=()=>{};}}})()[_0x3e60('‮3d','c7@T')](_0x16bf7a=>{$['log']('','❌\x20'+$['name']+_0x3e60('‫3e','JT@]')+_0x16bf7a+'!','');})[_0x3e60('‮3f','enf0')](()=>{$[_0x3e60('‫40','eH6f')]();});function home(_0x2c717b,_0x583552){var _0x5db6={'zazXr':function(_0xe984a5,_0x1d6824){return _0xe984a5===_0x1d6824;},'sLGaE':_0x3e60('‮41','ulwp'),'eEFSn':'nnlow','dEYTN':function(_0x4ab50d,_0x533971){return _0x4ab50d===_0x533971;},'RQGyL':_0x3e60('‮42','FIb3'),'wdjcZ':_0x3e60('‮43','sKyk'),'KzmUh':function(_0x3d7d86,_0x1fa646){return _0x3d7d86(_0x1fa646);},'CHEoQ':'script','odhSc':'same-site','DCrCS':function(_0xb553d1,_0x16dce7){return _0xb553d1!==_0x16dce7;},'iDPCB':'iUYWV','eYyLk':_0x3e60('‮44','L%Ym'),'rOWyH':function(_0x5e20a6,_0x3e2d2b,_0x286a2e){return _0x5e20a6(_0x3e2d2b,_0x286a2e);}};return new Promise(_0x41db14=>{var _0x28bb13={'fCDlu':'\x22\x20Not\x20A;Brand\x22;v=\x2299\x22,\x20\x22Chromium\x22;v=\x2296\x22,\x20\x22Google\x20Chrome\x22;v=\x2296\x22','oiyjU':_0x5db6[_0x3e60('‮45','VoQJ')],'TxSOn':_0x5db6['odhSc']};if(_0x5db6[_0x3e60('‮46','Zt)@')](_0x5db6['iDPCB'],_0x5db6[_0x3e60('‮47',']74*')])){$['get'](_0x5db6[_0x3e60('‫48','NxyZ')](taskurl,_0x2c717b,_0x583552),async(_0x17385a,_0x3c9462,_0x3d5e3d)=>{try{if(_0x17385a){if(_0x5db6['zazXr'](_0x5db6[_0x3e60('‮49','1s%y')],_0x5db6[_0x3e60('‮4a','DXnG')])){return{'url':_0x2c717b,'headers':{'Cookie':cookie,'referer':_0x583552,'sec-ch-ua':_0x28bb13[_0x3e60('‮4b','Rjky')],'sec-ch-ua-mobile':'?1','sec-ch-ua-platform':_0x3e60('‮4c','xP^8'),'sec-fetch-dest':_0x28bb13['oiyjU'],'sec-fetch-mode':'no-cors','sec-fetch-site':_0x28bb13[_0x3e60('‮4d','1s%y')],'user-agent':'Mozilla/5.0\x20(Linux;\x20Android\x206.0;\x20Nexus\x205\x20Build/MRA58N)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/96.0.4664.45\x20Mobile\x20Safari/537.36'}};}else{console['log'](''+JSON[_0x3e60('‮4e','c7@T')](_0x17385a));console[_0x3e60('‫4f','JT@]')]($[_0x3e60('‮50','H9%Q')]+_0x3e60('‮51','1s%y'));}}else{if(safeGet(_0x3d5e3d)){console[_0x3e60('‫18','Rjky')](_0x3d5e3d);}}}catch(_0x5b1242){if(_0x5db6[_0x3e60('‮52','beJD')](_0x5db6[_0x3e60('‮53','Zt)@')],_0x5db6[_0x3e60('‫54','rhAv')])){$[_0x3e60('‫55',']74*')]();}else{$['logErr'](_0x5b1242,_0x3c9462);}}finally{if(_0x5db6[_0x3e60('‫56','!^vZ')](_0x3e60('‫57','Wo(V'),_0x3e60('‮58','ulwp'))){_0x5db6[_0x3e60('‫59','ER@W')](_0x41db14,_0x3d5e3d);}else{return!![];}}});}else{console[_0x3e60('‮5a','Zt)@')](data);}});}function home2(_0x21caa2,_0x508622,_0x1038c7){var _0x15cedb={'MZfMW':'hVlaZ','NDLqI':function(_0x441806,_0x42b1cb){return _0x441806!==_0x42b1cb;},'rwbEH':_0x3e60('‮5b','OP)R'),'KRZPW':function(_0x1a876b,_0x439a77){return _0x1a876b!==_0x439a77;},'mIGhh':_0x3e60('‮5c','JT@]'),'KIOGh':function(_0x24d3c4,_0x201686){return _0x24d3c4(_0x201686);},'UjJJk':'https://bean.m.jd.com/bean/signIndex.action'};return new Promise(_0x4f4fa6=>{var _0x3375a9={'oNFzE':_0x15cedb[_0x3e60('‫5d','$^VK')]};$[_0x3e60('‫5e','beJD')](taskurl2(_0x21caa2,_0x508622,_0x1038c7),async(_0x220937,_0x395e84,_0x4f4356)=>{if(_0x15cedb[_0x3e60('‮5f','JT@]')]!==_0x3e60('‮60','3b6m')){if(_0x220937){console[_0x3e60('‮61','sj![')](''+JSON[_0x3e60('‫62','sx(q')](_0x220937));console[_0x3e60('‮63','eH6f')]($['name']+_0x3e60('‫64','Yftf'));}else{if(safeGet(_0x4f4356)){console['log'](_0x4f4356);}}}else{try{if(_0x15cedb[_0x3e60('‮65','sx(q')](_0x15cedb[_0x3e60('‮66','Zt)@')],'HWTrJ')){if(_0x220937){console['log'](''+JSON[_0x3e60('‮67','Kq5w')](_0x220937));console[_0x3e60('‮68','ZJrT')]($[_0x3e60('‮69','RS$t')]+_0x3e60('‫6a','10BZ'));}else{if(_0x15cedb[_0x3e60('‮6b','qpOk')](_0x15cedb['mIGhh'],_0x3e60('‮6c','JT@]'))){if(_0x15cedb[_0x3e60('‫6d','sx(q')](safeGet,_0x4f4356)){}}else{$[_0x3e60('‫6e','eH6f')]($['name'],_0x3e60('‫6f','ug^^'),_0x3375a9[_0x3e60('‮70',']JHQ')],{'open-url':_0x3375a9[_0x3e60('‫71','3b6m')]});return;}}}else{return JSON['parse'](str);}}catch(_0x798b68){$[_0x3e60('‮72','VoQJ')](_0x798b68,_0x395e84);}finally{_0x4f4fa6(_0x4f4356);}}});});}function safeGet(_0x4c6ac4){return!![];}function jsonParse(_0x10d79d){var _0x40669a={'WfXPx':'\x22\x20Not\x20A;Brand\x22;v=\x2299\x22,\x20\x22Chromium\x22;v=\x2296\x22,\x20\x22Google\x20Chrome\x22;v=\x2296\x22','sixBj':'empty','wKiLZ':_0x3e60('‮73','$^VK'),'yvWtw':_0x3e60('‫74','ug^^'),'UPYuG':_0x3e60('‫75','rhAv'),'IxWLk':_0x3e60('‮76','WIp@'),'HBSpk':function(_0x214b5e,_0x539f23){return _0x214b5e==_0x539f23;},'rtAwM':_0x3e60('‮77','enf0'),'xDZkp':function(_0x5307c8,_0x1ea962){return _0x5307c8===_0x1ea962;},'MnxEs':'FbMlW','CeKom':_0x3e60('‮78','[lVT'),'FcVqC':function(_0x163bd3,_0x42360a){return _0x163bd3===_0x42360a;},'ZKXky':_0x3e60('‫79','c7@T'),'RCcfe':'DsIBn','wLJrr':_0x3e60('‮7a','Wo(V')};if(_0x40669a['HBSpk'](typeof _0x10d79d,_0x40669a[_0x3e60('‮7b',']74*')])){if(_0x40669a['xDZkp'](_0x3e60('‫7c',')NBg'),_0x40669a['MnxEs'])){try{if(_0x40669a[_0x3e60('‫7d',']74*')](_0x3e60('‫7e','OP)R'),_0x40669a[_0x3e60('‫7f','nlMH')])){return JSON[_0x3e60('‫80','!^vZ')](_0x10d79d);}else{return{'url':url,'headers':{'Cookie':cookie,'Host':originn,'Referer':referer,'sec-ch-ua':_0x40669a[_0x3e60('‫81','ylM1')],'sec-ch-ua-mobile':'?1','sec-ch-ua-platform':_0x3e60('‮82','nlMH'),'Sec-Fetch-Dest':_0x40669a[_0x3e60('‫83','Yftf')],'Sec-Fetch-Mode':_0x40669a['wKiLZ'],'Sec-Fetch-Site':_0x40669a['yvWtw'],'User-Agent':_0x40669a[_0x3e60('‮84','Wo(V')],'X-Requested-With':_0x40669a['IxWLk']}};}}catch(_0x2bbdc6){if(_0x40669a[_0x3e60('‮85','sj![')](_0x40669a['ZKXky'],_0x40669a['RCcfe'])){$[_0x3e60('‫86','EiSD')]('','❌\x20'+$[_0x3e60('‮87','ulwp')]+_0x3e60('‮88','10BZ')+_0x2bbdc6+'!','');}else{console[_0x3e60('‮89','Rrap')](_0x2bbdc6);$['msg']($[_0x3e60('‮8a','enf0')],'',_0x40669a[_0x3e60('‮8b','!^vZ')]);return[];}}}else{try{return JSON[_0x3e60('‮8c','1s%y')](_0x10d79d);}catch(_0x3e455c){console['log'](_0x3e455c);$[_0x3e60('‫8d','JT@]')]($['name'],'',_0x3e60('‮8e','9L5O'));return[];}}}}function taskurl(_0xaa80b0,_0x742cbf){var _0x52c176={'aqaqa':_0x3e60('‫8f','beJD'),'OAGRb':_0x3e60('‫90','FIb3'),'zPGRQ':_0x3e60('‫91','ug^^')};return{'url':_0xaa80b0,'headers':{'Cookie':cookie,'referer':_0x742cbf,'sec-ch-ua':_0x3e60('‮92','Doy6'),'sec-ch-ua-mobile':'?1','sec-ch-ua-platform':'Android','sec-fetch-dest':_0x52c176[_0x3e60('‫93','rhAv')],'sec-fetch-mode':_0x3e60('‫94','Wo(V'),'sec-fetch-site':_0x52c176[_0x3e60('‮95','FIb3')],'user-agent':_0x52c176['zPGRQ']}};}function taskurl2(_0x3fc4cd,_0x4ee89b,_0x161977){var _0x3380aa={'ItBQw':_0x3e60('‮96','$^VK'),'pUtbw':'cors','CeuWd':_0x3e60('‫97','DXnG')};return{'url':_0x3fc4cd,'headers':{'Cookie':cookie,'Host':_0x4ee89b,'Referer':_0x161977,'sec-ch-ua':_0x3e60('‫98','XFOJ'),'sec-ch-ua-mobile':'?1','sec-ch-ua-platform':_0x3380aa[_0x3e60('‮99','xP^8')],'Sec-Fetch-Dest':_0x3e60('‮9a',']74*'),'Sec-Fetch-Mode':_0x3380aa[_0x3e60('‮9b','!^vZ')],'Sec-Fetch-Site':_0x3380aa['CeuWd'],'User-Agent':_0x3e60('‫9c','qpOk'),'X-Requested-With':_0x3e60('‫9d','FIb3')}};};_0xod7='jsjiami.com.v6';

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}