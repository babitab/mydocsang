
$('document').ready(function () {
    $('#fileUploadForm').submit(uploadFile);

    function uploadFile(){
        var formData = new FormData($('#fileUploadForm')[0]);
        $.ajax({
            url: './../api/fileUpload.php',
            type: 'POST',
            data: formData,
            async: true,
            success: function (data) {
                uploadFileCB(data)
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    }

    function uploadFileCB(data){
        console.log(data);
        var resp = jQuery.parseJSON(data);
        if(resp.fileUploaded){
            alert("File successfully uploaded.");
            window.location = '.';
        }else{
            jQuery.each(resp.errors, function(i, field){
                $('#fileUploadForm').find('input[name="'+field.name+'"]').css({"border-color":"red"});
            });
        }
    }
});
