function kiemTra(){
    var doncho = localStorage.getItem("doncho");
    if(doncho == null){
        doncho = [];
        window.localStorage.setItem("doncho", JSON.stringify(doncho));
    }
}
function addDonCho(){
    var doncho = localStorage.getItem("doncho");
    doncho = JSON.parse(doncho);
    if(doncho.length == 5){
        toastr.error("Chỉ được thêm tối đa 5 đơn chờ");
        return;
    }
    var obj = {
        "id":Date.now(),
        "hoTen":document.getElementById("hotendc").value,
        "soDienThoai":document.getElementById("sdtdc").value,
        "listProductTam":[]
    }
    doncho.push(obj);
    window.localStorage.setItem("doncho", JSON.stringify(doncho));
    toastr.success("Thêm đơn chờ thành công");
    loadDonChoSelect();
}

function loadDonChoSelect(){
    var doncho = localStorage.getItem("doncho");
    doncho = JSON.parse(doncho);
    var main = `<option disabled selected value="-1">Đang có ${doncho.length} đơn chờ</option>`;
    for(i=0; i< doncho.length; i++){
        main += `<option value="${doncho[i].id}">${doncho[i].hoTen} - ${doncho[i].soDienThoai}</option>`
    }
    document.getElementById("listdoncho").innerHTML = main;
}

function loadChiTietHoaDonCho(){
    var doncho = localStorage.getItem("doncho");
    doncho = JSON.parse(doncho);
    var iddoncho = document.getElementById("listdoncho").value;
    var dc = null;
    for(i=0; i<doncho.length; i++){
        if(doncho[i].id == iddoncho){
            dc = doncho[i];
        }
    }
    listProductTam = dc.listProductTam;
    loadSizeProduct();
}

async function loadAllProductList(){
    var search = document.getElementById("search").value
    var url = 'http://localhost:8080/api/product/public/findAll-list?search=' + search
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = "";
    for(i=0; i<list.length; i++){
        main += `<tr>
                  <td>${list[i].code}</td>
                  <td>${list[i].name}</td>
                  <td>${formatmoney(list[i].price)}</td>
                  <td><button onclick="loadChiTietMauSac(${list[i].id})" data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary">Chọn</button></td>
                </tr>`
    }
    document.getElementById("listproduct").innerHTML = main;
}

async function loadChiTietMauSac(idproduct){
    var url = 'http://localhost:8080/api/product/public/findById?id=' + idproduct
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.productColors
    document.getElementById("listspchitiet").innerHTML = "";
    var main = document.getElementById("listspchitiet");
    for(i=0; i<list.length; i++){
        var trfirst = document.createElement("tr");
        var tdfirst = document.createElement("td");
        tdfirst.rowSpan = list[i].productSizes.length
        tdfirst.innerHTML = list[i].colorName
        trfirst.appendChild(tdfirst)

        if(list[i].productSizes.length > 0){
            var td1 = document.createElement("td");
            td1.innerHTML = list[i].productSizes[0].sizeName;
            var td2 = document.createElement("td");
            td2.innerHTML = list[i].productSizes[0].quantity;
            var td3 = document.createElement("td");

            var checked = checkTonTai(list[i].productSizes[0].id)
            var ck =''
            var onc = '';
            if(checked == true){
                onc = `removeTam(${list[i].productSizes[0].id}, this)`
                ck = 'checked'
            }
            else{
                onc = `addTam(${list[i].productSizes[0].id}, this)`
            }
            td3.innerHTML = `<input onchange="${onc}"  ${ck}  type="checkbox">`


            trfirst.appendChild(td1)
            trfirst.appendChild(td2)
            trfirst.appendChild(td3)
        }
        main.appendChild(trfirst)
        if(list[i].productSizes.length > 1){
            for(j=1; j< list[i].productSizes.length; j++){
                var trsecond = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.innerHTML = list[i].productSizes[j].sizeName;
                var td2 = document.createElement("td");
                td2.innerHTML = list[i].productSizes[j].quantity;
                var td3 = document.createElement("td");
                var checked = checkTonTai(list[i].productSizes[j].id)
                var onc = '';
                var ck =''
                if(checked == true){
                    onc = `removeTam(${list[i].productSizes[j].id}, this)`
                    ck = 'checked'
                }
                else{
                    onc = `addTam(${list[i].productSizes[j].id}, this)`
                }
                td3.innerHTML = `<input onchange="${onc}" ${ck} type="checkbox">`
                td3.onchange = function (){
                    if(checked == true){
                        removeTam(list[i].productSizes[j].id)
                    }
                    else{
                        addTam(list[i].productSizes[j].id)
                    }
                }
                trsecond.appendChild(td1)
                trsecond.appendChild(td2)
                trsecond.appendChild(td3)
                main.appendChild(trsecond)
            }
        }

    }
}

var listProductTam = [];
async function addTam(idsize, e){
    var donCho = document.getElementById("listdoncho").value;
    if(donCho == -1){
        toastr.error("Chưa có đơn chờ nào được chọn");
        e.checked = false
        return;
    }
    if(e.checked == false){
        removeTam(idsize)
        return;
    }
    if(checkTonTai(idsize) == true){
        return;
    }
    var url = 'http://localhost:8080/api/product-size/public/find-by-id?id=' + idsize
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    result.quantity = 1;
    listProductTam.push(result);
    loadSizeProduct();
    luuLaiDonCho()
}

function checkTonTai(idsize){
    for(var k=0; k< listProductTam.length; k++){
        if(listProductTam[k].productSize.id == idsize){
            return true;
        }
    }
    return false;
}

function removeTam(idsize){
    for(i=0; i< listProductTam.length; i++){
        if(listProductTam[i].productSize.id == idsize){
            listProductTam.splice(i, 1);
        }
    }
    loadSizeProduct();
    luuLaiDonCho();
}

function loadSizeProduct(){
    var main = '';
    var tongtientt = 0;
    for(i=0; i< listProductTam.length; i++){
        tongtientt = Number(tongtientt) + Number(listProductTam[i].product.price) * Number(listProductTam[i].quantity);
        main += `<tr>
            <td>Size: ${listProductTam[i].productSize.sizeName}, Màu: ${listProductTam[i].productColor.colorName}<br>${listProductTam[i].product.name}</td>
            <td>${formatmoney(listProductTam[i].product.price)}</td>
            <td>
                <div class="clusinp"><button onclick="upDownQuantity(${listProductTam[i].productSize.id},-1)" class="cartbtn"> - </button>
                <input value="${listProductTam[i].quantity}" class="inputslcart">
                <button onclick="upDownQuantity(${listProductTam[i].productSize.id},1)" class="cartbtn"> + </button></div>
            </td>
            <td><i onclick="removeTam(${listProductTam[i].productSize.id})" class="fa fa-trash-alt pointer"></i></td>
        </tr>`
    }
    document.getElementById("listproducttam").innerHTML = main;
    document.getElementById("tongtientt").innerHTML = formatmoney(tongtientt);
}

function upDownQuantity(idsize, quantity){
    for(i=0; i< listProductTam.length; i++){
        if(listProductTam[i].productSize.id == idsize){
            listProductTam[i].quantity = Number(listProductTam[i].quantity) + Number(quantity);
            if(listProductTam[i].quantity == 0){
                removeTam(idsize)
            }
            break;
        }
    }
    loadSizeProduct();
    luuLaiDonCho()
}

async function loadSelect() {
    var response = await fetch('http://localhost:8080/api/material/public/all', {
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("chatlieu").innerHTML = main

    var response = await fetch('http://localhost:8080/api/trademark/public/all', {
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("thuonghieu").innerHTML = main

    var response = await fetch('http://localhost:8080/api/sole/public/all', {
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("degiay").innerHTML = main
}

function luuLaiDonCho(){
    var doncho = localStorage.getItem("doncho");
    doncho = JSON.parse(doncho);
    var iddoncho = document.getElementById("listdoncho").value;
    var dc = null;
    for(i=0; i<doncho.length; i++){
        if(doncho[i].id == iddoncho){
            dc = doncho[i];
        }
    }
    dc.listProductTam = listProductTam;
    localStorage.setItem("doncho", JSON.stringify(doncho))
}


function xoaDonChoAc(){
    var donCho = document.getElementById("listdoncho").value;
    if(donCho == -1){
        toastr.error("Chưa có đơn chờ nào được chọn");
        return;
    }
    var con = confirm("Xác nhận xóa đơn chờ đã chọn")
    if(con == false){
        return;
    }
    xoaDonCho(donCho);
    swal({
            title: "Thông báo",
            text: "Xóa đơn chờ thành công!",
            type: "success"
        },
        function() {
            window.location.reload();
        });
}

function xoaDonCho(iddoncho){
    var doncho = localStorage.getItem("doncho");
    doncho = JSON.parse(doncho);
    var remainingArr = doncho.filter(data => data.id != iddoncho);
    window.localStorage.setItem("doncho", JSON.stringify(remainingArr));
}


async function createInvoice(){
    var con = confirm("Xác nhận");
    if(con == false){
        return;
    }
    var doncho = localStorage.getItem("doncho");
    doncho = JSON.parse(doncho);
    var iddoncho = document.getElementById("listdoncho").value;
    var dc = null;
    for(i=0; i<doncho.length; i++){
        if(doncho[i].id == iddoncho){
            dc = doncho[i];
        }
    }
    var listId = [];
    var tongtientt = 0;
    for(var i=0; i<listProductTam.length; i++){
        var obj = {
            "idProductSize":listProductTam[i].productSize.id,
            "quantity":listProductTam[i].quantity
        }
        listId.push(obj);
        tongtientt = Number(tongtientt) + Number(listProductTam[i].product.price) * Number(listProductTam[i].quantity);
    }
    var km = document.getElementById("khuyenmai").value;
    if(km != -1){
        const response = await fetch('http://localhost:8080/api/voucher/admin/findById?id='+km, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
            }),
        });
        var result = await response.json();
        if(result.minAmount > tongtientt){
            toastr.error("Đơn hàng phải đạt tối thiểu "+ formatmoney(result.minAmount)+" để có thể áp khuyến mại này");
            return;
        }
    }
    var payload = {
        "listProductSize":listId,
        "fullName":dc.hoTen,
        "phone":dc.soDienThoai,
        "voucherId":km
    }
    const res = await fetch('http://localhost:8080/api/invoice/admin/pay-counter', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });
    if(res.status < 300){
        var id = await res.text();
        swal({
                title: "Thông báo",
                text: "Thành công",
                type: "success"
            },
            function() {
                xoaDonCho(dc.id)
                window.open('/admin/in-don?id=' + id, '_blank');
                // window.location.href = '/admin/invoice'
                window.location.reload();
            });
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}