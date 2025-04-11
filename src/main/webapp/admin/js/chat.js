var stompClient = null;

$( document ).ready(function() {
    var user = localStorage.getItem("user");
    if(user != null){
        user = JSON.parse(user)
        var username = user.username;
        connect(username);
    }
});

function connect(username) {
    var uls = new URL(document.URL)
    var userid = uls.searchParams.get("user");
    var socket = new SockJS('/hello');
    stompClient = Stomp.over(socket);
    stompClient.connect({ username: username, }, function() {
        console.log('Web Socket is connected');
        stompClient.subscribe('/users/queue/messages', function(message) {
            var Idsender = message.headers.sender
            if(Idsender == userid){
                appendRecivers(message.body)
            }
        });
    });
}


$( document ).ready(function() {
    var uls = new URL(document.URL)
    var userid = uls.searchParams.get("user");
    $("#sendmess").click(function() {
        stompClient.send("/app/hello/"+userid, {}, $("#contentmess").val());
        append()
    });
    $('#contentmess').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            stompClient.send("/app/hello/"+userid, {}, $("#contentmess").val());
            append()
        }
    });
});

// nối vào đoạn chat ngay sau khi gửi

async function loadTinNhan(){
    var uls = new URL(document.URL)
    var userid = uls.searchParams.get("user");
    if(userid == null){
        document.getElementById("mainchatadmin").style.display = "none";
        return;
    }
    var url = 'http://localhost:8080/api/chat/admin/getListChat?idreciver='+userid;
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await res.json();
    var main = '';
    for(i=0; i< list.length; i++){
        if(list[i].sender.authorities.name == "ROLE_USER"){
            main += `<p class="mychat">${list[i].content}</p>`
        }
        else{
            main += `<p class="adminchat">${list[i].content}</p>`
        }
    }
    document.getElementById("listchatadmin").innerHTML = main;
}

