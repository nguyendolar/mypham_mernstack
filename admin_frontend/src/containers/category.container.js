import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../actions/product.action'
import Category from '../components/category/category'
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import storeConfig from '../config/store.config'
import Modal from "react-modal";

class CategoryContainer extends Component {
    constructor() {
        super();
        this.state={
            isOpen:false,
          }
    }
    async componentWillMount() {
        this.props.productActions.getCategory()
        let res = await this.props.userActions.auth()
        if (res === false)
            this.props.history.push('/login')
    }
    componentWillReceiveProps(nextProps) {
        if (
          nextProps.islogin !== this.props.islogin &&
          nextProps.islogin === false
        ) {
          this.props.history.push("/login");
        }
        if (nextProps.page !== this.props.page) {
            this.props.productActions.getCategory();
          }
      }
      handleClickUser = () =>{
        if(storeConfig.getUser().is_admin) {
          this.props.history.push('/usermanager')
        }else{
          this.setState({
            isOpen:true,
          })
        }
      }
    render() {
        return (
            <section id="container" className="">
            <NavbarContainer/>
            <Slider handleClickUser = {()=>this.handleClickUser()} />
            <Category
                category={this.props.category}
                addCategory={(name) => this.props.productActions.addCategory(name)}
                isadd={this.props.isadd}
                updateCategory={(id, name) => this.props.productActions.updateCategory(id, name)}
                deleteCategory={(id) => this.props.productActions.deleteCategory(id)}
                isupdate={this.props.isupdate}
                page={this.props.page}
                totalpage={this.props.totalpage}
                backPage={() => this.props.productActions.categoryBackPage()}
                nextPage={() => this.props.productActions.categoryNextPage()}
                setPage={page => this.props.productActions.categorySetPage(page)}
            />
            <Modal
            isOpen={this.state.isOpen}
            contentLabel="Example Modal"
            className="modal-cart"
          >
            <div>
              <div className="modal-title">
              <i class="fas fa-exclamation-circle"></i>
                <h2>Thông báo</h2>
              </div>
              <div className="modal-content-cart">
                <div className="modal-content-title">
                  Bạn cần phải là Admin mới có thể truy cập
                </div>
                <div className="btn-close-modal">
                  <button
                    className="btn btn-modal-cart"
                    onClick={() => {
                      this.setState({
                        isOpen:false
                      });
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
            </section>
            
        )
    }
}
const mapStateToProps = state => ({
    category: state.productReducers.category.data,
    isadd: state.productReducers.category.isadd,
    isupdate: state.productReducers.category.isupdate,
    islogin: state.userReducers.user.islogin,
    totalpage: state.productReducers.category.totalpage,
    page: state.productReducers.category.page
})

const mapDispatchToProps = dispatch => {
    return ({
        productActions: bindActionCreators(productActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    })
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryContainer)