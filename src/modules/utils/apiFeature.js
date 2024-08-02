export class ApiFeature {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery
    }
    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1
        if (this.searchQuery.page < 0) pageNumber = 1
        let limit = 2
        let skip = (pageNumber - 1) * limit
        this.pageNumber = pageNumber
        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }
    filter() {

        // filter
        // structuerd make deep copy for req.query 
        let filterObj = structuredClone(this.searchQuery)
        // turn into string
        filterObj = JSON.stringify(filterObj)
        // use replace from string method
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, value => `$${value}`)
        // turn into object again
        filterObj = JSON.parse(filterObj)

        let excludedSearch = ['sort', 'search', 'page', 'fields']
        excludedSearch.forEach(key => {
            delete filterObj[key]
        })
        this.mongooseQuery.find(filterObj)
        return this
    }
    sort() {
        // sort 
        if (this.searchQuery.sort) {
            const sortedBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)
        }
        return this
    }
    fields() {
        // fields
        if (this.searchQuery.fields) {
            const selFields = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(selFields)
        }
        return this
    }
    search() {
        if (this.searchQuery.search) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.search, $options: 'i' } },
                    { description: { $regex: this.searchQuery.search, $options: 'i' } }
                ]
            })
        }
        return this
    }
}
