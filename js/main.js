// 弹出层居中设置；登录、注册以及反馈信息提交
$(document).ready(function() {
	var windowHeight = $(window).height();
	$("#loginBtn .modal-dialog").css("margin-top", (windowHeight - 461.283) * 1.0 / 2);
	$("#registerBtn .modal-dialog").css("margin-top", (windowHeight - 491.283) * 1.0 / 2);
	$("#callback .modal-dialog").css("margin-top", (windowHeight - 388) * 1.0 / 2);
	$(window).resize(function() {
		var windowHeight = $(window).height();
		$("#callback .modal-dialog").css("margin-top", (windowHeight - 388) * 1.0 / 2);
		$("#registerBtn .modal-dialog").css("margin-top", (windowHeight - 491.283) * 1.0 / 2);
		$("#loginBtn .modal-dialog").css("margin-top", (windowHeight - 461.283) * 1.0 / 2);
	});
var token=localStorage.getItem("token");
if(token){
	$("#user-noShow").hide();
	$("#loginNow").hide();

	$("#user-Show").show();
	$("#user-Show .dropdown-toggle").html(localStorage.getItem("userName"));
}
else{
	$("#loginNow").show();
	$("#user-Show").hide();
	$("#user-noShow").show();
}
$("#exitBtn").click(function () {
	// body...
	$("#loginNow").show();
	$("#user-Show").hide();
	$("#user-noShow").show();
	localStorage.clear();
});
	var access = false;
	// 获取手机验证码
	$("#accessBtn").click(function() {
		//未填手机号
		if ($("#phonenumber-register").val() == "") {
			alert("请填写您的手机号")
		} else if (!$("#phonenumber-register").val().match(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/)) {
			console.log("手机号码格式不正确");
		} else {
			var phone = $("#phonenumber-register").val();
			$.post('http://daodao.90door.com/api/auth/getCode', {
				cellphone: phone
			}, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
				console.log(data);
				alert(data.msg);
				access = true;
			});
		};

	});

	// 注册
	$("#registerForm").on('submit', function(event) {
		event.preventDefault();
		/* Act on the event */
		var phone=$("#phonenumber-register").val();
		var psd=$("#password-register").val();
		var verify=$("#verifyPassword").val();
		$.post(this.action, {cellphone: phone,password:psd,verify_code:verify}, function (data, textStatus, xhr) {
			// body...
			console.log(data);
			// 注册成功
			if (data.code=="200") {
				console.log("要跳转到完善信息");
				location.href = "completeMessage.html";
			}
			else{
				alert(data.msg);
			}
		});		
	});

	// 登录
	$("#loginForm").on('submit', function(event) {
		event.preventDefault();
		/* Act on the event */
		var phone=$("#phonenumber-login").val();
		var psd=$("#password-login").val();
		$.post(this.action, {cellphone: phone,password:psd}, function (data, textStatus, xhr) {
			// body...
			console.log(data);
			// alert(data.msg);
			// 登录成功
			if (data.code==200) {
				console.log("登录成功");
				console.log(data.token);
				localStorage.clear();
				localStorage.setItem("token",data.token);
				localStorage.setItem("userName",phone);
				location.href = "/lifeng";
			}
		});		
	});	
});