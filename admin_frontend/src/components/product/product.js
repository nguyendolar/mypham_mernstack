import React, { Component } from "react";
import { Link } from "react-router-dom";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      sizeall : ['Xám','Đen','Bạc','Trắng'],
      pagination: [],
      product: null,
      file: null,
      imagePreviewUrl: null,
      curr: "add",
      category: "Thể Loại",
      publisher: "Nhà Xuất Bản",
      author: "Tác Giả",
      name: "",
      release_date: null,
      price: "",
      img: "",
      describe: "",
      id_nsx: "",
      id_author: "",
      id_category: "",
      noti: "",
      id: null,
      sizes: new Set(),
      checksizes: '',
      check: [false,false,false,false,false,false]
    };
  }
  componentWillMount() {
    let tmp = [];
    for (let i = 1; i <= this.props.totalpage; i++) {
      tmp.push(i);
    }
    this.setState({ pagination: tmp });
    this.checkedCheckbox = new Set();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalpage !== this.props.totalpage) {
      let tmp = [];
      for (let i = 1; i <= nextProps.totalpage; i++) {
        tmp.push(i);
      }
      this.setState({ pagination: tmp });
    }
    if (nextProps.product !== null) {
      this.setState({
        imagePreviewUrl: nextProps.product.img
      });
    }
    if (nextProps.isadd === true) {
      this.reset()
    } 
    if(nextProps.isupdate === true) {
      this.reset()
    }
  }
  renderPagination() {
    if (this.state.pagination.length === 0) {
      return null;
    } else {
      return (
        <ul className="pagination pagination-custom col-md-6 offset-md-3">
          <li onClick={() => this.props.backPage()}>
            <a>&laquo;</a>
          </li>
          {this.state.pagination.map((element, index) => {
            if (this.props.page === element) {
              return (
                <li
                  className="active"
                  onClick={() => this.props.setPage(element)}
                >
                  <a>{element}</a>
                </li>
              );
            } else {
              return (
                <li onClick={() => this.props.setPage(element)}>
                  <a>{element}</a>
                </li>
              );
            }
          })}
          <li onClick={() => this.props.nextPage()}>
            <a>&raquo;</a>
          </li>
        </ul>
      );
    }
  }
  handleChangeImg = img => {
    if(img === undefined)
      return
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: img,
        img: reader.result
      });
    };
    reader.readAsDataURL(img);
  };
  invalidPrice = t => {
    var str = t.toString();
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == "+" || str.charAt(i) == "-") count++;
      else break;
    }
    str = str.substring(count, str.length);
    count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) == ".") {
        count++;
      }
      if (str.charAt(i) < "0" || str.charAt(i) > "9") return false;
    }
    if (count > 1) return false;
    return !isNaN(Number.parseFloat(str));
  };
  submitAddProduct = () => {
    const {
      category,
      id_category,
      name,
      price,
      release_date,
      describe,
      file,
      sizes
    } = this.state;
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (release_date === null) {
      this.setState({
        noti: "Day invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.invalidPrice(price)) {
      this.setState({
        noti: "Price invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (category === "") {
      this.setState({
        noti: "Category invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    
    if (file === null) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.addProduct(
      category,
      id_category,
      name,
      price,
      release_date,
      describe,
      file,
      sizes,
    );
  };
  submitUpdateProduct = () => {
    const {
      category,
      id_category,
      name,
      price,
      release_date,
      describe,
      file,
      id, 
      img,
      sizes
    } = this.state;
    if (name.length <= 0) {
      this.setState({
        noti: "Name invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (release_date === null) {
      this.setState({
        noti: "Day invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (!this.invalidPrice(price)) {
      this.setState({
        noti: "Price invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    if (category === "") {
      this.setState({
        noti: "Category invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
   

    
    if (file === null && img === '' ) {
      this.setState({
        noti: "File invalid"
      });
      return;
    } else {
      this.setState({
        noti: ""
      });
    }
    this.props.updateProduct(
      id,
      name,
      category,
      id_category,
      price,
      release_date,
      describe,
      file,
      sizes
    );
  };
  renderBtnSubmit = () => {
    if (this.state.curr === "add") {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button
              onClick={() => this.submitAddProduct()}
              className="btn-custom"
              type="submit"
            >
              Add
            </button>
            <button className="btn-custom" disabled type="button">
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button className="btn-custom" disabled type="submit">
              Add
            </button>
            <button
              className="btn-custom"
              onClick={() => this.submitUpdateProduct()}
              type="button"
            >
              Update
            </button>
            <button className="btn-custom" onClick={() => this.reset()}>Reset</button>
          </div>
        </div>
      );
    }
  };
  reset = () => {
    this.setState({
      noti: "",
        name: "",
        file: null,
        imagePreviewUrl: null,
        curr: "add",
        category: "category",
   
      
        name: "",
        release_date: null,
        price: "",
        img: "",
        describe: "",
        id_nsx: "",
      
        id_category: "",
        noti: "",
        id: null,
        sizes:[]
    })
  }
  renderMenuCategory = () => {
    if (this.props.category) {
      return this.props.category.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({
                category: element.name,
                id_category: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };

  renderMenuCategory = () => {
    if (this.props.category) {
      return this.props.category.map((element, index) => {
        return (
          <li
            onClick={() =>
              this.setState({
                category: element.name,
                id_category: element._id
              })
            }
          >
            <a>{element.name}</a>
          </li>
        );
      });
    } else {
      return null;
    }
  };
  getNameCategoryByID = id => {
    for (let i = 0; i < this.props.category.length; i++) {
      if (id === this.props.category[i]._id) return this.props.category[i].name;
    }
  };
  handleCheckChieldElement = (event, key) => {
    let sizecheck = this.state.check;
    sizecheck[key] = !sizecheck[key];
    
    if(this.checkedCheckbox.has(event)){
      this.checkedCheckbox.delete(event);
    }else{
      this.checkedCheckbox.add(event);
    }
    this.setState({
      sizes: this.checkedCheckbox
    })
   
  }
  checkboxSize= () => {
   
    const sizeall =  this.state.sizeall.map((value,key)=>{
      return <label className='size' key={key} style={{marginRight: 1 + 'em'}}><input  name='size' type='checkbox' checked={this.state.check[key]} value={value} onChange={()=> this.handleCheckChieldElement(value, key)}  />{value}</label>
    })
    return sizeall;
  }
  handleUpdate = (element) =>{
    this.checkedCheckbox =  new Set();
    let size =  element.size[0].split(',').sort()
    let checksize = this.state.check;

    this.state.sizeall.map((item,key)=>{

      for (let i=0; i<size.length; i++){
        if(size[i] === item){
          checksize[key] = true;
          this.checkedCheckbox.add(item)
          break;
        }else{
          checksize[key] = false;
    
        }
      }
     
    })
    this.setState({
      curr: "update",
      name: element.name,
      release_date: element.release_date.slice(
        0,
        10
      ),
      price: element.price,
      describe: element.describe,
      category: element.category,
      id_category: element.id_category,
      id_nsx: element.id_nsx,
      img: element.img,
      id: element._id,
      checksizes: element.size[0],
      sizes: element.size[0].split(',').sort(),
      check: checksize,
    })
  }
  handeSearch = (e) => {
    if(e === 13) {
        this.props.searchTextSubmit()
    }
  }
  render() {
    return (
      <section id="main-content">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="page-header">
              <i className="fa fa-table" /> Table
            </h3>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-home" />
                <Link to="/">Home</Link>
              </li>
              <li>
                <i className="fa fa-table" />Table
              </li>
              <li>
                <i className="fa fa-th-list" />Product Manager
              </li>
              <li>
              <div className="navbar-form">
                  <input className="form-control" placeholder="Search" type="text" 
                     onChange={(e) => this.props.setSearchText(e.target.value)}
                     onKeyUp={(e) => this.handeSearch(e.keyCode)}
                  />
              </div>
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Advanced Table</header>
              <table className="table table-striped table-advance table-hover">
                <tbody>
                  <tr>
                    <th>
                      <i className="icon_profile" /> Name
                    </th>
                    <th>
                      <i className="icon_calendar" /> Date
                    </th>
                    <th>
                      <i className="icon_mail_alt" /> Price
                    </th>
                    <th>
                      <i className="icon_pin_alt" /> describe
                    </th>
                    <th>
                      <i className="icon_cogs" /> Action
                    </th>
                  </tr>
                  {this.props.product.map((element, index) => {
                    return (
                      <tr>
                        <td>{element.name}</td>
                        <td>{element.release_date.slice(0,10)}</td>
                        <td>{new Intl.NumberFormat('de-DE', {currency: 'EUR' }).format(element.price)}<sup>đ</sup></td>
                        <td style={{ width: "40%" }}>{element.describe}</td>
                        <td>
                          <div className="btn-group">
                            <a
                              onClick={() => this.handleUpdate(element)
                              }
                              className="btn btn-success"
                            >
                              <i className="icon_check_alt2" />
                            </a>
                            <a
                              onClick={() => this.props.deleteProduct(element._id)}
                              className="btn btn-danger"
                            >
                              <i className="icon_close_alt2" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {this.renderPagination()}
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <section className="panel">
              <header className="panel-heading">Form validations</header>
              <div className="panel-body">
                <div className="form" id="from-book">
                  <div
                    className="form-validate form-horizontal"
                    id="feedback_form"
                    method="get"
                    action=""
                  >
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Name <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          onChange={e => {
                            this.setState({
                              name: e.target.value
                            });
                          }}
                          value={this.state.name}
                          className="form-control"
                          id="cname"
                          name="fullname"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cemail" className="control-label col-lg-2">
                        Date<span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.release_date}
                          onChange={e =>
                            this.setState({
                              release_date: e.target.value
                            })
                          }
                          className="form-control "
                          id="cemail"
                          type="date"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="curl" className="control-label col-lg-2">
                        Price
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.price}
                          onChange={e =>
                            this.setState({
                              price: e.target.value
                            })
                          }
                          className="form-control "
                          id="curl"
                          type="text"
                          name="url"
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="cname" className="control-label col-lg-2">
                        Miêu Tả <span className="required">*</span>
                      </label>
                      <div className="col-lg-10">
                        <input
                          value={this.state.describe}
                          onChange={e =>
                            this.setState({
                              describe: e.target.value
                            })
                          }
                          className="form-control"
                          id="subject"
                          name="subject"
                          minlength="5"
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment " className="control-label col-lg-2">
                        Category
                      </label>
                      <div className="btn-group col-lg-10">
                        <button
                          style={{ width: "200px" }}
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          {this.state.category} <span className="caret" />
                        </button>
                        <ul className="dropdown-menu" role="menu">
                          {this.renderMenuCategory()}
                        </ul>
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Màu :
                      </label>
                    <div className="btn-group col-lg-10">
                      <ul className='ischeck'>
                        {this.checkboxSize()}
                      </ul>
                    </div>
                    </div>
                    
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Image upload{" "}
                      </label>
                      <div className="col-lg-10">
                        <input
                          className="form-control "
                          type="file"
                          id="ccomment"
                          name="comment"
                          required
                          onChange={e =>
                            this.handleChangeImg(e.target.files[0])
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group ">
                      <label for="comment" className="control-label col-lg-2">
                        Image
                      </label>
                      <div className="col-lg-10">
                        <img
                          src={this.state.img}
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-2 col-lg-10">
                        <p>{this.state.noti}</p>
                      </div>
                    </div>
                    {this.renderBtnSubmit()}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}
export default Product;
