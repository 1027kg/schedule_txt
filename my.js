myDate = new Date();
nextDate = new Date();
nextDate.setMonth(nextDate.getMonth() + 1);

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

nextWeek = nextDate.getDay();
nextTblLine = Math.ceil((nextWeek + myMonthTbl[myMonth]) / 7);
nextTable = new Array(7 * nextTblLine);

for (i = 0; i < 7 * nextTblLine; i++) nextTable[i] = "　";
for (i = 0; i < myMonthTbl[myMonth]; i++) nextTable[i + nextWeek] = i + 1;


Zepto(function($) {
    var thisMonth = makeNowTbl();
    var nextMonth = makeNextTbl();
    $("div.tbl").append(thisMonth);
    $("div.tbl").append(nextMonth);

    $("button#allclear").click(function() {
        $("#makeTxt").val("");
        $('.tbl').removeClass('opa killDOM');
        $('.timeS').removeClass('opa killDOM');
        $('.endTime li').removeClass('killListItem');
        $('.timeS').addClass('opa killDOM');
        $('.timeE').addClass('opa killDOM');
    });

    $(".tbl td").click(function() {
        $("div.tbl").addClass("opa");
        $("#makeTxt").val($("#makeTxt").val() + $(this).attr("data-txt"));
        $(".tbl ").addClass("killDOM ");
        $('.timeS').removeClass('opa killDOM');
    });

    $(".timeS li").click(function() {

        $("#makeTxt").val($("#makeTxt").val() + " " + $(this).text());
        sTime = parseInt($(this).text().replace(':00', ''));
        $(".timeS").addClass("opa killDOM");
        $('.timeE').removeClass('opa killDOM');

        $(".endTime li ").each(function() {
            eTime = parseInt($(this).text().replace(':00', ''));
            if (parseInt(sTime) >= parseInt(eTime)) $(this).addClass("killListItem");
        });

    });

    $(".timeE li").click(function() {
        var inputVal = $("#makeTxt").val() + " ~ " + $(this).text() + '\n';
        $("#makeTxt").val(inputVal);
        $('.tbl').removeClass('opa killDOM');
        $('.timeS').removeClass('opa killDOM');
        $('.endTime li').removeClass('killListItem');
        $('.timeS').addClass('opa killDOM');
        $('.timeE').addClass('opa killDOM');
    });

})

function makeNowTbl() {

    var tblDOM = "<h2 class='month'>" + (myMonth + 1) + "月</h2>";
    tblDOM += "<div class='table-container'><table class='table'>";
    tblDOM += "<tr>";
    for (i = 0; i < 7; i++) tblDOM += "<th>" + myWeekTbl[i] + "</th>";
    tblDOM += "</tr>";

    for (i = 0; i < myTblLine; i++) {
        tblDOM += ("<tr>");
        for (j = 0; j < 7; j++) {
            myDat = myTable[j + (i * 7)];
            hoge = (myMonth + 1) + "月" + myDat + "日(" + myWeekTbl[j] + ")";
            if (myDat === "　") hoge = "";
            if (primaryDate == myDat) {
                tblDOM += "<td class='today' data-txt='" + hoge + "'>" + myDat + "</td>";
            } else {
                tblDOM += "<td data-txt='" + hoge + "'>" + myDat + "</td>";
            }
        }
        tblDOM += "</tr>";
    }
    tblDOM += "</table></div>";
    return tblDOM;
}

function makeNextTbl() {

    var tblDOM = "<h2 class='month'>" + (nextMonth + 1) + "月</h2>";
    tblDOM += "<div class='table-container'><table class='table'>";
    tblDOM += "<tr>";
    for (i = 0; i < 7; i++) tblDOM += "<th>" + myWeekTbl[i] + "</th>";
    tblDOM += "</tr>";

    for (i = 0; i < nextTblLine; i++) {
        tblDOM += ("<tr>");
        for (j = 0; j < 7; j++) {
            nextDat = nextTable[j + (i * 7)];
            hoge = (nextMonth + 1) + "月" + nextDat + "日(" + myWeekTbl[j] + ")";
            if (nextDat === "　") hoge = "";
            tblDOM += "<td data-txt='" + hoge + "'>" + nextDat + "</td>";
        }
        tblDOM += "</tr>";
    }
    tblDOM += "</table></div>";
    return tblDOM;
}