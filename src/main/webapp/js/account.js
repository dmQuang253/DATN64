function handleCredentialResponse(response) {
    console.log(response);
    console.log(response.credential);
    sendLoginRequestToBackend(response.credential);
}

async function sendLoginRequestToBackend(accessToken) {
    var response = await fetch('http://localhost:8080/api/login/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: accessToken
    })
    var result = await response.json();

    if (response.status < 300) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        if (result.user.authorities.name === "ROLE_ADMIN") {
            window.location.href = 'admin/index';
        }
        if (result.user.authorities.name === "ROLE_USER") {
            window.location.href = 'index';
        }
    }
    if (response.status == exceptionCode) {
        if (result.errorCode == 300) {
            swal({
                title: "Thông báo",
                text: "Tài khoản chưa được kích hoạt, đi tới kích hoạt tài khoản!",
                type: "warning"
            }, function() {
                window.location.href = 'confirm?email=' + username
            });
        } else {
            toastr.warning(result.defaultMessage);
        }
    }
}


async function login() {
    var url = 'http://localhost:8080/api/login'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password,
        "tokenFcm":tokenFcm
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await response.json();
    if (response.status < 300) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        if (result.user.authorities.name === "ROLE_ADMIN") {
            window.location.href = 'admin/index';
        }
        if (result.user.authorities.name === "ROLE_USER") {
            window.location.href = 'index';
        }
    }
    if (response.status == exceptionCode) {
        if (result.errorCode == 300) {
            swal({
                title: "Thông báo",
                text: "Tài khoản chưa được kích hoạt, đi tới kích hoạt tài khoản!",
                type: "warning"
            }, function() {
                window.location.href = 'confirm?email=' + username
            });
        } else {
            toastr.warning(result.defaultMessage);
        }
    }
}

async function regis() {
    var url = 'http://localhost:8080/api/regis'
    var email = document.getElementById("email").value
    var fullname = document.getElementById("fullname").value
    var phone = document.getElementById("phone").value
    var password = document.getElementById("password").value
    var user = {
        "fullname": fullname,
        "email": email,
        "phone": phone,
        "password": password
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await response.json();
	async function confirmAccount() {
    var uls = new URL(document.URL)
    var email = uls.searchParams.get("email");
    var key = document.getElementById("maxacthuc").value;
    var url = 'http://localhost:8080/api/active-account?email=' + email + '&key=' + key
    const res = await fetch(url, {
        method: 'POST'
    });
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
}

async function forgorPassword() {
    var email = document.getElementById("email").value
    var url = 'http://localhost:8080/api/forgot-password?email=' + email
    const res = await fetch(url, {
        method: 'POST'
    });
    if (res.status < 300) {
        swal({
                title: "",
                text: "mật khẩu mới đã được gửi về email của bạn",
                type: "success"
            },
            function() {
                window.location.replace("login")
            });
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}

async function changePassword() {
    var token = localStorage.getItem("token");
    var oldpass = document.getElementById("oldpass").value
    var newpass = document.getElementById("newpass").value
    var renewpass = document.getElementById("renewpass").value
    var url = 'http://localhost:8080/api/user/change-password';
    if (newpass != renewpass) {
        alert("mật khẩu mới không trùng khớp");
        return;
    }
    var passw = {
        "oldPass": oldpass,
        "newPass": newpass
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(passw)
    });
    async function loadXa(idHuyen, idtinh) {
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="row singleadd">
        <div class="col-lg-11 col-md-11 col-sm-12 col-12">
            <table class="table tableadd">
                <tr>
                    <td class="tdleft">Họ tên:</td>
                    <td class="tdright">${list[i].fullname}
                        <span class="addressdef">${list[i].primaryAddres == true ?'<i class="fa fa-check-circle"></i> Địa chỉ mặc định':''}</span>
                    </td>
                </tr>
                <tr>
                    <td class="tdleft">Địa chỉ:</td>
                    <td class="tdright">${list[i].streetName}, ${list[i].wards.name}, ${list[i].wards.districts.name},<br> ${list[i].wards.districts.province.name}</td>
                </tr>
                <tr>
                    <td class="tdleft">Số điện thoại:</td>
                    <td class="tdright">${list[i].phone}</td>
                </tr>
                <tr>
                    <td class="tdleft">Ngày tạo:</td>
                    <td class="tdright">${list[i].createdDate}</td>
                </tr>
            </table>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-12 col-12">
            <span onclick="loadAddressUserById(${list[i].id})" data-bs-toggle="modal" data-bs-target="#modaladd" class="actionacc acsua">Sửa</span>
            <span onclick="deleteAddressUser(${list[i].id})" class="actionacc acdel">Xóa</span>
        </div>
    </div>`
    }
    document.getElementById("listaddacc").innerHTML = main
}

async function loadAddressUserById(id) {
    var url = 'http://localhost:8080/api/user-address/user/findById?id=' + id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var result = await response.json();
    document.getElementById("idadduser").value = result.id
    document.getElementById("fullnameadd").value = result.fullname
    document.getElementById("phoneadd").value = result.phone
    document.getElementById("stressadd").value = result.streetName
    document.getElementById("tinh").value = result.wards.districts.province.id
    if (result.primaryAddres == true) {
        document.getElementById("primaryadd").checked = true;
    } else {
        document.getElementById("primaryadd").checked = false;
    }
    loadHuyen(result.wards.districts.province.id)
    loadXa(result.wards.districts.id, result.wards.districts.province.id)
    document.getElementById("huyen").value = result.wards.districts.id
    document.getElementById("xa").value = result.wards.id
}

function clearData() {
    document.getElementById("idadduser").value = ""
    document.getElementById("fullnameadd").value = ""
    document.getElementById("phoneadd").value = ""
    document.getElementById("stressadd").value = ""
    document.getElementById("tinh").value = 1
    document.getElementById("primaryadd").checked = false;
    document.getElementById("huyen").innerHTML = ""
    document.getElementById("xa").innerHTML = ""
}


async function addAddressUser() {
    var id = document.getElementById("idadduser").value;
    var fullnameadd = document.getElementById("fullnameadd").value;
    var phoneadd = document.getElementById("phoneadd").value;
    var stressadd = document.getElementById("stressadd").value;
    var ward = document.getElementById("xa").value;
    var primaryadd = document.getElementById("primaryadd").checked;
    var addu = {
        "id": id,
        "fullname": fullnameadd,
        "phone": phoneadd,
        "streetName": stressadd,
        "primaryAddres": primaryadd,
        "wards": {
            id: ward
        }
    }
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


async function deleteAddressUser(id) {
    var con = confirm("Bạn chắc chắn muốn xóa địa chỉ này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/user-address/user/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa địa chỉ thành công!");
        await new Promise(r => setTimeout(r, 1000));
        window.location.reload();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

async function loadHuyenOnchange() {
    var idtinh = document.getElementById("tinh").value;
    loadHuyen(idtinh)
}
}


async function confirmAccount() {
    var uls = new URL(document.URL)
    var email = uls.searchParams.get("email");
    var key = document.getElementById("maxacthuc").value;
    var url = 'http://localhost:8080/api/active-account?email=' + email + '&key=' + key
    const res = await fetch(url, {
        method: 'POST'
    });
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
}

async function forgorPassword() {
    var email = document.getElementById("email").value
    var url = 'http://localhost:8080/api/forgot-password?email=' + email
    const res = await fetch(url, {
        method: 'POST'
    });
    if (res.status < 300) {
        swal({
                title: "",
                text: "mật khẩu mới đã được gửi về email của bạn",
                type: "success"
            },
            function() {
                window.location.replace("login")
            });
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}

async function changePassword() {
    var token = localStorage.getItem("token");
    var oldpass = document.getElementById("oldpass").value
    var newpass = document.getElementById("newpass").value
    var renewpass = document.getElementById("renewpass").value
    var url = 'http://localhost:8080/api/user/change-password';
    if (newpass != renewpass) {
        alert("mật khẩu mới không trùng khớp");
        return;
    }
    var passw = {
        "oldPass": oldpass,
        "newPass": newpass
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(passw)
    });
    async function loadXa(idHuyen, idtinh) {
    for (n = 0; n < list.length; n++) {
        if (list[n].id == idtinh) {
            var huyen = list[n].districts;
            for (x = 0; x < huyen.length; x++) {
                if (huyen[x].id == idHuyen) {
                    var xa = huyen[x].wards;
                    var main = ''
                    for (k = 0; k < xa.length; k++) {
                        main += `<option value="${xa[k].id}">${xa[k].name}</option>`
                    }
                    document.getElementById("xa").innerHTML = main
                    break;
                }
            }
            break;
        }
    }
}

async function loadHuyenOnchange() {
    var idtinh = document.getElementById("tinh").value;
    loadHuyen(idtinh)
}
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}