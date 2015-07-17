// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Ссылка
//===
APELSERG.MODEL.Link = function (linkUrl, linkName, linkX, linkY, lengthX, lengthY, linkColor) {
    this.Url = linkUrl;
    this.Name = linkName;
    this.X = linkX;
    this.Y = linkY;
    this.LengthX = lengthX;
    this.LengthY = lengthY;
    this.Color = linkColor;
    this.SelectColor = 'orange';
    this.SelectCnt = 0;
    this.SelectName = false;
    this.ShowBorder = false;
    this.FontHeight = 20;
}

//===
// Массив ссылок
//===
APELSERG.MODEL.MakeLinks = function () {

    var baseX = APELSERG.CONFIG.SET.BaseLinkX;
    var baseY = APELSERG.CONFIG.SET.BaseLinkY + 50;

    var links = [];

    var linksList = [
        { name: "GitHub - Шаблонетка Start page Snow", url: "https://github.com/apelserg/stencil-html-start-page-on-canvas-snow" },
    ];

    for (var n = 0 in linksList) {

        var color = "white";
        var link = new APELSERG.MODEL.Link(linksList[n].url, linksList[n].name, baseX, baseY + 30 * n, linksList[n].name.length * 10 + 30, 30, color);

        links.push(link);
    }
    return links;
}


//===
// Звёзды
//===
APELSERG.MODEL.Star = function (starX, starY, starSize, starColor) {
    this.BaseX = starX;
    this.X = starX;
    this.Y = starY;
    this.Size = starSize;
    this.Color = starColor;
}

//===
// Массив звёзд
//===
APELSERG.MODEL.MakeStars = function (starNum) {

    var Stars = [];
    var color = "#FFFF00"; //"#ECEC99"; //"#FFFF00"; //"#CCFFCC"; //"#CCFF99";

    for (var n = 0; n < starNum; n++) {

        var x = Math.round(Math.random() * APELSERG.CONFIG.SET.PicWidth);
        var y = Math.round(Math.random() * APELSERG.CONFIG.SET.PicHeight/8);
        var s = n % APELSERG.CONFIG.SET.StarsSize;

        var star = new APELSERG.MODEL.Star(x, y, s, color);

        Stars.push(star);
    }
    return Stars;
}

//===
// Снег
//===
APELSERG.MODEL.Snow = function (snowX, snowY, snowSize, snowColor) {
    this.BaseX = snowX;
    this.X = snowX;
    this.Y = snowY;
    this.Size = snowSize;
    this.Color = snowColor;
}

//===
// Массив снега
//===
APELSERG.MODEL.MakeSnows = function () {

    var dateCurrent = new Date();

    if (APELSERG.CONFIG.SET.SnowsMove != dateCurrent.getMinutes() % 5 + 1) { // Minutes Seconds

        APELSERG.CONFIG.SET.SnowsMove = dateCurrent.getMinutes() % 5 + 1; // Minutes Seconds

        APELSERG.CONFIG.SET.SnowsSize = APELSERG.CONFIG.SET.SnowsMove + 2;

        if (APELSERG.CONFIG.SET.SnowsSize < 3) {
            APELSERG.CONFIG.SET.SnowsSize = 3;
        }
        if (APELSERG.CONFIG.SET.SnowsSize > 4) {
             APELSERG.CONFIG.SET.SnowsSize = 4;
        }

        APELSERG.CONFIG.SET.SnowsNum = APELSERG.CONFIG.SET.SnowsMove * 1000;

        var Snows = [];
        var color = "white";

        for (var n = 0; n < APELSERG.CONFIG.SET.SnowsNum; n++) {

            var x = Math.round(Math.random() * APELSERG.CONFIG.SET.PicWidth);
            var y = Math.round(Math.random() * APELSERG.CONFIG.SET.PicHeight);
            var s = n % APELSERG.CONFIG.SET.SnowsSize;

            var snow = new APELSERG.MODEL.Snow(x, y, s, color);

            Snows.push(snow);
        }
        APELSERG.MODEL.DATA.Snows = Snows;
    }
}

//===
// Проверка клика на кнопке
//===
APELSERG.MODEL.CheckClickFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseClickX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseClickX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseClickY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseClickY < frame.Y + frame.LengthY)){

        return true;
    }
    return false;
}

//===
// Проверка мыши над кнопкой
//===
APELSERG.MODEL.CheckMoveFrame = function (frame) {

    if ((APELSERG.CONFIG.PROC.MouseMoveX > frame.X)
        && (APELSERG.CONFIG.PROC.MouseMoveX < frame.X + frame.LengthX)
        && (APELSERG.CONFIG.PROC.MouseMoveY > frame.Y)
        && (APELSERG.CONFIG.PROC.MouseMoveY < frame.Y + frame.LengthY)) {

        return true;
    }
    return false;
}

//===
// Нажатие кнопок
//===
APELSERG.MODEL.UpdateButtons = function () {

    for (var n = 0 in APELSERG.MODEL.DATA.Links) {

        var link = APELSERG.MODEL.DATA.Links[n];

        link.SelectName = APELSERG.MODEL.CheckMoveFrame(link);
        if (link.SelectCnt > 0) link.SelectCnt--;

        if (APELSERG.MODEL.CheckClickFrame(link)) {

            link.SelectCnt = APELSERG.CONFIG.SET.CntSelect;

            window.open(link.Url, "_blank");
        }
    }

    APELSERG.CONFIG.PROC.MouseClickX = -999;
    APELSERG.CONFIG.PROC.MouseClickY = -999;

    //APELSERG.CONFIG.PROC.MouseMoveX = -999;
    //APELSERG.CONFIG.PROC.MouseMoveY = -999;

}
//===
// Переместить звёзды
//===
APELSERG.MODEL.UpdateStars = function () {

    for (var n = 0 in APELSERG.MODEL.DATA.Stars) {

        var flake = APELSERG.MODEL.DATA.Stars[n];

        var dir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) dir = -1;

        flake.Size += dir;
        if (flake.Size > APELSERG.CONFIG.SET.StarsSize) flake.Size = APELSERG.CONFIG.SET.StarsSize;
        if (flake.Size < 1) flake.Size = 1;
    }
}

//===
//  Переместить снег
//===
APELSERG.MODEL.UpdateSnows = function () {

    APELSERG.MODEL.MakeSnows();

    for (var n = 0; APELSERG.MODEL.DATA.Snows.length > n; n++) {

        var snow = APELSERG.MODEL.DATA.Snows[n];

        var dir = 1;
        if (Math.round(Math.random() * 100) % 2 == 0) dir = -1;
        var shift = Math.round(Math.random() * 100) % 3;
        var move = Math.round(Math.random() * 100) % 2 + APELSERG.CONFIG.SET.SnowsMove;

        if (((snow.X + shift * dir) < (snow.BaseX + APELSERG.CONFIG.SET.SnowsShift)) && ((snow.X + shift * dir) > (snow.BaseX - APELSERG.CONFIG.SET.SnowsShift))) {
            snow.X += shift * dir;
        }

        snow.Size += dir;
        if (snow.Size > APELSERG.CONFIG.SET.SnowsSize) snow.Size = APELSERG.CONFIG.SET.SnowsSize;
        if (snow.Size < 0) snow.Size = 0;

        snow.Y += move; // * dir + 1;
        if (snow.Y > APELSERG.CONFIG.SET.PicHeight) snow.Y = 1;

    }

}
