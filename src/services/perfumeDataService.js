import http from "../http-common"

class perfumeDataService {
  static getAll(perfumeQueryFilters, perfumeQueryPager) {
    return http.get("/perfume", {
      params: { ...perfumeQueryFilters, ...perfumeQueryPager },
    })
  }

  static get(id) {
    return http.get(`/perfume/${id}`)
  }

  static getFiltersOptions() {
    return http.get("/perfume/filtersOptions")
  }

  static getOrderOptions() {
    return http.get("/perfume/orderOptions")
  }
}

export default perfumeDataService
