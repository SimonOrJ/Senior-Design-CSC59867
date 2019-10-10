// Copyright (c) 2015-2018 Robert Rypuła - https://audio-network.rypula.pl
'use strict';

// TODO move to class

function getFormFieldValue(selector, parseAs) {
    var element, resultRaw, result;

    element = document.querySelectorAll(selector);
    switch (element.length) {
        case 1:
            resultRaw = element[0].value;
            break;
        case 0:
            return undefined;
            break;
        default:
            throw 'Selector found more than one element';
    }

    switch (parseAs) {
        case 'int':
            result = parseInt(resultRaw);
            break;
        case 'float':
            result = parseFloat(resultRaw);
            break;
        case 'split':
            result = resultRaw
                .trim()
                .replace(/ +(?= )/g, '')
                .split(' ');
            break;
        default:
            result = resultRaw;
    }

    return result;
}

function getCheckboxState(selector) {
    var element, checked, result;

    element = document.querySelectorAll(selector);
    switch (element.length) {
        case 1:
            checked = element[0].checked;
            break;
        case 0:
            return undefined;
            break;
        default:
            throw 'Selector found more than one element';
    }

    return checked;
}

function setActive(containerId, activeId, activeCssClass) {
    var
        list = select(containerId + ' > *'),
        active = select(activeId),
        i;

    activeCssClass = activeCssClass || 'active';

    for (i = 0; i < list.length; i++) {
        list[i].classList.remove(activeCssClass);
    }
    if (active.length === 1) {
        select(activeId)[0].classList.add(activeCssClass);
    }
}

function select(selector) {
    return document.querySelectorAll(selector);
}

function setValue(selector, value) {
    var element, i;

    element = document.querySelectorAll(selector);
    for (i = 0; i < element.length; i++) {
        if (element[i].value) {
            element[i].value = value;
        }
    }
}

function html(selector, html, append) {
    var element, i;

    element = document.querySelectorAll(selector);
    for (i = 0; i < element.length; i++) {
        if (append) {
            element[i].innerHTML += html;
        } else {
            element[i].innerHTML = html;
        }
    }
}

function addClass(selector, className) {
    var element, i;

    element = document.querySelectorAll(selector);
    for (i = 0; i < element.length; i++) {
        element[i].classList.add(className);
    }
}

function removeClass(selector, className) {
    var element, i;

    element = document.querySelectorAll(selector);
    for (i = 0; i < element.length; i++) {
        element[i].classList.remove(className);
    }
}

function hasClass(selector, className) {
    var element, i, result;

    result = false;
    element = document.querySelectorAll(selector);
    for (i = 0; i < element.length; i++) {
        if (element[i].classList.contains(className)) {
            result = true;
            break;
        }
    }

    return result;
}

function invokeOnEnter(selector, callback) {
    var domElement = document.querySelector(selector);

    if (!domElement) {
        return;
    }

    domElement.addEventListener(
        'keydown',
        function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                callback();
            }
        }
    );
}
