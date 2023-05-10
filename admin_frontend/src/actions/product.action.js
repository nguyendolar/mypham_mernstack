import axios from 'axios';
import { productTypes } from '../constants/action.types';
import {sortTypes} from '../constants/action.types'
export const getProduct = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/product/allproduct', {
            page: getState().productReducers.product.page,
            range: null
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setProduct(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
}
export const setProduct = (data) => ({
    type: productTypes.SET_PRODUCT,
    data
})
export const setPage = (page) => ({
    type: productTypes.SET_PAGE,
    page
})
export const setTotalPage = (totalpage) => ({
    type: productTypes.SET_TOTAL_PAGE,
    totalpage
})
export const authorSetPage = (page) => ({
    type: productTypes.AUTHOR_SET_PAGE,
    page
})
export const authorSetTotalPage = (totalpage) => ({
    type: productTypes.AUTHOR_SET_TOTAL_PAGE,
    totalpage
})
export const categorySetPage = (page) => ({
    type: productTypes.CATEGORY_SET_PAGE,
    page
})
export const categorySetTotalPage = (totalpage) => ({
    type: productTypes.CATEGORY_SET_TOTAL_PAGE,
    totalpage
})
export const publisherSetPage = (page) => ({
    type: productTypes.PUBLISHER_SET_PAGE,
    page
})
export const publisherSetTotalPage = (totalpage) => ({
    type: productTypes.PUBLISHER_SET_TOTAL_PAGE,
    totalpage
})
export const deleteProduct = (id) => async(dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deleteproduct/' +id)
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getProduct())
}
export const deleteCategory = (id) => async(dispatch, getState) => {
    console.log(id);
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deletecategory/' +id)
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getCategory())
}

export const getCategory = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/category/all/' + getState().productReducers.category.page)
    }
    catch (err) {
        return
    }
    dispatch(setCategory(res.data.data))
    dispatch(categorySetTotalPage(res.data.totalPage))
}

export const getPublisher = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/publisher/all/' + getState().productReducers.publisher.page)
    }
    catch (err) {
        return
    }
    dispatch(setPublisher(res.data.data))
    dispatch(publisherSetTotalPage(res.data.totalPage))
}

export const getAuthor = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/author/all/' + getState().productReducers.author.page)
    }
    catch(err) {
        return
    }
    dispatch(setAuthor(res.data.data))
    dispatch(authorSetTotalPage(res.data.totalPage))
}

export const setCategory = (data) => ({
    type: productTypes.SET_CATEGORY_PRODUCT,
    data
})

export const setPublisher = (data) => ({
    type: productTypes.SET_PUBLISHSER,
    data
})

export const setAuthor = (data) => ({
    type: productTypes.SET_AUTHOR,
    data
})
export const addCategorySuccess = () =>({
    type: productTypes.ADD_CATEGORY_SUCCESS
})
export const addCategotyFail = () => ({
    type: productTypes.ADD_CATEGORY_FAIL
})
export const updateCategorySuccess = () => ({
    type: productTypes.UPDATE_CATEGORY_SUCCESS
})
export const updateCategoryFail = () => ({
    type: productTypes.UPDATE_CATEGORY_FAIL
})
export const resetCategory = () => ({
    type: productTypes.RESET_CATEGORY
})
export const addCategory =  (name) => async (dispatch, getState) => {
    dispatch(resetCategory())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addcategory', {
            name: name
        })
    }
    catch(err) {
        dispatch(addCategotyFail())
        return
    } 
    dispatch(addCategorySuccess())
    dispatch(getCategory())
}

export const updateCategory =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updatecategory', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateCategoryFail())
        return
    } 
    dispatch(updateCategorySuccess())
    dispatch(getCategory())
}
export const addAuthorSuccess = () =>({
    type: productTypes.ADD_AUTHOR_SUCCESS
})
export const addAuthorFail = () => ({
    type: productTypes.ADD_AUTHOR_FAIL
})
export const updateAuthorSuccess = () => ({
    type: productTypes.UPDATE_AUTHOR_SUCCESS
})
export const updateAuthorFail = () => ({
    type: productTypes.UPDATE_AUTHOR_FAIL
})
export const resetAuthor = () => ({
    type: productTypes.RESET_AUTHOR
})
export const addAuthor =  (name) => async (dispatch, getState) => {
    dispatch(resetAuthor())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addauthor', {
            name: name
        })
    }
    catch(err) {
        dispatch(addAuthorFail())
        return
    } 
    dispatch(addAuthorSuccess())
    dispatch(getAuthor())
}

export const updateAuthor =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateauthor', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateAuthorFail())
        return
    } 
    dispatch(updateAuthorSuccess())
    dispatch(getAuthor())
}
export const addPublisherSuccess = () =>({
    type: productTypes.ADD_PUBLISHER_SUCCESS
})
export const addPublisherFail = () => ({
    type: productTypes.ADD_PUBLISHER_FAIL
})
export const updatePublisherSuccess = () => ({
    type: productTypes.UPDATE_PUBLISHER_SUCCESS
})
export const updatePublisherFail = () => ({
    type: productTypes.UPDATE_PUBLISHER_FAIL
})
export const resetPublisher = () => ({
    type: productTypes.RESET_PUBLISHER
})
export const addPublisher =  (name) => async (dispatch, getState) => {
    dispatch(resetPublisher())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addpublisher', {
            name: name
        })
    }
    catch(err) {
        dispatch(addPublisherFail())
        return
    } 
    dispatch(addPublisherSuccess())
    dispatch(getPublisher())
}

export const updatePublisher =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updatepublisher', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updatePublisherFail())
        return
    } 
    dispatch(updatePublisherSuccess())
    dispatch(getPublisher())
}
export const backPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const nextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.author.page
    let totalpage = getState().productReducers.author.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const authorBackPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    if(page > 1) {
        dispatch(authorSetPage(parseInt(page) - 1))
    }
}

export const authorNextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.author.page
    let totalpage = getState().productReducers.author.totalpage
    if(page < totalpage) {
        dispatch(authorSetPage(parseInt(page) + 1))
    }
}
export const categoryBackPage = () => (dispatch, getState) => {
    let page = getState().productReducers.category.page
    if(page > 1) {
        dispatch(categorySetPage(parseInt(page) - 1))
    }
}

export const categoryNextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.category.page
    let totalpage = getState().productReducers.category.totalpage
    if(page < totalpage) {
        dispatch(categorySetPage(parseInt(page) + 1))
    }
}
export const publisherBackPage = () => (dispatch, getState) => {
    let page = getState().productReducers.publisher.page
    if(page > 1) {
        dispatch(publisherSetPage(parseInt(page) - 1))
    }
}

export const publisherNextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.publisher.page
    let totalpage = getState().productReducers.publisher.totalpage
    if(page < totalpage) {
        dispatch(publisherSetPage(parseInt(page) + 1))
    }
}
export const billBackPage = () => (dispatch, getState) => {
    let page = getState().productReducers.bill.page
    if(page > 1) {
        dispatch(billSetPage(parseInt(page) - 1))
    }
}

export const billNextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.bill.page
    let totalpage = getState().productReducers.bill.totalpage
    if(page < totalpage) {
        dispatch(billSetPage(parseInt(page) + 1))
    }
}
export const addProductSuccess = () => ({
    type: productTypes.ADD_PRODUCT_SUCCESS
})
export const addProductFail = () => ({
    type: productTypes.ADD_PRODUCT_FAIL
})
export const updateProductSuccess = () => ({
    type: productTypes.UPDATE_PRODUCT_SUCCESS
})
export const updateProductFail = () => ({
    type: productTypes.UPDATE_PRODUCT_FAIL
})
export const addProduct = (category, id_category,name, price, release_date, describe , file,sizes) =>
 async (dispatch, getState) => {
    let data = new FormData()
    data.append('file', file)
    data.append('id_category', id_category) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('release_date', release_date)
    data.append('describe', describe)
    data.append('category', category)
    data.append('sizes', [...sizes])
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addproduct', data)
    }
    catch(err) {
        dispatch(addProductFail())
        return
    } 
    dispatch(addProductSuccess())
    dispatch(getProduct())
}
export const updateProduct = (id, name, category,id_category, price, release_date, describe, file, sizes) => async (dispatch, getState) => {
    let data = new FormData()
    data.append('file', file)
    data.append('id', id)
    data.append('category', category) 
    data.append('id_category', id_category) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('release_date', release_date)
    data.append('describe', describe)
    data.append('sizes', [...sizes])

   
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateproduct', data)
        console.log('data',res);
    }
    catch(err) {
        dispatch(updateProductFail())
        return
    } 
    dispatch(updateProductSuccess())
    dispatch(getProduct())
}
export const setBill = (data) => ({
    type: productTypes.BILL_SET_DATA,
    data
})
export const billSetPage = (page) => ({
    type: productTypes.BILL_SET_PAGE,
    page
})
export const billSetTotalPage = (totalpage) => ({
    type: productTypes.BILL_SET_TOTAL_PAGE,
    totalpage
})
export const getBill = (status) => async(dispatch, getState) => {
    let link = "http://localhost:8080/bill/status/99"
    if(status === "0") {
        link = "http://localhost:8080/bill/status/0"
    }
    if(status === "1") {
        link = "http://localhost:8080/bill/status/1"
    }
    let res = null
    try {
       res =  await axios.get(link)
    }
    catch(err) {
        return
    }
    dispatch(setBill(res.data.data))
    dispatch(billSetTotalPage(res.data.totalPage))

}
export const updateIssendSuccess = () => ({
    type: productTypes.UPDATE_ISSEND_SUCCESS
})
export const updateIssendFail = () => ({
    type: productTypes.UPDATE_ISSEND_FAIL
})

export const updateIssend = (name,id) => async (dispatch, getState) => {
    let res
    try {
        console.log(typeof name);
        res = await axios.post('http://localhost:8080/bill/updateissend', {
        name: name,
        id:id
        })
    }
    catch(err) {
        
        dispatch(updateIssendFail())
        return
    } 
    dispatch(updateIssendSuccess())
}
export const setSearchText = (searchtext) => ({
    type: productTypes.SET_SEARCH_TEXT,
    searchtext
})
export const searchTextSubmit = () => async(dispatch, getState) => {
    dispatch(setPage(1))
    console.log('da vao.....');
    let sorttype = 'release_date'
    let sortorder = '-1'
    let sortType = getState().productReducers.product.sortType
    if (sortType === sortTypes.SORT_DAY_DECREASED) {
        sorttype = 'release_date'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_DAY_INCREASED) {
        sorttype = 'release_date'
        sortorder = '1'
    } else if (sortType === sortTypes.SORT_PRICE_DECREASED) {
        sorttype = 'price'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_PRICE_INCREASED) {
        sorttype = 'price'
        sortorder = '1'
    } else if (sortType === sortTypes.SORT_SALES_DECREASED) {
        sorttype = 'sales'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_SALES_INCREASED) {
        sorttype = 'sales'
        sortorder = '1'
    } else if (sortType === sortTypes.SORT_VIEWS_DECREASED) {
        sorttype = 'view_counts'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_VIEWS_INCREASED) {
        sorttype = 'view_counts'
        sortorder = '1'
    }
    let _link = 'http://localhost:8080/product/allproduct';
    console.log('id', getState().productReducers.product.id);
    console.log('search', getState().productReducers.product.searchtext);

    let res
    try {
        res = await axios.post(_link, {
            page: 1,
            range: getState().productReducers.product.range,
            sorttype: sorttype,
            sortorder: sortorder,
            id: getState().productReducers.product.id,
            searchtext: getState().productReducers.product.searchtext
        })
    }
    catch (err) {
        console.log(err.response)
        return
    }
    dispatch(setProduct(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
 } 