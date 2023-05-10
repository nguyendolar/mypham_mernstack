import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/product.action";
import Product from "../components/product/product";
import NavbarContainer from "./navbar.container";
import Slider from "./slider.container";
import * as userActions from "../actions/user.action";
import storeConfig from '../config/store.config'
import Modal from "react-modal";


class ProductContainer extends Component {
  constructor() {
    super();
    this.state={
      isOpen:false,
    }
  }
  async componentWillMount() {
    this.props.productActions.getCategory();
    this.props.productActions.getProduct();
    let res = await this.props.userActions.auth();
    if (res === false) this.props.history.push("/login");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.props.page) {
      this.props.productActions.getProduct();
    }
    if (
      nextProps.islogin !== this.props.islogin &&
      nextProps.islogin === false
    ) {
      this.props.history.push("/login");
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
        <NavbarContainer />
        <Slider handleClickUser = {()=>this.handleClickUser()} />
        <Product
          product={this.props.product}
          totalpage={this.props.totalpage}
          page={this.props.page}
          category={this.props.category}
          deleteProduct={id => this.props.productActions.deleteProduct(id)}
          backPage={() => this.props.productActions.backPage()}
          nextPage={() => this.props.productActions.nextPage()}
          setPage={page => this.props.productActions.setPage(page)}
          isadd={this.props.isadd}
          setSearchText = {(value) => this.props.productActions.setSearchText(value)}
          searchTextSubmit={() => this.props.productActions.searchTextSubmit()}
          isupdate={this.props.isupdate}
          addProduct={(
            category,
            id_category,
            name,
            price,
            release_date,
            describe,
            file,
            sizes,
          ) =>
            this.props.productActions.addProduct(
              category,
              id_category,
              name,
              price,
              release_date,
              describe,
              file,
              sizes
            )
          }
          updateProduct={(
            id,
            name,
            category,
            id_category,
            price,
            release_date,
            describe,
            file,
            sizes
          ) =>
            this.props.productActions.updateProduct(
              id,
              name,
              category,
              id_category,
              price,
              release_date,
              describe,
              file,
              sizes
            )
          }
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
    );
  }
}
const mapStateToProps = state => ({
  product: state.productReducers.product.data,
  totalpage: state.productReducers.product.totalpage,
  page: state.productReducers.product.page,
  category: state.productReducers.category.data,
  isadd: state.productReducers.product.isadd,
  isupdate: state.productReducers.product.isupdate,
  islogin: state.userReducers.user.islogin
});

const mapDispatchToProps = dispatch => {
  return {
    productActions: bindActionCreators(productActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductContainer);
