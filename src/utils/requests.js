import connect from "@vkontakte/vk-connect-promise";
import {isBirthday} from "./utils";

let accessToken = "f865feccf865feccf865fecc0cf80fafb0ff865f865fecca4ac75d0909fd9d72a2d0402";

export function getClassmatesAvatars(classmates, me, myPhoto) {
    let ids = [];
    let newList = [];
    for (let elem of classmates) {
        console.log(elem);
        if (elem.vk_account)
            ids.push(elem.vk_account);
    }
    console.log("ids", ids);

    return new Promise((resolve, reject) => {
        connect.send("VKWebAppCallAPIMethod", {
            method: "users.get",
            request_id: "request_avatars",
            params: {
                user_ids: ids,
                fields: "photo_100",
                v: "5.102",
                access_token: accessToken,
            }
        }).then(resp => {
            console.log("vk avatar resp", resp);
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
            newList.sort(function (a, b) {
                if (a.exp < b.exp) return 1;
                if (a.exp > b.exp) return -1;
                return 0;
            });
            console.log("sorted classmates", newList);
            resolve(newList);
        }).catch(() => reject());
    });
}