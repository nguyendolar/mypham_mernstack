import React, { Component } from "react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storage.config";
import { sortTypes } from '../../constants/action.types'
class HeaderMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Account",
      titleSort: 'Sort',
      listActionSort: []
    };
  }
  componentWillMount() {
    if (storeConfig.getUser() !== null) {
      this.setState({
        email: storeConfig.getUser().email
      });
    }
    const { sortType } = this.props
    if (sortType === sortTypes.SORT_DAY_DECREASED) {
        this.setState({ titleSort: 'Sort by day decrease' })
    } else if (sortType === sortTypes.SORT_DAY_INCREASED) {
        this.setState({ titleSort: 'Sort by day increase' })
    } else if (sortType === sortTypes.SORT_PRICE_DECREASED) {
        this.setState({ titleSort: 'Sort by price decrease' })
    } else if (sortType === sortTypes.SORT_PRICE_INCREASED) {
        this.setState({ titleSort: 'Sort by price increase' })
    } else if (sortType === sortTypes.SORT_SALES_DECREASED) {
        this.setState({ titleSort: 'Sort by sales decrease' })
    } else if (sortType === sortTypes.SORT_SALES_INCREASED) {
        this.setState({ titleSort: 'Sort by sales increase' })
    } else if (sortType === sortTypes.SORT_VIEWS_DECREASED) {
        this.setState({ titleSort: 'Sort by views decrease' })
    } else if (sortType === sortTypes.SORT_VIEWS_INCREASED) {
        this.setState({ titleSort: 'Sort By views increase' })
    }
    this.setState({
        listActionSort: {
            SORT_DAY_DECREASED: 'Sort by day decrease',
            SORT_DAY_INCREASED: 'Sort by day increase',
            SORT_PRICE_DECREASED: 'Sort by price decrease',
            SORT_PRICE_INCREASED: 'Sort by price increase',
            SORT_SALES_DECREASED: 'Sort by sales decrease',
            SORT_SALES_INCREASED: 'Sort by sales increase',
            SORT_VIEWS_DECREASED: 'Sort by views decrease',
            SORT_VIEWS_INCREASED: 'Sort By views increase',
        }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.islogin) {
      this.setState({
        email: "Account"
      });
    } else {
      this.setState({
        email: storeConfig.getUser().email
      });
    }

    if (nextProps.sortType != this.props.sortType && nextProps.sortType !== undefined) {
      this.setState({ titleSort: this.state.listActionSort[nextProps.sortType] })
   }
  }

    handeSearch = (e) => {
        if(e === 13) {
            this.props.searchTextSubmit()
        }
    }
  
  handlelogin = () => {
    if (this.props.islogin) {
      return (
        <li
          className="btn-custom"
          onClick={() => {
            window.location.reload();
            this.props.logout();
            this.props.history.push("/");
          }}
        >
          <a>
            <i className="fa fa-lock" />Logout
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/login_register">
            <i className="fa fa-lock" />Login
          </Link>
        </li>
      );
    }
  };
  handleProfile = () => {
    if (this.state.email === "Account") {
      return;
    } else {
        
      this.props.history.push("/profile/" + this.state.email);
    }
  };
  hoverlogin = () =>{
    if(this.props.islogin){
      return (
        <ul className='sub-menu'>

<li   onClick={() => this.handleProfile()}>
                <Link to={"/"}  >Hồ Sơ </Link>
              </li>

              <li><Link to='/purchase_history/null' >Đơn Hàng </Link></li>
          
          </ul>
      );
    }
  }
  render() {
    return (
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="logo pull-left">
                <a href="/">
                  <img src="/assets/images/home/logo1.png" alt="" />
                </a>
              </div>
             
            </div>
            <div className="col-sm-4">
                            <div className="search_box pull-right">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => this.props.setSearchText(e.target.value)}
                                    onKeyUp={(e) => this.handeSearch(e.keyCode)}
                                />
                            </div>
                        </div>
            <div className="col-sm-4">
              <div className="shop-menu pull-right">
                <ul className="nav navbar-nav collapse navbar-collapse">
                <li className="post-link"> <Link to="/post" >Bài viết</Link></li>
                <li className='dropdown'>
                    <a className='Setting-item'>
                      <i className="fa fa-user dropbtn"></i>
                    </a>
                      {this.hoverlogin()}
                </li>
                 
                 
                  <li>
                    <Link to={"/cart"}>
                      <i className="fa fa-shopping-cart" />
                    </Link>
                  </li>
                  {this.handlelogin()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderMiddle;
