myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth();
var nextDate = new Date(year, month);
nextDate.setMonth(nextDate.getMonth() + 1);
// console.log("nextDate01");
// console.log(nextDate);

primaryDate = 　myDate.getDate();

myWeekTbl = new Array("日", "月", "火", "水", "木", "金", "土");
myMonthTbl = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

// now month
myYear = myDate.getFullYear();
if (((myYear % 4) == 0 && (myYear % 100) != 0) || (myYear % 400) == 0) {
    myMonthTbl[1] = 29;
}
myMonth = myDate.getMonth();
myToday = myDate.getDate();
myDate.setDate(1);
// console.log("myDate01")
// console.log(myDate);

myWeek = myDate.getDay();
myTblLine = Math.ceil((myWeek + myMonthTbl[myMonth]) / 7);
myTable = new Array(7 * myTblLine);

for (i = 0; i < 7 * myTblLine; i++) myTable[i] = "　";
for (i = 0; i < myMonthTbl[myMonth]; i++) myTable[i + myWeek] = i + 1;

// next month
nextYear = nextDate.getFullYear();
if (((nextYear % 4) == 0 && (nextYear % 100) != 0) || (nextYear % 400) == 0) {
    myMonthTbl[1] = 29;
}
nextMonth = nextDate.getMonth();
nextToday = nextDate.getDate();
nextDate.setDate(1);
// console.log("nextDate02");
// console.log(nextDate);

nextWeek = nextDate.getDay();
nextTblLine = Math.ceil((nextWeek + myMonthTbl[myMonth]) / 7);
nextTable = new Array(7 * nextTblLine);

for (i = 0; i < 7 * nextTblLine; i++) nextTable[i] = "　";
for (i = 0; i < myMonthTbl[myMonth]; i++) nextTable[i + nextWeek] = i + 1;

$(function($) {

    var thisMonth = makeNowTbl();
    var nextMonth = makeNextTbl();

    $("div.tbl").append(thisMonth);
    $("div.tbl").append(nextMonth);

    for (var l = 0; l < 19; l++) {
        if (l % 2 == 0) {
            $("ul.startTime").append("<li>" + (l / 2 + 10) + ":00</li>");
            $("ul.endTime").append("<li>" + (l / 2 + 10) + ":00</li>");
        } else {
            $("ul.startTime").append("<li>" + (parseInt(l / 2) + 10) + ":30</li>");
            $("ul.endTime").append("<li>" + (parseInt(l / 2) + 10) + ":30</li>");
        }
    }

    allResetUI();

    $("button#allclear").click(function() {
        allResetUI();
        ohSnap('テキストをリセットしました', { color: 'red', duration: '1000' });
    });

    $(".tbl td").click(function() {
        
        if( $(this).attr("data-txt") == "" ){
            console.log("blank date selected.");
            return false
        }

        $("div.tbl").addClass("opa");
        console.log("selected date: " + $(this).attr("data-txt"));

        $("#makeTxt").val($("#makeTxt").val() + $(this).attr("data-txt"));
        $(".tbl ").addClass("killDOM ");
        $('.timeS').removeClass('opa killDOM');
        $(this).addClass("selectedItem");

    });

    $(".timeS li").click(function() {

        $("#makeTxt").val($("#makeTxt").val() + " " + $(this).text());
        sTime = parseInt($(this).text().replace(':', ''));
        $(".timeS").addClass("opa killDOM");
        $('.timeE').removeClass('opa killDOM');
        $(this).addClass("selectedItem");

        console.log("selected time(e): " + $(this).text());

        $(".endTime li ").each(function() {
            eTime = parseInt($(this).text().replace(':', ''));
            if (parseInt(sTime) >= parseInt(eTime)) $(this).addClass("killListItem killDOM");
        });

    });

    $(".timeE li").click(function() {
        
        console.log("selected time(e): " + $(this).text());
        var inputVal = $("#makeTxt").val() + " ~ " + $(this).text() + '\n';
        $("#makeTxt").val(inputVal);
        singleResetUI();

    });

    $("#copytxt").click(function() {

        ohSnap('テキストをコピーしました', { color: 'blue', duration: '1000' });

        var str = $("#makeTxt").val();
        var isSlackMsg = window.confirm("Slackメッセージ形式でコピーしますか？");
        if(isSlackMsg) {
            arr = str.split(/\r\n|\n/);
            str = "";
            for (var i = 0; i < arr.length; i++){
                str += arr[i] +' :'+(i+1)+':\n';
                if(i==(arr.length-2)) break;
            }
            str += "以上の日程からご都合いい日時の「番号」を選んでください。";
        }else{
            str += "以上の日程からご都合いい日時をお教えください。";
        }

        var listener = function(e) {
            e.clipboardData.setData("text/plain", str);
            e.preventDefault();
            document.removeEventListener("copy", listener);
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");

    });

})

function allResetUI() {
    // $("#makeTxt").val("以下の日程でご都合いい日時はありますか。" + "\n" + '\n');
    singleResetUI();
}

function singleResetUI() {
    $('.tbl').removeClass('opa killDOM');
    $('.tbl td').removeClass('selectedItem');
    $('.timeS').removeClass('opa killDOM');
    $('.timeS li').removeClass('selectedItem');
    $('.endTime li').removeClass('killListItem');
    $('.timeS').addClass('opa killDOM');
    $('.timeE').addClass('opa killDOM');

}

function makeNowTbl() {

    var tblDOM = "<div class='table-container'>";
    tblDOM += "<h2 class='month'>" + myYear + " 年 " + (myMonth + 1) + " 月</h2>";
    tblDOM += "<table class='table' style='margin-left: auto;margin-right: auto'>";
    tblDOM += "<tr>";

    for (i = 0; i < 7; i++) tblDOM += "<th>" + myWeekTbl[i] + "</th>";
    tblDOM += "</tr>";

    for (i = 0; i < myTblLine; i++) {
        tblDOM += ("<tr>");
        for (j = 0; j < 7; j++) {
            myDat = myTable[j + (i * 7)];
            hoge = zeroPadding((myMonth + 1),2) + '月' + zeroPadding(myDat,2) + '日(' + myWeekTbl[j] + ')';
            if (myDat === "　") hoge = "";
            holiday = JapaneseHolidays.isHoliday(new Date(myYear, myMonth, myDat));
            if (primaryDate == myDat) {
                if (holiday) {
                    tblDOM += "<td class='today holiday' style='text-align:center' data-txt='" + hoge + "'>" + myDat + "</td>";
                } else {
                    tblDOM += "<td class='today' style='text-align:center' data-txt='" + hoge + "'>" + myDat + "</td>";
                }
            } else {
                tblDOM += "<td style='text-align:center' class='' data-txt='" + hoge + "'>" + myDat + "</td>";
            }
        }
        tblDOM += "</tr>";
    }
    tblDOM += "</table></div>";
    return tblDOM;
}

function makeNextTbl() {

    var tblDOM = "<div class='table-container'>";
    tblDOM += "<h2 class='month nextMonth'>" + nextYear + " 年 " + (nextMonth + 1) + " 月</h2>";
    tblDOM += "<table class='table' style='margin-left: auto;margin-right: auto'>";
    tblDOM += "<tr>";
    for (i = 0; i < 7; i++) tblDOM += "<th>" + myWeekTbl[i] + "</th>";
    tblDOM += "</tr>";

    for (i = 0; i < nextTblLine; i++) {
        tblDOM += ("<tr>");
        for (j = 0; j < 7; j++) {
            nextDat = nextTable[j + (i * 7)];
            hoge = zeroPadding((nextMonth + 1),2) + '月' + zeroPadding(nextDat,2) + '日(' + myWeekTbl[j] + ')';

            holiday = JapaneseHolidays.isHoliday(new Date(nextYear, nextMonth, nextDat));
            if (nextDat === "　") hoge = "";
            if (holiday) {
                tblDOM += "<td class='holiday' style='text-align:center' data-txt='" + hoge + "'>" + nextDat + "</td>";
            } else {
                tblDOM += "<td class='' style='text-align:center' data-txt='" + hoge + "'>" + nextDat + "</td>";
            }
        }
        tblDOM += "</tr>";
    }
    tblDOM += "</table></div>";
    return tblDOM;
}

function zeroPadding(NUM, LEN){
	return ( Array(LEN).join('0') + NUM ).slice( -LEN );
}