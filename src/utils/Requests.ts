import connect from "@vkontakte/vk-connect";
import {getVkParams, isBirthday} from "./Utils";
import {InfoResponse, VkParamsProps} from "./Props";

let accessToken = "f865feccf865feccf865fecc0cf80fafb0ff865f865fecca4ac75d0909fd9d72a2d0402";
let baseUrl = "https://bklet.ml/api/";

export function getAuthData(region?: number, province?: number, city?: number): Promise<Array<{ id: string, name: string }>> {
    let methodUrl = `auth/get_data/`;
    if (region)
        methodUrl += `?region=${region}`;
    if (province)
        methodUrl += `&province=${province}`;
    if (city)
        methodUrl += `&city=${city}`;

    return new Promise((resolve, reject) => {
        fetch(baseUrl + methodUrl, {
            method: "GET"
        }).then(response => response.json()
            .then(data => resolve(data.data)))
            .catch(err => reject(err))
    })
}

export function vkAuth(): Promise<{}> {
    let methodUrl = "auth/bind_account/vk/";
    let vkParams = getVkParams();
    let url = baseUrl + methodUrl + "?";
    // @ts-ignore FIXME
    for (let key in vkParams) url += `${key}=${vkParams[key]}&`;

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET"
        }).then(response => response.json().then(data => {
            if (data.status) {
                let localData = {
                    id: data.id,
                    secret: data.secret,
                    students: data.students.list,
                    student: (data.students.list.length === 1 ? data.students.list[0] : null),
                };

                resolve(localData)
            }
        })).catch(err => reject(err));
    });
}

export function auth(
    login: string,
    pass: string,
    diary: string,
    reg: null | number,
    prov: null | number,
    city: null | number,
    school: null | number
): Promise<{} | string> {
    let methodUrl = "auth/";
    let ua = navigator.userAgent.toLowerCase();
    let json = {
        diary: diary,
        login: login,
        password: pass,
        region: reg,
        province: prov,
        city: city,
        school: school,
        vk_user_id: getVkParams().vk_user_id,
        device_type: (ua.search('ios') > 0
            ? 'ios'
            : (ua.search('android') > 0
                ? 'android'
                : 'pc')),
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + methodUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(json),
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    if (data.status) {
                        bindUser(data.id, data.secret)
                            .then(result => console.log("bind", result))
                            .catch(err => console.log("bind err", err));
                        let localData = {
                            id: data.id,
                            secret: data.secret,
                            students: data.students.list,
                            diary: diary,
                            student: (data.students.list.length === 1 ? data.students.list[0] : null),
                        };

                        console.log("auth", localData);
                        resolve(localData);
                    } else {
                        reject(data.message);
                    }
                });
            } else {
                let message = "Неудачная попытка входа. Пожалуйста, проверьте свои данные и попробуйте ещё раз.";
                reject(message);
            }
        }).catch(err => console.log("fetch loose", err));
    })
}

export function getProfileInfo(
    profileData: { id: number, secret: string, student_id: number }
): Promise<InfoResponse> {
    let methodUrl = `profile/info/?id=${profileData.id}&secret=${profileData.secret}&student_id=${profileData.student_id}`;

    return new Promise(resolve => {
        fetch(baseUrl + methodUrl, {
            method: "GET"
        })
            .then(response => response.json().then(profile => resolve(profile.data)))
    });
}

export function getClassmatesAvatars(classmates: Array<any>, me: any, myPhoto: {}) {
    let ids: any = [];
    let newList: Array<{}> = [];
    for (let elem of classmates) {
        console.log(elem);
        if (elem.vk_account)
            ids.push(elem.vk_account);
    }

    return new Promise((resolve, reject) => {
        // @ts-ignore
        connect.send("VKWebAppCallAPIMethod", {
            method: "users.get",
            request_id: "request_avatars",
            params: {
                user_ids: ids,
                fields: "photo_100",
                v: "5.102",
                access_token: accessToken,
            }
        }).then((resp: any) => {
            let id_found = false;
            for (let mate of classmates) {
                id_found = false;
                if (mate.vk_account) {
                    for (let i = 0; i < resp.data.response.length; i++) {
                        if (mate.vk_account === resp.data.response[i].id) {
                            id_found = true;
                            newList.push({
                                name: mate.name,
                                link: mate.vk_account,
                                bdate: mate.b_date && isBirthday(mate.b_date),
                                exp: mate.exp,
                                avatar_link: resp.data.response[i].photo_100,
                            });
                            break;
                        }
                    }
                    if (!id_found) {
                        newList.push({
                            name: mate.name,
                            link: null,
                            bdate: mate.b_date && isBirthday(mate.b_date),
                            exp: mate.exp,
                            avatar_link: null,
                        });
                    }
                }
            }
            newList.push({
                name: me.student.name,
                link: null,
                bdate: me.personalInfo.birth_date && isBirthday(me.personalInfo.birth_date),
                exp: me.student.exp,
                avatar_link: myPhoto,
            });
            newList.sort(function (a: any, b: any) {
                if (a.exp < b.exp) return 1;
                if (a.exp > b.exp) return -1;
                return 0;
            });
            resolve(newList);
        }).catch(() => reject());
    });
}

export function bindUser(id: number, secret: string) {
    let methodUrl = "auth/bind_account/vk/";
    let json = getVkParams();
    json.id = id;
    json.secret = secret;

    return new Promise(((resolve, reject) => {
        fetch(baseUrl + methodUrl,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(json),
            }).then(response => response.json().then(data => resolve(data)))
            .catch(err => reject(err))
    }))
}

export function unbindUser(id: number, secret: string) {
    let methodUrl = `auth/bind_account/vk/logout/`;
    let vk_id = getVkParams().vk_user_id;
    let json = {
        id: id,
        secret: secret,
        vk_user_id: parseInt(vk_id),
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + methodUrl,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(json),
            })
            .then(response => response.json().then(data => resolve(data)))
            .catch(err => reject(err))
    });
}