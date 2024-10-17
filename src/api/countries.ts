import service from "@/utils/service";
export function getCode() {
    return service({
        url: `/countries/code/list`,
        method: "POST",
    })
}