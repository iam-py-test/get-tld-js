window.tldjs = {
  private:{
    getlist:function(){
      return new Promise((res,rej) => {
        /*get it from assets because we can not fetch from https://publicsuffix.org/list/public_suffix_list.dat*/
        fetch("https://raw.githubusercontent.com/iam-py-test/get-tld-js/main/assets/psl.txt").then(async function(req){
          res(await req.text())
        }).catch(rej)
      })
    }
  },
  gettld:function(domain){
    return new Promise((res,rej) => {
      try{
        var list = await window.tldjs.getlist()
        var slist = list.split("\n")
        for(var t = 0;t < slist.length;t++){
          if(slist[t].startsWith("//") === true){
            continue
          }
          if(domain.endsWith(slist[t])){
            res(slist[t])
          }
        }
        res(domain.split(".")[-1])
      }
      catch(err){
        res("")
      }
    })
  }
}
