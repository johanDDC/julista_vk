import {
    GET_CITIES, GET_PROVINCES,
    GET_REGIONS, GET_SCHOOLS,
    INPUT_CITY,
    INPUT_LOGIN,
    INPUT_PASSWORD,
    INPUT_PROVINCE,
    INPUT_REGION,
    INPUT_SCHOOL
} from "../../utils/ReduxConst";
import React from "react";

export function inputLogin(login: string) {
    return {
        type: INPUT_LOGIN,
        data: login
    }
}

export function inputPassword(password: string) {
    return {
        type: INPUT_PASSWORD,
        data: password
    }
}

export function inputRegion(region: string) {
    return {
        type: INPUT_REGION,
        data: region
    }
}

export function inputProvince(province: string) {
    return {
        type: INPUT_PROVINCE,
        data: province
    }
}

export function inputCity(city: string) {
    return {
        type: INPUT_CITY,
        data: city
    }
}

export function inputSchool(school: string) {
    return {
        type: INPUT_SCHOOL,
        data: school
    }
}

export function getRegions(regions: Array<React.ReactChild>) {
    return {
        type: GET_REGIONS,
        data: regions
    }
}

export function getProvinces(provinces: Array<React.ReactChild>) {
    return {
        type: GET_PROVINCES,
        data: provinces
    }
}

export function getCities(cities: Array<React.ReactChild>) {
    return {
        type: GET_CITIES,
        data: cities
    }
}

export function getSchools(schools: Array<React.ReactChild>) {
    return {
        type: GET_SCHOOLS,
        data: schools
    }
}