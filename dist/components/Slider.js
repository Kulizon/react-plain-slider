var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.scss";
var Slider = function (props) {
    var innerSliderRef = useRef(null);
    var sliderRef = useRef(null);
    var _a = useState(false), isPressed = _a[0], setIsPressed = _a[1];
    var _b = useState(0), startX = _b[0], setStartX = _b[1];
    var _c = useState(0), startLeft = _c[0], setStartLeft = _c[1];
    var mouseDownHandler = function (e) {
        var _a;
        setIsPressed(true);
        setStartX(e.nativeEvent.offsetX - ((_a = innerSliderRef.current) === null || _a === void 0 ? void 0 : _a.offsetLeft));
        if (sliderRef.current) {
            sliderRef.current.style.cursor = "grabbing";
            sliderRef.current.style.transform = "scale(1.03)";
            setStartLeft(0);
        }
        cancelMomentumTracking();
    };
    var mouseEnterHandler = function () {
        if (sliderRef.current) {
            sliderRef.current.style.cursor = "grab";
        }
    };
    var mouseUpHandler = function (e) {
        if (sliderRef.current) {
            sliderRef.current.style.cursor = "grab";
            sliderRef.current.style.transform = "scale(1)";
            setStartLeft(0);
        }
        setIsPressed(false);
        beginMomentumTracking();
    };
    var mouseLeaveHandler = function (e) {
        if (sliderRef.current) {
            sliderRef.current.style.cursor = "defualt";
            sliderRef.current.style.transform = "scale(1)";
        }
        setIsPressed(false);
    };
    var checkBoundary = function () {
        var _a, _b, _c;
        var outerBoundary = (_a = sliderRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        var innerBoundary = (_b = innerSliderRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
        if (parseInt((_c = innerSliderRef.current) === null || _c === void 0 ? void 0 : _c.style.left) > 0) {
            innerSliderRef.current.style.left = "0";
        }
        else if (innerBoundary.right < (outerBoundary === null || outerBoundary === void 0 ? void 0 : outerBoundary.right)) {
            innerSliderRef.current.style.left = "-".concat((innerBoundary === null || innerBoundary === void 0 ? void 0 : innerBoundary.width) - (outerBoundary === null || outerBoundary === void 0 ? void 0 : outerBoundary.width), "px");
        }
    };
    var mouseMoveHandler = function (e) {
        if (!isPressed)
            return;
        if (!startLeft)
            setStartLeft(parseInt(innerSliderRef.current.style.left));
        e.preventDefault();
        var movedX = e.nativeEvent.offsetX - startX;
        var prevLeft = parseInt(innerSliderRef.current.style.left);
        if (innerSliderRef.current)
            innerSliderRef.current.style.left = "".concat(movedX, "px");
        checkBoundary();
        setVelocityX(movedX - startLeft);
    };
    var _d = useState(0), velocityX = _d[0], setVelocityX = _d[1];
    var _e = useState(), momentumID = _e[0], setMomentumID = _e[1];
    var beginMomentumTracking = function () {
        cancelMomentumTracking();
        setMomentumID(requestAnimationFrame(momentumLoop));
    };
    var cancelMomentumTracking = function () {
        cancelAnimationFrame(momentumID);
    };
    var momentumLoop = function () {
        if (!velocityX || isPressed)
            return;
        var moveValueX = (parseInt(innerSliderRef.current.style.left) + velocityX) / 150;
        if (innerSliderRef.current)
            innerSliderRef.current.style.left = "".concat(velocityX > 0
                ? parseInt(innerSliderRef.current.style.left) - moveValueX
                : parseInt(innerSliderRef.current.style.left) + moveValueX, "px");
        checkBoundary();
        setVelocityX(function (prevVel) { return prevVel * 0.96; });
    };
    useEffect(function () {
        if (velocityX && Math.abs(velocityX * 0.96) > 0.75)
            setMomentumID(requestAnimationFrame(momentumLoop));
    }, [velocityX]);
    return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: "".concat(styles.slider, " ").concat(props.className ? props.className : ""), style: { width: "".concat(props.width), height: "".concat(props.height) }, onMouseDown: mouseDownHandler, onMouseEnter: mouseEnterHandler, onMouseUp: mouseUpHandler, onMouseMove: mouseMoveHandler, onMouseLeave: mouseLeaveHandler, ref: sliderRef }, { children: _jsx("div", __assign({ className: "".concat(styles.slider__inner, " ").concat(props.innerClassname ? props.innerClassname : ""), style: {
                    gridTemplateColumns: "repeat(".concat(props.children.length, ", 1fr)"),
                }, ref: innerSliderRef }, { children: props.children })) })) }));
};
export default Slider;
