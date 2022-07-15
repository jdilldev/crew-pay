import React, { ReactElement } from "react";

import AbstractOctopus from "../assets/svgs/abstract-octopus.svg";
import AddGroup from "../assets/svgs/add-group.svg";
import Address from "../assets/svgs/address.svg";
import Alien from "../assets/svgs/alien.svg";
import Aperature from "../assets/svgs/aperature.svg";
import Calendar from "../assets/svgs/calendar.svg";
import CalendarDots from "../assets/svgs/calendar-dots.svg";
import CancelOutline from "../assets/svgs/cancel-outline.svg";
import Check from "../assets/svgs/check.svg";
import CheckOutline from "../assets/svgs/check-outline.svg";
import CheckFilled from "../assets/svgs/check-filled.svg";
import Close from "../assets/svgs/close.svg";
import Piggy from "../assets/svgs/doodle-piggy-bank.svg";
import Email from "../assets/svgs/email.svg";
import EmailSign from "../assets/svgs/arroba.svg";
import Frightened from "../assets/svgs/frightened.svg";
import Google from "../assets/svgs/google.svg";
import Home from "../assets/svgs/home.svg";
import IncomingEmail from "../assets/svgs/incoming-email.svg";
import IncorrectOutlined from "../assets/svgs/incorrect-outlined.svg";
import Incorrect from "../assets/svgs/incorrect.svg";
import License from '../assets/svgs/license-simple.svg'
import MaleUser from '../assets/svgs/male-user.svg'
import MinusOutlined from '../assets/svgs/minus-outlined.svg'
import NewGroup from '../assets/svgs/new-group.svg'
import OneTimePassword from '../assets/svgs/OTP-phone.svg'
import Passport from '../assets/svgs/passport.svg'
import Pending from '../assets/svgs/pending.svg'
import Phone from "../assets/svgs/smartphone.svg";
import PhoneNotification from '../assets/svgs/notification-bell.svg'
import SSN from '../assets/svgs/license.svg'
import Warning from '../assets/svgs/warning.svg'
import WarningOutlined from '../assets/svgs/warning-outlined.svg'

export const getSVG = (name: string, fill: string, width: number | string, height: number | string, style = {}) => {
    switch (name) {
        case 'abstract-octopus': {
            return <AbstractOctopus fill={fill} width={width} height={height} style={style} />
        }
        case 'add-person': {
            return <AddGroup fill={fill} width={width} height={height} style={style} />
        }
        case 'address': {
            return <Address fill={fill} width={width} height={height} style={style} />
        }
        case 'alien': {
            return <Alien fill={fill} width={width} height={height} style={style} />
        }
        case 'aperature': {
            return <Aperature fill={fill} width={width} height={height} style={style} />
        }
        case 'calendar': {
            return <Calendar fill={fill} width={width} height={height} style={style} />
        }
        case 'calendar-dots': {
            return <CalendarDots fill={fill} width={width} height={height} style={style} />
        }
        case 'cancel-outlined': {
            return <CancelOutline fill={fill} width={width} height={height} style={style} />
        }
        case 'close': {
            return <Close fill={fill} width={width} height={height} style={style} />
        }
        case 'check': {
            return <Check fill={fill} width={width} height={height} style={style} />
        }
        case 'check-outlined': {
            return <CheckOutline fill={fill} width={width} height={height} style={style} />
        }
        case 'check-filled': {
            return <CheckFilled fill={fill} width={width} height={height} style={style} />
        }
        case 'pending': {
            return <Pending fill={fill} width={width} height={height} style={style} />
        }
        case 'piggy': {
            return <Piggy fill={fill} width={width} height={height} style={style} />
        }
        case 'email': {
            return <Email fill={fill} width={width} height={height} style={style} />
        }
        case 'email-incoming': {
            return <IncomingEmail fill={fill} width={width} height={height} style={style} />
        }
        case 'email-at-sign': {
            return <EmailSign fill={fill} width={width} height={height} style={style} />
        }
        case 'gmail': {
            return <Google fill={fill} width={width} height={height} style={style} />
        }
        case 'group-error': {
            return <Frightened fill={fill} width={width} height={height} style={style} />
        }
        case 'home': {
            return <Home fill={fill} width={width} height={height} style={style} />
        }
        case 'incorrect-outline': {
            return <IncorrectOutlined fill={fill} width={width} height={height} style={style} />
        }
        case 'incorrect': {
            return <Incorrect fill={fill} width={width} height={height} style={style} />
        }
        case 'license': {
            return <License fill={fill} width={width} height={height} style={style} />
        }
        case 'male-person': {
            return <MaleUser fill={fill} width={width} height={height} style={style} />
        }
        case 'minus-outlined': {
            return <MinusOutlined fill={fill} width={width} height={height} style={style} />
        }
        case 'new-group': {
            return <NewGroup fill={fill} width={width} height={height} style={style} />
        }
        case 'one-time-password': {
            return <OneTimePassword fill={fill} width={width} height={height} style={style} />
        }
        case 'passport': {
            return <Passport fill={fill} width={width} height={height} style={style} />
        }
        case 'phone': {
            return <Phone fill={fill} width={width} height={height} style={style} />
        }
        case 'phone-notification': {
            return <PhoneNotification fill={fill} width={width} height={height} style={style} />
        }
        case 'ssn': {
            return <SSN fill={fill} width={width} height={height} style={style} />
        }
        case 'warning-outlined': {
            return <WarningOutlined fill={fill} width={width} height={height} style={style} />
        }
        case 'warning': {
            return <Warning fill={fill} width={width} height={height} style={style} />
        }
        default:
            return <></>
    }
}

