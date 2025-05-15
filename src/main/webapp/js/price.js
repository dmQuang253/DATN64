$(document).ready(function() {

    $("#min_price,#max_price").on('change', function() {

        $('#price-range-submit').show();

        var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    if (id != null) {
        var url = 'http://localhost:8080/api/product-comment/public/find-by-product?idproduct=' + id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        var list = await response.json();
        var main = ''
        for (i = 0; i < list.length; i++) {
            var listImg = ''
            for (j = 0; j < list[i].productCommentImages.length; j++) {
                listImg += `<img class="imgcomment" src="${list[i].productCommentImages[j].linkImage}">`
            }
            var star = '';
            for (j = 0; j < list[i].star; j++) {
                star += `<span class="fa fa-star checkedstar"></span>`
            }
            main += `<div class="singlectlct">
            <div class="row">
                <div class="col-11">
                    <div class="d-flex nguoidangctl">
                        <img class="avtuserdangctl" src="image/avatar.webp">
                        <span class="usernamedangctl">${list[i].user.fullname==null?'Người dùng':list[i].user.fullname}</span>
                        <span class="ngaytraloi">${list[i].createdDate}</span>
                        <span class="starcmts">${star}</span>
                        ${list[i].isMyComment==true?`<span class="starcmts"><i onclick="deleteComment(${list[i].id})" class="fa fa-trash pointer"></i></span>`:''}
                    </div>
                    <div class="contentctlct">${list[i].content}</div>
                    <div class="listimgcontent">
                        ${listImg}
                    </div>
                </div>
            </div>
        </div>`
        }
        document.getElementById("listcautlct").innerHTML = main
    }
}

        if (min_price_range > max_price_range) {
            $('#max_price').val(min_price_range);
        }

        $("#slider-range").slider({
            values: [min_price_range, max_price_range]
        });

    });


    $("#min_price,#max_price").on("paste keyup", function() {

        $('#price-range-submit').show();

        var min_price_range = parseInt($("#min_price").val());

        var max_price_range = parseInt($("#max_price").val());

        if (min_price_range == max_price_range) {

            max_price_range = min_price_range + 100;

            $("#min_price").val(min_price_range);
            $("#max_price").val(max_price_range);
        }

        $("#slider-range").slider({
            values: [min_price_range, max_price_range]
        });

    });


    $(function() {
        $("#slider-range").slider({
            range: true,
            orientation: "horizontal",
            min: 0,
            max: 3000000,
            values: [0, 900000],
            step: 300000,

            slide: function(event, ui) {
                if (ui.values[0] == ui.values[1]) {
                    return false;
                }

                $("#min_price").val(ui.values[0]);
                $("#max_price").val(ui.values[1]);
            }
        });

        $("#min_price").val($("#slider-range").slider("values", 0));
        $("#max_price").val($("#slider-range").slider("values", 1));

    });


});


$(document).ready(function() {


    $("#min_price_mobile,#max_price_mobile").on('change', function() {

        var min_price_range = parseInt($("#min_price_mobile").val());

        var max_price_range = parseInt($("#max_price_mobile").val());

        if (min_price_range > max_price_range) {
            $('#max_price_mobile').val(min_price_range);
        }

        $("#slider-range_mobile").slider({
            values: [min_price_range, max_price_range]
        });

    });


    $("#min_price_mobile,#max_price_mobile").on("paste keyup", function() {

        var min_price_range = parseInt($("#min_price_mobile").val());

        var max_price_range = parseInt($("#max_price_mobile").val());

        if (min_price_range == max_price_range) {

            max_price_range = min_price_range + 100;

            $("#min_price_mobile").val(min_price_range);
            $("#max_price_mobile").val(max_price_range);
        }

        $("#slider-range-mobile").slider({
            values: [min_price_range, max_price_range]
        });

    });


    $(function() {
        $("#slider-range-mobile").slider({
            range: true,
            orientation: "horizontal",
            min: 0,
            max: 3000000,
            values: [0, 300000],
            step: 300000,

            slide: function(event, ui) {
                if (ui.values[0] == ui.values[1]) {
                    return false;
                }

                $("#min_price_mobile").val(ui.values[0]);
                $("#max_price_mobile").val(ui.values[1]);
            }
        });

        $("#min_price_mobile").val($("#slider-range-mobile").slider("values", 0));
        $("#max_price_mobile").val($("#slider-range-mobile").slider("values", 1));

    });


});