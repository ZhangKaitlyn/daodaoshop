$(window).load(function() {
    var token=localStorage.getItem("token");
    if (!token) {
      alert("请先登录");
    } else{
      var options ={thumbBox: '.thumbBox',spinner: '.spinner',imgSrc: 'images/head-portrait-img.gif'};
      var cropper = $('.imageBox').cropbox(options);
      $('#upload-file').on('change', function(){
        var reader = new FileReader();
        reader.onload = function(e) {
          options.imgSrc = e.target.result;
          cropper = $('.imageBox').cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
        this.files = [];
      });
      $('#btnCrop').on('click', function(){
        var img = cropper.getDataURL();
        $('.cropped').html('');
        $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;">');

        // 上传图片到服务器
        var token=localStorage.getItem("token");
        var formData = new FormData($("#uploadForm")[0]);
        $.ajax({  
          url: 'http://daodao.90door.com/api/shops/updateLogo',  
          type: 'POST',  
          data: formData,  
          dataType: 'JSON',  
          cache: false,  
          processData: false,  
          contentType: false,
          headers: {
            "Authorization":"Bearer "+token
          },
          success: function(data,textStatus) {
            console.log(data);
          },
          error: function(XHR,textStatus,errorThrown) {
            console.log(textStatus);
          }
        });
      });
      $('#btnZoomIn').on('click', function(){
        cropper.zoomIn();
      });
      $('#btnZoomOut').on('click', function(){
        cropper.zoomOut();
      });


      // 保存店铺信息
      $("#changeMessageForm").on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var saveSuccess=false;
        var shopName=$("#shopName").val();
        var shopAddr=$("#shopAddr").val();
        var shopDescription=$("#shopDescription").val();
        $.ajax({  
          url: "http://daodao.90door.com/api/users/userShop",  
          type:"POST",
          data: {shop_name: shopName,address:shopAddr,description:shopDescription},  
          dataType: 'JSON',  
          headers: {
            "Authorization":"Bearer "+token
          },
          success: function(data,textStatus) {
            console.log(data);
            if (data.code==200) {
              saveSuccess=true;
              console.log("提交商铺信息成功1");
            }
            else{
              alert(data.msg);
              saveSuccess=false;
            }
          },
          error: function(XHR,textStatus,errorThrown) {
            alert("服务器故障");
          }
        }); 
        var userName=$("#userName").val();
        var userMail=$("#userMail").val();
        $.ajax({  
          url: "http://daodao.90door.com/api/me",  
          type:"POST",
          data: {username: userName,email:userMail},  
          dataType: 'JSON',  
          headers: {
            "Authorization":"Bearer "+token
          },
          success: function(data,textStatus) {
            console.log(data);
            if (data.code==200&&saveSuccess==true) {
              alert("已保存！");
            }
            else{
              alert(data.msg);
              saveSuccess=false;
            }
          },
          error: function(XHR,textStatus,errorThrown) {
            alert("服务器故障");
          }
        }); 
        if(saveSuccess==true){
          location.href = "/lifeng";
        }
      }); 
    };    
  });