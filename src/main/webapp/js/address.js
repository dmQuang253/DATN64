var list = []

async function loadAddress() {
    var urladd = 'http://localhost:8080/api/address/public/province';
    const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({})
    });
    list = await response.json();
    if (res.status < 300) {
        swal({
                title: "Thông báo",
                text: "Xác nhận tài khoản thành công!",
                type: "success"
            },
            function() {
                window.location.href = 'login'
            });
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("tinh").innerHTML = main
        // loadHuyen(list[0].id)
}

async function loadHuyen(idtinh) {
    for (u = 0; u < list.length; u++) {
        if (list[u].id == idtinh) {
            var huyen = list[u].districts;
            var main = ''
            for (j = 0; j < huyen.length; j++) {
                main += `<option value="${huyen[j].id}">${huyen[j].name}</option>`
            }
            document.getElementById("huyen").innerHTML = main
            loadXa(huyen[0].id, idtinh)
            break;
        }
    }
}

async function loadXa(idHuyen, idtinh) {
        var url = 'http://localhost:8080/api/user-address/user/create';
    if (id != "" && id != null) {
        url = 'http://localhost:8080/api/user-address/user/update';
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(addu)
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "Thành công",
                type: "success"
            },
            function() {
                window.location.reload();
            });
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}
}

async function loadHuyenOnchange() {
    var idtinh = document.getElementById("tinh").value;
    loadHuyen(idtinh)
}

async function loadXaOnchange() {
    var idtinh = document.getElementById("tinh").value;
    var idhuyen = document.getElementById("huyen").value;
    loadXa(idhuyen, idtinh)
}