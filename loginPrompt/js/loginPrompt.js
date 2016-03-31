var PromptJack = PromptJack || {};
(function(G_ss_lang){
	/*
		Dependensies
			- var G_ss_lang === ss_lang
			- Animate.css
	*/

	PromptJack.Prompt = function(option){
   	return new PromptBox(option);
  };


	var options = {
		width:380,
		height:'auto',
    reload: true,
		dics : {
			label_usrname: 'Username',
			label_passwd: 'Password',
			modal_title: 'Sign-in',
			btn_login_label: 'Sign-in',
			login_fail_msg: 'Sign-in name or password incorrect!',
			login_success_msg: 'Sign-in success'
		}
	};

  function PromptBox(usrOption){
  	this.$usrname = null;
  	this.$passwd = null;
    this.$el = null;
    this.$btnLogin = null;
    this.logined = false;

		this.$options = $.extend(true,{},options,usrOption);
    this._init();
  }

  PromptBox.prototype = $.extend({},{
  	_init: function(){
    	var me = this;
      me._createModal();
      me.show();
    },
    _createModal:function(){
   		var me = this;
			var modal = $('<div class="modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">'+
                    '<div class="modal-dialog">'+
                      '<div class="modal-content">'+
	                        '<div class="modal-header" style="padding:15px;">'+
	                          '<h4 class="modal-title"><i class="fa fa-sign-in"></i> '+ me.$options.dics.modal_title +'</h4>'+
	                        '</div>'+
	                        '<div class="modal-body">'+
		                        	'<form>'+
		                          	'<div class="form-group input-group">'+
		                          		'<label for="usrname" class="sr-only">'+ me.$options.dics.label_usrname +'</label>'+
		                              '<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>'+
		                            '</div>'+
		                            '<div class="form-group input-group">'+
		                            '<label for="passwd" class="sr-only">'+ me.$options.dics.label_passwd +'</label>'+
		                            '<span class="input-group-addon"><i class="fa fa-lock fa-lg fa-fw"></i></span>'+
		                            '</div>'+
		                          '</form>'+

	                        '</div>'+
	                        '<div class="modal-footer">'+
	                         // '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
	                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>');
			me.$el = modal;
    },
    _processInput:function(){
    	var me = this;
    	me.$usrname = $('<input type="text" class="form-control" id="usrname" placeholder="'+ me.$options.dics.label_usrname +'">');
    	me.$usrname.on('keyup',function(event){
    		if(event.which == 13){
					_login(me);
      	}
    	});
    	me.$passwd = $('<input type="password" class="form-control" id="passwd" placeholder="'+ me.$options.dics.label_passwd +'">');
    	me.$passwd.on('keyup',function(event){
    		if(event.which == 13){
					_login(me);
      	}
    	});
    	me.$el.find('.modal-body form div.form-group:eq(0)').append(me.$usrname);
    	me.$el.find('.modal-body form div.form-group:eq(1)').append(me.$passwd);
    },
  	_processBtn: function(){
  		var me = this;
  		me.$btnLogin = $('<button type="button" class="btn btn-success btn-block btn-lg">'+ me.$options.dics.btn_login_label +'</button>');
  		me.$btnLogin.on('click',function(){
  			_login(me);
  			//alert('login');
  		});
  		me.$el.find('.modal-footer').prepend(me.$btnLogin);
  	},
  	_showSuccess:function(){
  		var me = this;
  		var error = $('<div class="alert alert-success text-left"><span class="glyphicon glyphicon-ok" areia-hidden="true"></span> '+ me.$options.dics.login_success_msg +'</div>');
  		me.$el.find('.modal-body').append(error);
  		me._animate(error,'tada',function(){
  			//console.log(error);
  			setTimeout(function(){
	  			me._animate(error,'fadeOutDown',function(){
	  				error.remove();
	  			});
	  		},1500);
  		});
  	},
  	_showError:function(){
  		var me = this;
  		var error = $('<div class="alert alert-danger text-left"><span class="glyphicon glyphicon-remove" areia-hidden="true"></span> '+ me.$options.dics.login_fail_msg +'</div>');
  		me.$el.find('.modal-body').append(error);
  		me._animate(error,'tada',function(){
  			//console.log(error);
  			setTimeout(function(){
	  			me._animate(error,'fadeOutDown',function(){
	  				error.remove();
	  			});
	  		},1500);
  		});
  	},
    _position:function(){
    	var me = this;
    	me.$el.find('.modal-content').css('margin','auto');
    },
    _setSize: function () {
        var me = this;
        me.setWidth(me.$options.width);
        if (me.$options.height === 'auto') {
            me.setHeight(me.$el.outerHeight());
        } else {
            me.setHeight(me.$options.height);
        }
    },
    _animate:function (element,animationName,callback) {
    		var me = this;
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        element.addClass('animated ' + animationName).one(animationEnd, function() {
           $(this).removeClass('animated ' + animationName);
            if (callback && typeof(callback) === "function") {
				        callback();
				    }
        });
	  },
   	setWidth: function (width) {
        var me = this;
        me.$el.find('.modal-content').css('width', me.$options.width);
        return me;
    },
    setHeight: function (height) {
        var me = this;
        me.$el.find('.modal-content').css('height', me.$options.height);
        return me;
    },
    show: function () {
      var me = this,
          $body = $('body');
      me._processBtn();
      me._processInput();
      $body.append(me.$el);
      me._setSize();
      me._position();
      return me;
    },

    destroy: function(){
    	var me = this;
    	me.$el.remove();
    },
    open: function(options){
    	var me = this;
     	if(options==='noDefault'){
    		//me.$el.show();
    		me.$el.modal('show');
    		me._animate(me.$el,'zoomInDown');
    	}else{
    		me.$el.modal('show');
    	}
    },
    close: function(options){
    	var me = this;
    	if(options==='noDefault'){
    		me.$el.remove();
        $('.modal-backdrop.fade.in').remove();
    	}else{
    		me.$el.modal('hide');
    	}
    }

  });

  /* PRIVATE FUNCTIONS*/
  function _login(element){
    if(!element.logined){
      element.logined = true;
    	$.ajax({
  			type: 'POST',
  			cache:false,
  			dataType: "json",
  			url: "../voucher/ajax.asp",
  			data: {
  				dataaction : "login",
  				login : element.$usrname.val(),
  				password : element.$passwd.val(),
  				sslang : G_ss_lang,
  			},
    		success: function(return_data){
    			if(return_data.cod === ""){
    				element._showSuccess();
    				setTimeout(function(){
  	  				element._animate(element.$el,'zoomOut',function(){
  	  					element.close('noDefault');
                if(element.$options.reload){
  	  					  location.reload();
                }
  		 				});
  		 			},1500);
    			}
    			else if(return_data.cod !== ""){
    				//console.log(element.$el);
    				element._showError();
    				element._animate(element.$el,'shake');
            element.logined = false;
  					//element.$el.animateCss('shake');
    			}
    		},
    		error: function(data){
    			alert("ajax error");
          element.logined = false;
    		},
    		complete: function(data){
    			//$("#login-button").button('reset');
    		}
  		});
    }
  }
  //return PromptJack = PromptJack.Prompt();
})();
