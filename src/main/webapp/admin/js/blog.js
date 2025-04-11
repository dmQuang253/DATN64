var token = localStorage.getItem("token");
var size = 10;
async function loadBlog(page) {
    var sort = document.getElementById("sort").value
    var url = 'http://localhost:8080/api/blog/public/findAll?page=' + page + '&size=' + size + '&sort=' + sort;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;
    var totalPage = result.totalPages;

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += ` <tr>
                    <td>#${list[i].id}</td>
                    <td><img src="${list[i].imageBanner}" style="width: 100px;"></td>
                    <td>${list[i].createdDate}</td>
                    <td>${list[i].title}</td>
                    <td>${list[i].description}</td>
                    <td class="sticky-col">
                        <i onclick="deleteBlog(${list[i].id})" class="fa fa-trash-alt iconaction"></i>
                        <a href="addblog?id=${list[i].id}"><i class="fa fa-edit iconaction"></i></a>
                    </td>
                </tr>`
    }
    document.getElementById("listblog").innerHTML = main
    var mainpage = ''
    for (i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="loadBlog(${(Number(i) - 1)})" class="page-item"><a class="page-link" href="#listsp">${i}</a></li>`
    }
    document.getElementById("pageable").innerHTML = mainpage
}


    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}