import React, { Component } from "react";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      sum: 1000
    };
  }
  tinh(count) {
    return (count / this.state.sum) * 100 + "%";
  }
  render() {
    return (
      <div>
        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-12">
                <h3 className="page-header">
                  <i className="fa fa-laptop" /> Dashboard
                </h3>
                <ol className="breadcrumb">
                  <li>
                    <i className="fa fa-home" />
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <i className="fa fa-laptop" />Dashboard
                  </li>
                </ol>
              </div>
            </div>

            <div className="row">
              
            </div>

            

            {/* <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2>
                      <i className="fa fa-flag-o red" />
                      <strong>
                        Danh sách sản phẩm bán ra
                      </strong>
                    </h2>
                    <div className="panel-actions">
                      
                    </div>
                  </div>
                  <div className="panel-body">
                    <table className="table bootstrap-datatable countries">
                      <thead>
                        <tr>
                          <th />
                          <th>Tên Sản Phẩm</th>
                          <th>Giá Tiền</th>
                          <th>Số Lượng Đã Bán</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.top_product.map((element, index) => {
                          return(
                            <tr>
                            <td>
                              <div className='home-image'>
                                <img
                                  src={element.img}
                                  
                                />
                              </div>
                              
                            </td>
                            <td>{element.name}</td>
                            <td>{new Intl.NumberFormat('de-DE', {currency: 'EUR' }).format(element.price)}<sup>đ</sup></td>
                            <td>{element.count}</td>
                            
                          </tr>
                          ) 
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              
            
            </div> */}

         
            <br />
   

          </section>
          
        </section>
      </div>
    );
  }
}
export default Home;
