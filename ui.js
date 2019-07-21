/*script for ui */
//conts and tools
const ang_el = "pager,carousel,tip,switcher,folder,loader,tree,part,order,z";
function Parse_params (p_str){
    var params =new Object;
    if(!p_str){ return params};
    var key_v = p_str.split(';');
    for(var el of key_v){
        var k_and_v = el.split(':');
        if(k_and_v[0]=='url'){
            k_and_v[1]+=":";
            params[k_and_v[0]] = k_and_v.slice(1).join('')
        }else{
            params[k_and_v[0]] = k_and_v[1]
        }
    };
    return params;
}


///////////////main
window.onload = function(){
    ui(this.document)
};

function ui(D){
    var els = D.querySelectorAll(ang_el);
    console.log(2)
    for(var el of els){
        try{
            console.log(3)
            el_parse(el,el.nodeName)
        }catch(err){
            throw err
        }
    };
    //global control
    window.onscroll = function(){
        IMAGE()
    };
    window.onclick = function(){
        var order_all = document.querySelectorAll('order');
        for(var el of order_all){
            if(el.style.display=='inline-block'){
                el.style.display = 'none';
            }
        }
    };
    window.onresize =function(){

    };
    window.onblur = function(){
        for(var i=0;i<50;i++){
            clearInterval(i)
        };
        window.onfocus = function(){
            var carousel_list = document.querySelectorAll('carousel');
            for(var el of carousel_list){
                CAROUSEL(el)
            }
        }
    }
};

function el_parse(el,name){
    //不隐式样的取属性，在调用的时候填入属性
    switch(name){
        case 'PAGER':
            PAGER(el)
            break
        case 'CAROUSEL':
            console.log('22')
            CAROUSEL(el)
            break
        case 'TIP':
            TIP(el);
            break
        case 'SWITCHER':
            SWITCHER(el);
            break
        case 'FOLDER':
            FOLDER(el);
            break
        case 'TREE':
            TREE(el);
            break
        case 'LOADER':
            SCROLL_LOAD(el);
            break
        case 'PART':
            PART(el);
            break
        case 'ORDER':
            ORDER(el)
            break
        case 'Z':
            Z(el);
            break
        default:
            return 'none'
    }
};

///////////////////widgets
function PAGER(el){
    var params = Parse_params(el.dataset.ang);
    console.log(el.nodeName+JSON.stringify(params))
    var baseUrl = params['baseUrl'],current =Number(params['current']);
    console.log(typeof(current))
    for(var i in el.children){
        el.children[i].innerText = (Number(i)+current).toString();
        el.children[i].outerHTML = '<a href='+baseUrl+(Number(i)+current).toString()+">"+el.children[i].outerHTML+"</a>";
    };
    return 'pager'
}

function CAROUSEL(el){
    var width =  Parse_params(el.dataset.ang)['width'] || el.style.width,height =  Parse_params(el.dataset.ang)['msg'] || el.style.height;
    el.style.width = width;
    el.style.height = height;
    var width_n = Number(width.slice(0,-2));
    var pics = el.children;
    //for in one line
    for(var i in pics){
        console.log(i)
        if(!isNaN(i)){
            pics[i].style.top = '0px';
            pics[i].style.left = width_n*i+'px';
        }
    };

        var t = setInterval(function(){
            console.log('rrrrrrrrr')        
            for(var i in pics){
                if(!isNaN(i) && Number(pics[i].style.left.slice(0,-2))<0-width_n ){
                    pics[i].style.left = Number(pics[i].style.left.slice(0,-2))+width_n*(pics.length)+'px';
                    break
                }
            };
            var counter = 0;
            var id = setInterval(function(){
                for(var el of pics){
                    var current_n = Number(el.style.left.slice(0,-2));
                    el.style.left = (current_n - width_n/17) +"px";
                };
                counter +=width_n/17;
                if(counter>=width_n)clearInterval(id);
            },17)
        },5000);
}

function TIP(el){
    var msg = Parse_params(el.dataset.ang)['msg'];
    var tip = document.createElement('p');
    tip.style.position = "fixed";
    tip.style.zIndex = "999";
    tip.style.backgroundColor = "#272F34";
    tip.style.padding = ".45rem";
    tip.style.fontSize = "small";
    tip.style.borderRadius = "3px";
    tip.style.color = "white";
    tip.innerText = msg;
    el.onmouseenter = function(){
        tip.style.top = (event.clientY+5)+'px';
        tip.style.left = (event.clientX+5)+'px';
        el.appendChild(tip);
        console.log(event.clientX)
    }
    el.onmouseleave = function(){
        el.removeChild(el.lastChild)
    }
}

function SWITCHER(el){
    var name = Parse_params(el.dataset.ang)['name'];
    var radio = document.createElement('input');
    radio.type = 'radio';
    radio.setAttribute('name',name);
    radio.hidden = true;
    el.appendChild(radio);
    
    var span = document.createElement('div');
    span.style.width = '18px';
    span.style.height = '18px';
    span.style.margin = "0 20px 0 0";
    span.style.borderRadius = '18px';
    span.style.border = '1px solid #7782A2';
    span.style.backgroundColor = 'white';
    el.appendChild(span);

    el.onclick = function(){
        if(radio.checked == false){
            span.style.margin = "0 0 0 20px";
            el.style.backgroundColor = '#107DBF';
            radio.checked = true
            console.log(radio.checked)
        }else{
            span.style.margin = '0 20px 0 0';
            el.style.backgroundColor = 'rgb(160, 179, 179)';
            radio.checked = false;
            console.log(radio.checked)
        }
    }
}

function FOLDER(el){
    var ctrl;
    if(Parse_params(el.dataset.ang)['init']){
        ctrl = '';
    }else{
        ctrl = 'none';
    };
    for(var i =1;i<el.children.length;i++){
        el.children[i].style.display = ctrl;
    };
    el.firstElementChild.onclick = function(){
        console.log('ffff')
        if(ctrl==''){
            ctrl = "none";
        }else{
            ctrl = "";
        };
        for(var i =1;i<el.children.length;i++){
            el.children[i].style.display = ctrl;
        }
    }
};

function IMAGE(){
    var pics = document.querySelectorAll('img');
    for(var el of pics){
        if(el.src){
            console.log(01234)
            continue
        }else{
            if(el.getBoundingClientRect().y>window.innerHeight){
                console.log(444444)
                continue
            }else{
                var url = Parse_params(el.dataset.ang)['url'];
                console.log(url)
                el.src = url;
            }
        }
    }
};

function SCROLL_LOAD(el){
    var wrapper = el.parentNode;
    var callback = window[Parse_params(el.dataset.ang)['callBack']];
    var ctrl = new Boolean(true);
    var c=100;
    wrapper.onscroll = function(){
        var v_h = wrapper.clientHeight;
        var o_h = wrapper.scrollTop;
        var e_h = el.getBoundingClientRect().height;
        c +=1;
        console.log(c)
        if(v_h+o_h >= e_h){
            console.log('bottom')
            if(callback && ctrl){
                callback(ctrl, c)
            }
        }
    }
};

function TREE(el){
    for(var child of el.children){
        if(child.nodeName =="TREE" || child.nodeName =="LI"){
            child.style.display = 'none'
        }
    };
    el.onclick =function(){
        if(el.firstElementChild.nodeName =='A' || el.firstElementChild.nodeName =='I'){
            if(event.target != this && event.target != el.firstElementChild){
                console.log(this)
                return;
            }
        }else{
            if(event.target != this){
                return;
            }
        };
        console.log('treee')
        for(var child of el.children){
            if( (child.nodeName=="LI" || "TREE")&& child.style.display=="none"){
                child.style.display ="block"
            }else if(child.nodeName=="LI" || "TREE"){
                child.style.display ="none"
            }
        };
        event.stopPropagation();
    }
}

function PART(el){
    var title = Parse_params(el.dataset.ang)['title'];
    var span = document.createElement('div');
    span.style.display = 'inline-block';
    span.style.backgroundColor ="white";
    span.style.padding = ".5rem"
    span.innerText = title;
    span.style.position = "absolute";
    span.style.top ="-1.35rem";
    span.style.left = "1.5rem";
    el.insertBefore(span,el.firstElementChild)
};

function ORDER(el){
    el.parentElement.style.position = 'relative';
    el.style.position = 'absolute';
    el.style.top = el.parentElement.clientHeight +'px';
    el.style.left = '0';
    el.style.display = 'inline-block';
    el.style.zIndex = 990;
    el.style.display='none';
    el.parentElement.onclick = function(){
        if(el.style.display=='none'){
            el.style.display = 'inline-block'
        }else{
            el.style.display ='none'
        };
        event.stopPropagation()
    }
};

function Z(el){
    var index = Parse_params(el.dataset.ang)['index'];
    el.parentElement.style.position = 'relative';
    el.style.zIndex = Number(index);
};

function MODAL(id){
    var list = document.querySelectorAll('modal');
    var target;
    for(var el of list){
       if(Parse_params(el.dataset.ang)['id']==id.toString()){
           target =el;
           break
       }   
    };
    if(target.style.display=='none'||target.style.display==''){
        target.style.position = 'fixed';
        target.style.zIndex = 1000;
        target.style.display = 'block';
        target.style.paddingTop = (window.innerHeight/2-target.firstElementChild.clientHeight/2)+'px';
        target.style.paddingLeft = (window.innerWidth/2-target.firstElementChild.clientWidth/2)+'px';
        document.body.appendChild(target);
        target.onclick = function(){
            this.style.display = 'none';
            console.log(this)
        };
        target.firstElementChild.onclick = function(){
            event.stopPropagation()
        }
    }else{
        target.style.display ='none';
    };
    event.stopPropagation();
}
