import {Router} from "@angular/router";

declare var $:any
declare var cuteToast:any
export const MyLib={
  User:{
    isLoggedIn:function ():Boolean {
      return !!(localStorage.getItem('ls_u_data'))
    },
    data:function ():any {
      return JSON.parse(localStorage.getItem('ls_u_data')||'');
    },
    logout:function (){
      localStorage.removeItem('ls_u_data');
      location.href='/login'
    }
  },


  Utils:{
    stringToBoolean(StringBoolean:any):Boolean {
      return StringBoolean === 'true' || StringBoolean === '1';
    }
  },

  test(){
    $("#phone").addClass('is-invalid')
  },

  Loader:{
    isLoading:function ():Boolean {
      return MyLib.Utils.stringToBoolean(localStorage.getItem('ls_loading'))
    },
    on:function ():void {
      localStorage.setItem('ls_loading',String(true))
    },
    off:function ():void {
      localStorage.setItem('ls_loading',String(false))
    },
  },

  Sound:{
    play:function (AudioCode:Number):void{
      var audio_neg = new Audio('https://cdn.jsdelivr.net/gh/anupam-dixit/files@master/quill-bor/aud/neg.mp3');
      var audio_pos = new Audio('https://cdn.jsdelivr.net/gh/anupam-dixit/files@master/quill-bor/aud/pos.mp3');
      switch (AudioCode) {
        case 1:
          audio_pos.play();
          break
        case 0:
          audio_neg.play();
          break
      }
    }
  },

  Notification:{
    show:function (type:String='warning',title:String|null='Message',message:String='Unable to perform this action',timer:number=3000):void{
      MyLib.Sound.play((type==='success')?1:0)
      return cuteToast({
        title:title,
        type: type,
        message: message,
        timer: timer
      })
    }
  }
}
