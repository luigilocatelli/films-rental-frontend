import {api} from "boot/axios";
import {getCookieWithName} from "src/utils/CookieUtils";
const REST_APP_URL = "http://localhost:8080";

class FilmsDataService {

    //UNPROTECTED METHODS

    retriveAllFilms() {
        return api.get(`${REST_APP_URL}/api/unprotected/getAllFilms`);
    }

    retriveAllFilmCategories() {
        return api.get(`${REST_APP_URL}/api/unprotected/getAllCategories`);
    }

    retriveFilmsByCategoryId(categoryId) {
        return api.get(`${REST_APP_URL}/api/unprotected/getFilmsByCategoryId?categoryId=` + categoryId);
    }

    //PROTECTED METHODS

    retriveAllNotRentedFilms(customerId, jwt) {
        return api.get(`${REST_APP_URL}/api/protected/getAllNotRentedFilmsByCustomer?customerId=` + customerId, {
            headers: {
                Authorization: "Bearer " + jwt,
                "X-XSRF-TOKEN": getCookieWithName("XSRF-TOKEN")
            },
            withCredentials: true
        });
    }

    retriveAllRentedFilmsByCustomer(customerId, jwt) {
        return api.get(`${REST_APP_URL}/api/protected/getAllRentedFilmsByCustomer?customerId=` + customerId, {
            headers: {
                Authorization: "Bearer " + jwt,
                "X-XSRF-TOKEN": getCookieWithName("XSRF-TOKEN")
            },
            withCredentials: true
        });
    }

    retriveNotRentedFilmsByCustomerAndCategory(categoryId, customerId, jwt) {
        return api.get(`${REST_APP_URL}/api/protected/getNotRentedFilmsByCustomerAndCategoryId?categoryId=` + categoryId + "&customerId=" + customerId, {
            headers: {
                Authorization: "Bearer " + jwt,
                "X-XSRF-TOKEN": getCookieWithName("XSRF-TOKEN")
            },
            withCredentials: true
        });
    }

    retriveRentedFilmsByCustomerAndCategory(categoryId, customerId, jwt) {
        return api.get(`${REST_APP_URL}/api/protected/getRentedFilmsByCustomerAndCategoryId?categoryId=` + categoryId + "&customerId=" + customerId, {
            headers: {
                Authorization: "Bearer " + jwt,
                "X-XSRF-TOKEN": getCookieWithName("XSRF-TOKEN")
            },
            withCredentials: true
        });
    }

    insertNewFilmRentalForCustomer(filmId, customerId, jwt) {
        console.log("2");
        return api.post(`${REST_APP_URL}/api/protected/insertNewFilmRentalForCustomer`, new RequestBody(filmId, customerId), {
            headers: {
                Authorization: "Bearer " + jwt,
                "Access-Control-Allow-Origin": "*",
                "X-XSRF-TOKEN": getCookieWithName("XSRF-TOKEN")
            },
            withCredentials: true
        });
    }

    cancelFilmRentalForCustomer(filmId, customerId, jwt) {
        console.log(filmId + "|" + customerId + "|" + jwt);
        return api.post(`${REST_APP_URL}/api/protected/cancelFilmRentalForCustomer`, new RequestBody(filmId, customerId), {
            headers: {
                Authorization: "Bearer " + jwt,
                "Access-Control-Allow-Origin": "*",
                "X-XSRF-TOKEN": getCookieWithName("XSRF-TOKEN")
            },
            withCredentials: true
        });
    }
}

export default new FilmsDataService();

class RequestBody {
    constructor(filmId, customerId) {
        this.filmId = filmId;
        this.customerId = customerId;
    }
}
