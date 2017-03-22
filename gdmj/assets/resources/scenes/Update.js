cc.Class({
    extends: cc.Component,

    properties: {
       progressBar: {
            default: null,
            type: cc.ProgressBar
        },
        progressTips: {
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.progressBar.progress = 0;
         // this.LoadConfig("android.json");
        

    },
    update:function(dt){
        cc.log("=======")
        var progress = this.progressBar.progress;
        if(progress>=1)
        {
        
            this.progressTips.textKey = "加载资源完毕";
            this.scheduleOnce(this.LoadConfig("android.json"),1)
            return;
        }
           
        if(progress < 1)
        {
            progress += dt;
            this.progressTips.textKey = "资源正在加载中" + parseInt(progress * 100)   + "%";
        }
         this.progressBar.progress = progress;
         
         
    },
    
    LoadConfig:function(remoteCfgName)
    {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", "http://sources4.happyplaygame.net/gdmj/" + remoteCfgName);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //JSON.parse(xhr.responseText);
                 console.log(JSON.stringify(JSON.parse(xhr.responseText)));
  
                //sendEvent("updateFinish");
            }
            //else CfgGetFail();
        }
        xhr.onerror = function (event) {
           // CfgGetFail();
        }
        xhr.send();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
