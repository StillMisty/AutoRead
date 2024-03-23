// ==UserScript==
// @name        经典阅读自动翻页
// @author      StillMisty
// @namespace   https://www.cxstar.com/onlineepub
// @version     1.0
// @description 经典阅读自动翻页
// @match       https://www.cxstar.com/onlineepub?*
// @grant       GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    var intervalTime = GM_getValue('intervalTime', 5000);

    var clickButton = function() {
        var button = document.getElementsByClassName("chapter-forward")[0] || document.getElementsByClassName("menu__chapter-forward false")[0];
        if (button) {
            button.click();
        } else {
            alert("没有找到翻页按钮")
        }
    };

    var checkButtonExist = setInterval(function() {
        clickButton();
    }, intervalTime);

    GM_registerMenuCommand("设置翻页时间", function() {
        var userInput = prompt("设置翻页时间，单位秒(默认5秒):");
        
        if (userInput === null) {
            // 用户取消输入
            return;
        }
    
        var parsedInput = parseFloat(userInput);
        if (isNaN(parsedInput) || parsedInput <= 0) {
            alert('请输入一个大于0的数字');
        } else {
            intervalTime = parsedInput * 1000;
            // 保存设置
            GM_setValue('intervalTime', intervalTime);
            clearInterval(checkButtonExist);
            checkButtonExist = setInterval(function() {
                clickButton();
            }, intervalTime);
            console.log("翻页时间已设置为 " + intervalTime + " 秒");
        }
    });
})();