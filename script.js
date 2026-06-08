$(document).ready(function(){

    $("#checkBtn").click(function(){

        // Jana nombor rawak antara 1 hingga 10
        let randomNum = Math.floor(Math.random() * 10) + 1;

        // Ambil nombor yang dimasukkan pengguna
        let userNum = $("#guess").val();

        // Semak jawapan
        if(userNum == randomNum){
            $("#result").html(
                "✅ Betul! Nombor rawak ialah " + randomNum
            );
        }
        else{
            $("#result").html(
                "❌ Salah! Nombor rawak ialah " + randomNum
            );
        }

    });

});